from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User,
    WholeSellerProfile,
    BulkBuyerProfile,
    RegularBuyerProfile,
    RegularSellerProfile,
)


class UserAdmin(BaseUserAdmin):
    model = User
    list_display = (
        "email",
        "is_staff",
        "is_active",
        "is_regular_buyer",
        "is_regular_seller",
        "is_wholeseller",
        "is_bulk_buyer",
    )
    list_filter = (
        "is_staff",
        "is_active",
        "is_regular_buyer",
        "is_regular_seller",
        "is_wholeseller",
        "is_bulk_buyer",
    )
    ordering = ("email",)
    search_fields = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                    "is_regular_buyer",
                    "is_regular_seller",
                    "is_wholeseller",
                    "is_bulk_buyer",
                ),
            },
        ),
    )


@admin.register(WholeSellerProfile)
class WholeSellerProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "business_name", "user", "phone", "is_verified")
    search_fields = ("full_name", "business_name", "user__email")


@admin.register(BulkBuyerProfile)
class BulkBuyerProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "user", "city", "state", "country")
    search_fields = ("full_name", "user__email", "city", "state")


@admin.register(RegularSellerProfile)
class RegularSellerProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "user", "phone", "is_verified")
    search_fields = ("full_name", "user__email")


@admin.register(RegularBuyerProfile)
class RegularBuyerProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "user", "phone")
    search_fields = ("full_name", "user__email")


admin.site.register(User, UserAdmin)
