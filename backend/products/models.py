from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from accounts.models import User


class ProductCategory(models.Model):
    category_name = models.CharField(max_length=200, blank=False)
    category_slug = models.SlugField(unique=True)
    product_count = models.PositiveIntegerField(
        default=0, editable=False
    )  # using django signal to instead of denomalizing here
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name_plural = "Product Categories"
        indexes = [
            models.Index(fields=["category_slug"]),
            models.Index(fields=["category_name"]),
        ]


class Product(models.Model):
    STOCK_STATUS_CHOICES = [
        ("available", "Available"),
        ("low", "Low in Stock"),
        ("out", "Out of Stock"),
    ]
    seller = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="products_by_seller",
        db_index=True,
    )
    product_name = models.CharField(max_length=500, blank=False)
    product_category = models.ForeignKey(
        ProductCategory,
        on_delete=models.PROTECT,
        related_name="products",
        db_index=True,
    )
    product_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    product_description = models.TextField()
    key_information = models.TextField(max_length=5000, blank=True)
    average_rating = models.FloatField(default=0.0, editable=False)  # Denormalized
    rating_count = models.PositiveIntegerField(
        default=0, editable=False
    )  # Denormalized
    created_at = models.DateTimeField(auto_now_add=True)
    available_quantity = models.PositiveIntegerField(default=20)
    availability_status = models.CharField(
        max_length=10,
        choices=STOCK_STATUS_CHOICES,
        default="out",
    )
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to="", null=True, blank=True)
    weight_per_unit = models.PositiveIntegerField(default=3)

    def __str__(self):
        return self.product_name

    class Meta:
        verbose_name_plural = "Products"
        indexes = [
            models.Index(fields=["product_name"]),
            models.Index(fields=["seller", "created_at"]),
            models.Index(fields=["product_category", "created_at"]),
            models.Index(
                fields=["average_rating"],
                name="idx_product_avg_rating_gte_4",
                condition=models.Q(average_rating__gte=4),
            ),
        ]

    def update_rating(self):
        ratings = self.ratings.all()
        self.rating_count = ratings.count()
        self.average_rating = (
            ratings.aggregate(models.Avg("score"))["score__avg"] or 0.0
        )
        self.save(update_fields=["average_rating", "rating_count"])

    def save(self, *args, **kwargs):
        if self.available_quantity == 0:
            self.availability_status = "out"
        elif self.available_quantity < 5:
            self.availability_status = "low"
        else:
            self.availability_status = "available"
        super().save(*args, **kwargs)


class Faq(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="faqs",
        db_index=True,
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="faqs",
        db_index=True,
    )
    question = models.CharField(max_length=500, blank=True)
    answer = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"FAQ for {self.product}: {self.question}"

    class Meta:
        verbose_name_plural = "FAQs"
        indexes = [
            models.Index(fields=["product", "created_at"]),
        ]


class Rating(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="ratings",
        db_index=True,
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="ratings",
        db_index=True,
    )
    score = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    review = models.TextField(blank=True, max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} rated {self.product} ({self.score})"

    class Meta:
        verbose_name_plural = "Ratings"
        unique_together = ("user", "product")
        indexes = [
            models.Index(fields=["product", "score"]),
            models.Index(
                fields=["score"],
                name="idx_rating_score_gte_4",
                condition=models.Q(score__gte=4),
            ),
        ]
