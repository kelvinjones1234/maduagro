from rest_framework import viewsets, permissions
from .models import Product, ProductCategory
from .serializers import ProductSerializer, ProductCategorySerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction
from rest_framework.decorators import action




class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 30


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [filters.SearchFilter]
    search_fields = [
        "product_name",
        "product_category__category_name",
        # "seller_profile__nickname",
    ]

    def get_queryset(self):
        queryset = Product.objects.all()
        category_slugs = self.request.query_params.getlist("category")
        if category_slugs:
            queryset = queryset.filter(
                product_category__category_slug__in=category_slugs
            )

        price_range = self.request.query_params.get("price_range")
        if price_range:
            try:
                min_price_str, max_price_str = price_range.split("-")
                queryset = queryset.filter(
                    product_price__gte=float(min_price_str),
                    product_price__lte=float(max_price_str),
                )
            except ValueError:
                pass

        # Rating filter
        rating = self.request.query_params.get("rating")
        if rating:
            queryset = queryset.filter(average_rating__gte=rating)

        # Sorting
        sort_by = self.request.query_params.get("sort_by", "created_at")
        if sort_by == "popularity":
            queryset = queryset.order_by("-popularity_score")
        elif sort_by == "price-low":
            queryset = queryset.order_by("product_price")
        elif sort_by == "price-high":
            queryset = queryset.order_by("-product_price")
        elif sort_by == "newest":
            queryset = queryset.order_by("-created_at")
        elif sort_by == "rating":
            queryset = queryset.order_by("-average_rating")
        else:
            queryset = queryset.order_by("-created_at")

        return queryset

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def perform_update(self, serializer):
        serializer.save()


class WholesalerViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    # permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ["product_name"]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Product deleted"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='bulk-delete')
    def bulk_delete(self, request):
        # Extract product IDs from request data
        product_ids = request.data.get('product_ids', [])
        
        if not product_ids:
            return Response(
                {"detail": "No product IDs provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not isinstance(product_ids, list):
            return Response(
                {"detail": "product_ids must be a list"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Convert IDs to integers to ensure valid input
            product_ids = [int(pid) for pid in product_ids]
        except (ValueError, TypeError):
            return Response(
                {"detail": "Invalid product IDs provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Use a transaction to ensure atomicity
        with transaction.atomic():
            # Filter products by IDs and ensure they exist
            products = Product.objects.filter(id__in=product_ids)
            if not products.exists():
                return Response(
                    {"detail": "No valid products found for the provided IDs"},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Delete the products
            deleted_count = products.delete()[0]

        return Response(
            {"detail": f"Successfully deleted {deleted_count} product(s)"},
            status=status.HTTP_200_OK
        )

    def get_queryset(self):
        user = self.request.user
        queryset = Product.objects.all()

        # Filter by availability
        is_available = self.request.query_params.get("is_available")
        valid_choices = ["available", "low", "out"]
        if is_available and is_available.lower() in valid_choices:
            queryset = queryset.filter(availability_status=is_available.lower())

        # Filter by exact quantity or range
        quantity = self.request.query_params.get("product_quantity")
        if quantity:
            if "-" in quantity:
                try:
                    min_q, max_q = map(int, quantity.split("-"))
                    queryset = queryset.filter(
                        product_quantity__gte=min_q, product_quantity__lte=max_q
                    )
                except ValueError:
                    pass
            else:
                try:
                    exact_q = int(quantity)
                    queryset = queryset.filter(product_quantity=exact_q)
                except ValueError:
                    pass

        return queryset


