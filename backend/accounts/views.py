from rest_framework import viewsets, permissions
from .models import (
    User,
    WholeSellerProfile,
    BulkBuyerProfile,
    RegularSellerProfile,
    RegularBuyerProfile,
)
from .serializers import (
    UserSerializer,
    WholeSellerProfileSerializer,
    BulkBuyerProfileSerializer,
    RegularSellerProfileSerializer,
    RegularBuyerProfileSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAdminUser]


class WholeSellerProfileViewSet(viewsets.ModelViewSet):
    queryset = WholeSellerProfile.objects.all()  # ✅ Add this line
    serializer_class = WholeSellerProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BulkBuyerProfileViewSet(viewsets.ModelViewSet):
    queryset = BulkBuyerProfile.objects.all()  # ✅
    serializer_class = BulkBuyerProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegularSellerProfileViewSet(viewsets.ModelViewSet):
    queryset = RegularSellerProfile.objects.all()  # ✅
    serializer_class = RegularSellerProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegularBuyerProfileViewSet(viewsets.ModelViewSet):
    queryset = RegularBuyerProfile.objects.all()  # ✅
    serializer_class = RegularBuyerProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
