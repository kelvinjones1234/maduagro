from django.contrib import admin
from .models import ProductCategory, Product, Faq, Rating


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "category_name",
        "category_slug",
        "product_count",
        "created_at",
    )
    search_fields = ("category_name", "category_slug")
    prepopulated_fields = {"category_slug": ("category_name",)}
    ordering = ("-created_at",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "product_name",
        "seller",
        "product_category",
        "average_rating",
        "rating_count",
        "product_price",
        "created_at",
        "available",
    )
    list_filter = ("product_category", "created_at")
    search_fields = ("product_name", "seller__email", "product_category__category_name")
    autocomplete_fields = ("seller", "product_category")
    readonly_fields = ("average_rating", "rating_count", "created_at", "updated_at")
    ordering = ("-created_at",)


@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ("product", "user", "question", "created_at")
    search_fields = ("product__product_name", "user__email", "question")
    list_filter = ("created_at",)
    autocomplete_fields = ("user", "product")
    ordering = ("-created_at",)


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ("product", "user", "score", "created_at")
    list_filter = ("score", "created_at")
    search_fields = ("product__product_name", "user__email", "review")
    autocomplete_fields = ("user", "product")
    ordering = ("-created_at",)
