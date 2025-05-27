from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductCategoryViewSet, WholesalerViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(
    r"wholesaler-products", WholesalerViewSet, basename="wholesaler-products"
)
router.register(r"categories", ProductCategoryViewSet, basename="productcategory")

urlpatterns = router.urls

