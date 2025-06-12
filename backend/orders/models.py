from django.db import models
from django.core.validators import MinValueValidator, RegexValidator
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from decimal import Decimal
import uuid
from accounts.models import User
from products.models import Product


class ContactDetails(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="contact_details",
        null=True,
        blank=True,
    )
    phone = models.CharField(
        max_length=20,
        verbose_name=_("Phone Number"),
        validators=[
            RegexValidator(r"^\+?1?\d{9,15}$", _("Invalid phone number format"))
        ],
        blank=True,
        null=True,
    )
    email = models.EmailField(verbose_name=_("Email Address"), blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Contact Details")
        verbose_name_plural = _("Contact Details")
        indexes = [models.Index(fields=["user"])]

    def __str__(self):
        return f"{self.email or 'No email'} - {self.phone or 'No phone'}"

    def clean(self):
        if not self.phone and not self.email:
            raise ValidationError(_("At least phone or email must be provided"))


class ShippingDetails(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="shipping_addresses"
    )
    first_name = models.CharField(max_length=255, db_index=True)
    last_name = models.CharField(max_length=255, db_index=True)
    street = models.CharField(max_length=500, blank=True, null=True)
    city = models.CharField(max_length=100, db_index=True)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, db_index=True)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Shipping Address")
        verbose_name_plural = _("Shipping Addresses")
        ordering = ["-is_default", "-created_at"]
        indexes = [models.Index(fields=["user", "is_default"])]

    def __str__(self):
        return f"{self.full_name}, {self.city}, {self.country}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def full_address(self):
        parts = [self.street, self.city, self.state, self.postal_code, self.country]
        return ", ".join(filter(None, parts))

    def save(self, *args, **kwargs):
        if self.is_default:
            ShippingDetails.objects.filter(user=self.user, is_default=True).update(
                is_default=False
            )
        super().save(*args, **kwargs)


