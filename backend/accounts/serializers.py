from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import (
    User,
    WholeSalerProfile,
    BulkBuyerProfile,
    RegularSellerProfile,
    RegularBuyerProfile,
)

from rest_framework_simplejwt.views import TokenRefreshView


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    user_type = serializers.CharField(write_only=True, required=False)
    email = serializers.EmailField()  # Override to remove unique validation

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password", "user_type"]

    def validate_email(self, value):
        """Custom email validation that allows existing users for profile creation"""
        user_type = self.initial_data.get("user_type")

        if User.objects.filter(email=value).exists():
            if not user_type:
                raise serializers.ValidationError(
                    "User already exists. Please provide a user_type to create a new profile."
                )

            # Check if user already has this profile type
            user = User.objects.get(email=value)
            if self._check_profile_exists(user, user_type):
                raise serializers.ValidationError(
                    f"User already has a {user_type} profile."
                )

        return value

    def create(self, validated_data):
        email = validated_data["email"]
        user_type = validated_data.get("user_type")

        # Check if user already exists
        try:
            user = User.objects.get(email=email)
            # User exists - create the new profile (validation already done in validate())
            if user_type:
                self._create_profile(user, user_type)
            return user

        except User.DoesNotExist:
            # User doesn't exist, create new user
            user = User.objects.create_user(
                email=email,
                first_name=validated_data.get("first_name"),
                last_name=validated_data.get("last_name"),
                password=validated_data["password"],
            )

            # Create profile if user_type is provided
            if user_type:
                self._create_profile(user, user_type)

            return user

    def _check_profile_exists(self, user, user_type):
        """Check if user already has the specified profile type"""
        if user_type == "wholesaler":
            return WholeSalerProfile.objects.filter(user=user).exists()
        elif user_type == "bulk buyer":
            return BulkBuyerProfile.objects.filter(user=user).exists()
        elif user_type == "regular seller":
            return RegularSellerProfile.objects.filter(user=user).exists()
        elif user_type == "regular buyer":
            return RegularBuyerProfile.objects.filter(user=user).exists()
        return False

    def _create_profile(self, user, user_type):
        """Create the specified profile type for the user with get_or_create to avoid duplicates"""
        created = False

        if user_type == "wholesaler":
            profile, created = WholeSalerProfile.objects.get_or_create(user=user)
        elif user_type == "bulk buyer":
            profile, created = BulkBuyerProfile.objects.get_or_create(user=user)
        elif user_type == "regular seller":
            profile, created = RegularSellerProfile.objects.get_or_create(user=user)
        elif user_type == "regular buyer":
            profile, created = RegularBuyerProfile.objects.get_or_create(user=user)

        if not created:
            raise serializers.ValidationError(
                {"user_type": f"User already has a {user_type} profile."}
            )


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = request.COOKIES.get(
            "refresh_token"
        )  # If you store refresh token in a cookie
        if refresh:
            response.set_cookie(
                key="access_token",
                value=response.data["access"],
                httponly=True,
                secure=False,  # True in production
                samesite="Lax",
            )
        return response


class WholeSalerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WholeSalerProfile
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "is_active",
            "is_staff",
        ]
        read_only_fields = ["id", "date_joined"]
