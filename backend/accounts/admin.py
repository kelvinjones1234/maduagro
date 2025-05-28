from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User,
    WholeSalerProfile,
    BulkBuyerProfile,
    RegularBuyerProfile,
    RegularSellerProfile,
)


class UserAdmin(BaseUserAdmin):
    model = User
    list_display = (
        "first_name",
        "last_name",
        "email",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "is_staff",
        "is_active",
    )
    ordering = ("email",)
    search_fields = ("email", "first_name", "last_name")

    # Fields displayed when viewing/editing a user
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login",)}),
    )

    # Fields displayed when creating a new user via the admin
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )


@admin.register(WholeSalerProfile)
class WholeSellerProfileAdmin(admin.ModelAdmin):
    list_display = ("business_name", "user", "phone", "is_verified")
    search_fields = ("business_name", "user__email")


@admin.register(BulkBuyerProfile)
class BulkBuyerProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "city", "state", "country")
    search_fields = ("user__email", "city", "state")


@admin.register(RegularSellerProfile)
class RegularSellerProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "is_verified")
    search_fields = ("user__email",)


@admin.register(RegularBuyerProfile)
class RegularBuyerProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "phone")
    search_fields = ("user__email",)


admin.site.register(User, UserAdmin)
