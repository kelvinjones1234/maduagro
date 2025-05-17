from rest_framework import viewsets, permissions
from .models import Product, ProductCategory
from .serializers import ProductSerializer, ProductCategorySerializer
from rest_framework.pagination import PageNumberPagination


class ProductPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = "page_size"
    max_page_size = 100


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        queryset = Product.objects.all()

        # Category filter
        category_slug = self.request.query_params.get("category")
        if category_slug:
            queryset = queryset.filter(product_category__category_slug=category_slug)

        # Price filters
        price_min = self.request.query_params.get("price_min")
        price_max = self.request.query_params.get("price_max")
        if price_min:
            queryset = queryset.filter(product_price__gte=price_min)
        if price_max:
            queryset = queryset.filter(product_price__lte=price_max)

        # Rating filter
        rating = self.request.query_params.get("rating")
        if rating:
            queryset = queryset.filter(average_rating__gte=rating)

        # Sorting
        sort_by = self.request.query_params.get("sort_by", "created_at")
        if sort_by == "popularity":
            queryset = queryset.order_by(
                "-popularity_score"
            )  # Assumes a popularity_score field
        elif sort_by == "price-low":
            queryset = queryset.order_by("product_price")
        elif sort_by == "price-high":
            queryset = queryset.order_by("-product_price")
        elif sort_by == "newest":
            queryset = queryset.order_by("-created_at")
        elif sort_by == "rating":
            queryset = queryset.order_by("-average_rating")
        else:
            queryset = queryset.order_by("-created_at")  # Default sorting

        return queryset

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def perform_update(self, serializer):
        serializer.save()


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
