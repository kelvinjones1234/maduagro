from rest_framework import serializers
from .models import Product, ProductCategory


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
    # seller = serializers.HiddenField(default=serializers.CurrentUserDefault())
    product_category = ProductCategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "seller",
            "product_name",
            "product_category",
            "product_description",
            "key_information",
            "average_rating",
            "available",
            "rating_count",
            "product_price",
            "created_at",
            "updated_at",
            "image",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
