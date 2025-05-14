from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email address is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_regular_buyer = models.BooleanField(default=False)
    is_regular_seller = models.BooleanField(default=False)
    is_wholeseller = models.BooleanField(default=False)
    is_bulk_buyer = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class WholeSellerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="whole_seller_profile"
    )
    full_name = models.CharField(max_length=100)
    business_name = models.CharField(max_length=300)
    phone = models.CharField(max_length=11)
    shop_description = models.TextField(blank=True)
    phone = models.CharField(max_length=20)
    business_address = models.TextField()
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Seller: {self.shop_name} ({self.user.email})"


class BulkBuyerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="bulk_buyer_profile"
    )
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address_line1 = models.TextField()
    address_line2 = models.TextField(blank=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    profile_picture = models.ImageField(upload_to="buyers/", null=True, blank=True)

    def __str__(self):
        return f"Buyer: {self.full_name} ({self.user.email})"


class RegularSellerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="regular_seller_profile"
    )
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    profile_picture = models.ImageField(
        upload_to="regular_sellers/", null=True, blank=True
    )
    bio = models.TextField(blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Regular Seller: {self.full_name} ({self.user.email})"


class RegularBuyerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="regular_buyer_profile"
    )
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    delivery_address = models.TextField()
    profile_picture = models.ImageField(
        upload_to="regular_buyers/", null=True, blank=True
    )

    def __str__(self):
        return f"Regular Buyer: {self.full_name} ({self.user.email})"
