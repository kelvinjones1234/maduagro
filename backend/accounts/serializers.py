from rest_framework import serializers
from .models import (
    User,
    WholeSellerProfile,
    BulkBuyerProfile,
    RegularSellerProfile,
    RegularBuyerProfile,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "is_active",
            "is_staff",
            "is_regular_buyer",
            "is_regular_seller",
            "is_wholeseller",
            "is_bulk_buyer",
            "date_joined",
        ]
        read_only_fields = ["id", "date_joined"]


class WholeSellerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WholeSellerProfile
        fields = "__all__"
        read_only_fields = ["user"]


class BulkBuyerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BulkBuyerProfile
        fields = "__all__"
        read_only_fields = ["user"]


class RegularSellerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegularSellerProfile
        fields = "__all__"
        read_only_fields = ["user"]


class RegularBuyerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegularBuyerProfile
        fields = "__all__"
        read_only_fields = ["user"]
