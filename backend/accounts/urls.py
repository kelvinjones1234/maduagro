from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    WholeSalerProfileViewSet,
    BulkBuyerProfileViewSet,
    RegularSellerProfileViewSet,
    RegularBuyerProfileViewSet,
    LoginView,
    RegisterView,
    CookieTokenRefreshView,
    UserProfileView,
    LogoutView,
) 

router = DefaultRouter()
router.register(r"wholesaler", WholeSalerProfileViewSet)
router.register(r"bulk-buyer", BulkBuyerProfileViewSet)
router.register(r"regular-seller", RegularSellerProfileViewSet)
router.register(r"regular-buyer", RegularBuyerProfileViewSet)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("user/", UserProfileView.as_view(), name="user_profile"),
]

urlpatterns += router.urls