class OrderManager(models.Manager):
    def active(self):
        return self.exclude(status__in=[Order.Status.CANCELLED, Order.Status.REFUNDED])

    def completed(self):
        return self.filter(status__in=[Order.Status.DELIVERED, Order.Status.REFUNDED])

    def pending(self):
        return self.filter(status=Order.Status.PENDING)


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", _("Pending")
        CONFIRMED = "CONFIRMED", _("Confirmed")
        PROCESSING = "PROCESSING", _("Processing")
        PARTIALLY_SHIPPED = "PARTIALLY_SHIPPED", _("Partially Shipped")
        SHIPPED = "SHIPPED", _("Shipped")
        DELIVERED = "DELIVERED", _("Delivered")
        CANCELLED = "CANCELLED", _("Cancelled")
        REFUNDED = "REFUNDED", _("Refunded")

    order_number = models.CharField(max_length=20, unique=True, db_index=True)
    customer = models.ForeignKey(User, on_delete=models.PROTECT, related_name="orders")
    delivery_details = models.ForeignKey(ShippingDetails, on_delete=models.PROTECT)
    contact_details = models.ForeignKey(ContactDetails, on_delete=models.PROTECT)
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.00"))]
    )
    shipping_cost = models.DecimalField(
        max_digits=10, decimal_places=2, default=Decimal("0.00")
    )

    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.00"))]
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True
    )
    is_completed = models.BooleanField(default=False, db_index=True)
    ordered_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = OrderManager()

    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")
        ordering = ["-ordered_at"]
        indexes = [
            models.Index(fields=["customer", "status"]),
            models.Index(fields=["delivery_details", "ordered_at"]),
            models.Index(fields=["is_completed"]),
        ]

    def __str__(self):
        return f"Order {self.order_number} by {self.customer_name}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = self.generate_order_number()
        self.calculate_totals()
        super().save(*args, **kwargs)

    def generate_order_number(self):
        return f"ORD{uuid.uuid4().hex[:12].upper()}"

    def calculate_totals(self):
        self.subtotal = sum(item.subtotal for item in self.items.all())
        self.total_price = self.subtotal + self.shipping_cost
        return self.total_price

    def update_completion_status(self):
        """Check if all order items are delivered and update is_completed."""
        all_delivered = all(
            item.delivery_status == OrderItem.DeliveryStatus.DELIVERED
            for item in self.items.all()
        )
        self.is_completed = all_delivered
        self.save(update_fields=["is_completed", "updated_at"])

    @property
    def customer_name(self):
        if hasattr(self.customer, "get_full_name"):
            return self.customer.get_full_name()
        return str(self.customer)

    @property
    def can_be_cancelled(self):
        return self.status in [self.Status.PENDING, self.Status.CONFIRMED]

    def transition_to(self, new_status, reason=None):
        valid_transitions = {
            self.Status.PENDING: [self.Status.CONFIRMED, self.Status.CANCELLED],
            self.Status.CONFIRMED: [self.Status.PROCESSING, self.Status.CANCELLED],
            self.Status.PROCESSING: [
                self.Status.PARTIALLY_SHIPPED,
                self.Status.SHIPPED,
                self.Status.CANCELLED,
            ],
            self.Status.PARTIALLY_SHIPPED: [self.Status.SHIPPED, self.Status.CANCELLED],
            self.Status.SHIPPED: [self.Status.DELIVERED, self.Status.REFUNDED],
            self.Status.DELIVERED: [self.Status.REFUNDED],
            self.Status.CANCELLED: [],
            self.Status.REFUNDED: [],
        }
        if new_status not in valid_transitions.get(self.status, []):
            raise ValidationError(
                _(f"Cannot transition from {self.status} to {new_status}")
            )
        self.status = new_status
        if reason:
            OrderNote.objects.create(order=self, note=reason, created_by=self.customer)
        self.save(update_fields=["status", "updated_at"])

    def cancel_order(self, reason=None):
        self.transition_to(self.Status.CANCELLED, reason=reason)

    def clean(self):
        if self.delivery_details and self.customer:
            if self.delivery_details.user != self.customer:
                raise ValidationError(
                    {
                        "delivery_details": _(
                            "Delivery details must belong to the customer"
                        )
                    }
                )
        if not self.items.exists():
            raise ValidationError(_("Order must have at least one item"))


class OrderItem(models.Model):
    class DeliveryStatus(models.TextChoices):
        PENDING = "PENDING", _("Pending")
        PROCESSING = "PROCESSING", _("Processing")
        SHIPPED = "SHIPPED", _("Shipped")
        DELIVERED = "DELIVERED", _("Delivered")
        CANCELLED = "CANCELLED", _("Cancelled")

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    product_name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    unit_price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.01"))]
    )
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.00"))]
    )
    delivery_status = models.CharField(
        max_length=20,
        choices=DeliveryStatus.choices,
        default=DeliveryStatus.PENDING,
        db_index=True,
    )

    class Meta:
        verbose_name = _("Order Item")
        verbose_name_plural = _("Order Items")
        indexes = [models.Index(fields=["delivery_status"])]

    def __str__(self):
        return f"{self.product_name} (x{self.quantity}) - {self.get_delivery_status_display()}"

    def save(self, *args, **kwargs):
        if not self.product_name and self.product:
            self.product_name = str(self.product)
        self.subtotal = self.unit_price * self.quantity
        super().save(*args, **kwargs)
        self.order.calculate_totals()
        self.order.update_completion_status()
        self.order.save(update_fields=["subtotal", "total_price", "updated_at"])

    def clean(self):
        if self.quantity <= 0:
            raise ValidationError({"quantity": _("Quantity must be greater than 0")})
        if self.unit_price and self.unit_price <= 0:
            raise ValidationError(
                {"unit_price": _("Unit price must be greater than 0")}
            )


class OrderNote(models.Model):
    order = models.OneToOneField(
        OrderItem, on_delete=models.CASCADE, related_name="notes"
    )
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Order Note")
        verbose_name_plural = _("Order Notes")
        ordering = ["-created_at"]

    def __str__(self):
        return f"Note for {self.order.product_name} at {self.created_at}"
