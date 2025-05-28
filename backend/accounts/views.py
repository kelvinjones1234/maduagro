from rest_framework import viewsets, status
from .models import (
    WholeSalerProfile,
    BulkBuyerProfile,
    RegularSellerProfile,
    RegularBuyerProfile,
)
from .serializers import (
    WholeSalerProfileSerializer,
    BulkBuyerProfileSerializer,
    RegularSellerProfileSerializer,
    RegularBuyerProfileSerializer,
    LoginSerializer,
    RegisterSerializer,
)
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework_simplejwt.exceptions import InvalidToken
from .authentication import CookieJWTAuthentication
import logging


class WholeSalerProfileViewSet(viewsets.ModelViewSet):
    queryset = WholeSalerProfile.objects.all()  # Add this line
    serializer_class = WholeSalerProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BulkBuyerProfileViewSet(viewsets.ModelViewSet):
    queryset = BulkBuyerProfile.objects.all()
    serializer_class = BulkBuyerProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegularSellerProfileViewSet(viewsets.ModelViewSet):
    queryset = RegularSellerProfile.objects.all()
    serializer_class = RegularSellerProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegularBuyerProfileViewSet(viewsets.ModelViewSet):
    queryset = RegularBuyerProfile.objects.all()
    serializer_class = RegularBuyerProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate tokens
            refresh = RefreshToken.for_user(user)

            response = Response(
                {
                    "detail": "Registration successful",
                    "email": user.email,
                },
                status=status.HTTP_201_CREATED,
            )

            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=str(refresh.access_token),
                httponly=True,
                secure=settings.SIMPLE_JWT.get("AUTH_COOKIE_SECURE", False),
                samesite=settings.SIMPLE_JWT.get("AUTH_COOKIE_SAMESITE", "Lax"),
            )

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Logout successful"})
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response


logger = logging.getLogger(__name__)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]
        user = authenticate(request, email=email, password=password)

        if user is None:
            logger.warning(f"Authentication failed for email: {email}")
            return Response(
                {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        # Determine profile types
        profile_types = []
        if hasattr(user, "wholesaler_profile"):  # Use underscore
            profile_types.append("wholesaler")
        if hasattr(user, "bulk_buyer_profile"):  # Use underscore
            profile_types.append("bulk buyer")
        if hasattr(user, "regular_seller_profile"):  # Use underscore
            profile_types.append("regular seller")
        if hasattr(user, "regular_buyer_profile"):  # Use underscore
            profile_types.append("regular buyer")

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        print("profile types", profile_types)

        response = Response(
            {
                "detail": "Login successful",
                "email": user.email,
                "profile_types": profile_types,
            },
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,  # Must be True for SameSite=None
            samesite="None",
            max_age=3600,  # 1 hour for access token
        )
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite="None",
            max_age=7 * 24 * 3600,  # 7 days for refresh token
        )
        logger.info(f"User {email} logged in successfully")
        return response


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            logger.warning("Refresh token not provided in request")
            return Response(
                {"error": "Refresh token not provided"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            response = Response(
                {"message": "Access token refreshed successfully"},
                status=status.HTTP_200_OK,
            )
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,  # Must be True for SameSite=None
                samesite="None",
                max_age=3600,  # 1 hour for access token
            )
            logger.info("Access token refreshed successfully")
            return response
        except InvalidToken:
            logger.error("Invalid refresh token provided")
            return Response(
                {"error": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED
            )


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            logger.warning("Unauthenticated access attempt to UserProfileView")
            return Response(
                {"error": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        profile_types = []
        if hasattr(user, "wholesalerprofile"):
            profile_types.append("wholesaler")
        if hasattr(user, "bulkbuyerprofile"):
            profile_types.append("bulk buyer")
        if hasattr(user, "regularsellerprofile"):
            profile_types.append("regular seller")
        if hasattr(user, "regularbuyerprofile"):
            profile_types.append("regular buyer")

        response_data = {
            "email": user.email,
            "profile_types": profile_types,
        }
        logger.info(f"Profile retrieved for user: {user.email}")
        return Response(response_data, status=status.HTTP_200_OK)
