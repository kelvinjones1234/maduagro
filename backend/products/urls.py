from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductCategoryViewSet
from django.urls import path
from .views import (
    ProductListView,
    ProductCreateView,
    ProductUpdateView,
    ProductDeleteView,
    ProductBulkDeleteView,
)

urlpatterns = [
    path("seller-products/", ProductListView.as_view(), name="product-list"),
    path("products/create/", ProductCreateView.as_view(), name="product-create"),
    path( 
        "product/<int:pk>/update/", ProductUpdateView.as_view(), name="product-update"
    ),
    path(
        "product/<int:pk>/delete/", ProductDeleteView.as_view(), name="product-delete"
    ),
    path(
        "products/bulk-delete/",
        ProductBulkDeleteView.as_view(),
        name="product-bulk-delete",
    ),
]

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"categories", ProductCategoryViewSet, basename="productcategory")

urlpatterns += router.urls
