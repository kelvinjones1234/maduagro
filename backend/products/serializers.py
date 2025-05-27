from rest_framework import serializers
from .models import Product, ProductCategory
from accounts.serializers import RegularSellerProfile


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = [
            "id",
            "category_name",
            "category_slug",
            "product_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["product_count", "created_at", "updated_at"]


class ProductSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(read_only=True)
    rating_count = serializers.IntegerField(read_only=True)
    product_category = ProductCategorySerializer(read_only=True)
    seller_profile = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "seller",
            "seller_profile",  # ✅ Include profile
            "product_name",
            "product_category",
            "product_description",
            "available_quantity",
            "key_information",
            "average_rating",
            "availability_status",
            "rating_count",
            "weight_per_unit",
            "product_price",
            "created_at",
            "updated_at",
            "image",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_seller_profile(self, obj):
        try:
            from accounts.serializers import RegularSellerProfileSerializer

            return RegularSellerProfileSerializer(
                obj.seller.regular_seller_profile
            ).data
        except RegularSellerProfile.DoesNotExist:
            return None
