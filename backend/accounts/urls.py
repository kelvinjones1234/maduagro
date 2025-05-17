from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    WholeSellerProfileViewSet,
    BulkBuyerProfileViewSet,
    RegularSellerProfileViewSet,
    RegularBuyerProfileViewSet,
)

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"wholesellers", WholeSellerProfileViewSet)
router.register(r"bulk-buyers", BulkBuyerProfileViewSet)
router.register(r"regular-sellers", RegularSellerProfileViewSet)
router.register(r"regular-buyers", RegularBuyerProfileViewSet)

urlpatterns = router.urls
