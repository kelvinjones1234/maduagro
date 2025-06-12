from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.db.models import Sum
from django.utils import timezone
from django.contrib import messages
from django.http import HttpResponse
from django.core.exceptions import ValidationError
import csv
from .models import ContactDetails, ShippingDetails, Order, OrderItem, OrderNote


@admin.register(ContactDetails)
class ContactDetailsAdmin(admin.ModelAdmin):
    list_display = ("email", "phone", "user", "created_at")
    list_filter = ("created_at",)
    search_fields = ("email", "phone", "user__username")
    readonly_fields = ("created_at", "updated_at")
    raw_id_fields = ("user",)


@admin.register(ShippingDetails)
class ShippingDetailsAdmin(admin.ModelAdmin):
    list_display = ("full_name", "user", "city", "country", "is_default", "created_at")
    list_filter = ("is_default", "country", "city", "created_at")
    search_fields = ("first_name", "last_name", "city", "country", "user__username")
    list_editable = ("is_default",)
    readonly_fields = ("created_at", "updated_at")
    raw_id_fields = ("user",)

    def full_name(self, obj):
        return obj.full_name

    full_name.admin_order_field = "first_name"


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    readonly_fields = ("subtotal",)
    fields = (
        "product",
        "product_name",
        "quantity",
        "unit_price",
        "subtotal",
        "delivery_status",
    )
    raw_id_fields = ("product",)

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("product")


class OrderNoteInline(admin.TabularInline):
    model = OrderNote
    extra = 1
    fields = ("note", "created_by", "created_at")
    readonly_fields = ("created_at",)
    raw_id_fields = ("created_by",)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "order_number",
        "customer_link",
        "item_count",
        "status_badge",
        "is_completed",
        "total_price",
        "ordered_at",
    )
    list_filter = ("status", "is_completed", "ordered_at", "customer")

    inlines = [OrderNoteInline]
    search_fields = (
        "order_number",
        "customer__email",
        "customer__first_name",
        "items__product_name",
    )
    readonly_fields = (
        "order_number",
        "subtotal",
        "total_price",
        "is_completed",
        "ordered_at",
        "updated_at",
    )
    raw_id_fields = ("customer", "delivery_details", "contact_details")
    list_per_page = 25
    date_hierarchy = "ordered_at"
    inlines = [OrderItemInline]

    fieldsets = (
        (
            _("Order Information"),
            {
                "fields": (
                    "order_number",
                    "status",
                    "is_completed",
                    "customer",
                    "ordered_at",
                    "updated_at",
                )
            },
        ),
        (_("Contact & Delivery"), {"fields": ("contact_details", "delivery_details")}),
        (
            _("Financial Details"),
            {"fields": ("subtotal", "shipping_cost", "total_price")},
        ),
    )

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("customer", "delivery_details", "contact_details")
            .prefetch_related("items__product")
        )

    def customer_link(self, obj):
        if obj.customer:
            url = reverse("admin:accounts_user_change", args=[obj.customer.pk])
            return format_html('<a href="{}">{}</a>', url, obj.customer_name)
        return "-"

    customer_link.short_description = _("Customer")
    customer_link.admin_order_field = "customer__first_name"

    def item_count(self, obj):
        return obj.items.count()

    item_count.short_description = _("Items")
    item_count.admin_order_field = "items"

    def status_badge(self, obj):
        colors = {
            Order.Status.PENDING: "#ff9800",
            Order.Status.CONFIRMED: "#2196f3",
            Order.Status.PROCESSING: "#9c27b0",
            Order.Status.PARTIALLY_SHIPPED: "#4caf50",
            Order.Status.SHIPPED: "#4caf50",
            Order.Status.DELIVERED: "#388e3c",
            Order.Status.CANCELLED: "#f44336",
            Order.Status.REFUNDED: "#757575",
        }
        color = colors.get(obj.status, "#000")
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display(),
        )

    status_badge.short_description = _("Status")
    status_badge.admin_order_field = "status"

    # Actions
    actions = [
        "mark_as_confirmed",
        "mark_as_processing",
        "mark_as_partially_shipped",
        "mark_as_shipped",
        "mark_as_delivered",
        "mark_as_cancelled",
        "mark_as_refunded",
        "export_to_csv",
    ]

    def mark_as_confirmed(self, request, queryset):
        updated = 0
        for order in queryset.filter(status=Order.Status.PENDING):
            try:
                order.transition_to(Order.Status.CONFIRMED)
                updated += 1
            except ValidationError as e:
                self.message_user(
                    request, f"Error for {order.order_number}: {e}", messages.ERROR
                )
        self.message_user(
            request, f"{updated} orders marked as confirmed.", messages.SUCCESS
        )

    mark_as_confirmed.short_description = _("Mark as confirmed")

    def mark_as_processing(self, request, queryset):
        updated = 0
        for order in queryset.filter(
            status__in=[Order.Status.PENDING, Order.Status.CONFIRMED]
        ):
            try:
                order.transition_to(Order.Status.PROCESSING)
                updated += 1
            except ValidationError as e:
                self.message_user(
                    request, f"Error for {order.order_number}: {e}", messages.ERROR
                )
        self.message_user(
            request, f"{updated} orders marked as processing.", messages.SUCCESS
        )

    mark_as_processing.short_description = _("Mark as processing")

    def mark_as_partially_shipped(self, request, queryset):
        updated = 0
        for order in queryset.filter(status=Order.Status.PROCESSING):
            try:
                order.transition_to(Order.Status.PARTIALLY_SHIPPED)
                updated += 1
            except ValidationError as e:
                self.message_user(
                    request, f"Error for {order.order_number}: {e}", messages.ERROR
                )
        self.message_user(
            request, f"{updated} orders marked as partially shipped.", messages.SUCCESS
        )

    mark_as_partially_shipped.short_description = _("Mark as partially shipped")

    def mark_as_shipped(self, request, queryset):
        updated = 0
        for order in queryset.filter(
            status__in=[Order.Status.PROCESSING, Order.Status.PARTIALLY_SHIPPED]
        ):
            try:
                order.transition_to(Order.Status.SHIPPED)
                updated += 1
            except ValidationError as e:
                self.message_user(
                    request, f"Error for {order.order_number}: {e}", messages.ERROR
                )
        self.message_user(
            request, f"{updated} orders marked as shipped.", messages.SUCCESS
        )

    mark_as_shipped.short_description = _("Mark as shipped")

    def mark_as_delivered(self, request, queryset):
        updated = 0
        for order in queryset.filter(status=Order.Status.SHIPPED):
            try:
                order.transition_to(Order.Status.DELIVERED)
                # Mark all items as delivered
                order.items.update(delivery_status=OrderItem.DeliveryStatus.DELIVERED)
                order.update_completion_status()
                updated += 1
            except ValidationError as e:
                self.message_user(
                    request, f"Error for {order.order_number}: {e}", messages.ERROR
                )
        self.message_user(
            request, f"{updated} orders marked as delivered.", messages.SUCCESS
        )

    mark_as_delivered.short_description = _("Mark as delivered")

    def mark_as_cancelled(self, request, queryset):
        updated = 0
        for order in queryset.filter(
            status__in=[Order.Status.PENDING, Order.Status.CONFIRMED]
        ):
            try:
                order.transition_to(
                    Order.Status.CANCELLED, reason="Cancelled via admin"
                )
                order.items.update(delivery_status=OrderItem.DeliveryStatus.CANCELLED)
                order.update_completion_status()
                updated += 1
            except ValidationError as e:
                self.message_user(
                    request, f"Error for {order.order_number}: {e}", messages.ERROR
                )
        self.message_user(request, f"{updated} orders cancelled.", messages.SUCCESS)

    mark_as_cancelled.short_description = _("Mark as cancelled")

    def mark_as_refunded(self, request, queryset):
        updated = 0
        for order in queryset.filter(
            status__in=[Order.Status.SHIPPED, Order.Status.DELIVERED]
        ):
            try:
                order.transition_to(Order.Status.REFUNDED, reason="Refunded via admin")
                order.update_completion_status()
                updated += 1
            except ValidationError as e:
                self.message_user(
                    request, f"Error for {order.order_number}: {e}", messages.ERROR
                )
        self.message_user(
            request, f"{updated} orders marked as refunded.", messages.SUCCESS
        )

    mark_as_refunded.short_description = _("Mark as refunded")

    def export_to_csv(self, request, queryset):
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = (
            f'attachment; filename="orders_{timezone.now().strftime("%Y%m%d_%H%M")}.csv"'
        )

        writer = csv.writer(response)
        writer.writerow(
            [
                "Order Number",
                "Customer",
                "Email",
                "Product",
                "Quantity",
                "Unit Price",
                "Subtotal",
                "Total Price",
                "Order Status",
                "Delivery Status",
                "Ordered At",
            ]
        )

        for order in queryset.prefetch_related("items"):
            for item in order.items.all():
                writer.writerow(
                    [
                        order.order_number,
                        order.customer_name,
                        order.contact_details.email if order.contact_details else "",
                        item.product_name,
                        item.quantity,
                        item.unit_price,
                        item.subtotal,
                        order.total_price,
                        order.get_status_display(),
                        item.get_delivery_status_display(),
                        order.ordered_at.strftime("%Y-%m-%d %H:%M:%S"),
                    ]
                )

        return response

    export_to_csv.short_description = _("Export to CSV")

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        queryset = self.get_queryset(request)
        stats = {
            "total_orders": queryset.count(),
            "pending_orders": queryset.filter(status=Order.Status.PENDING).count(),
            "completed_orders": queryset.filter(is_completed=True).count(),
            "total_revenue": queryset.aggregate(total=Sum("total_price"))["total"] or 0,
        }
        extra_context["summary_stats"] = stats
        return super().changelist_view(request, extra_context)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "product_name",
        "quantity",
        "unit_price",
        "subtotal",
        "delivery_status",
    )
    list_filter = ("order__status", "delivery_status")
    search_fields = ("order__order_number", "product_name")
    readonly_fields = ("subtotal",)
    raw_id_fields = ("order", "product")


@admin.register(OrderNote)
class OrderNoteAdmin(admin.ModelAdmin):
    list_display = ("order", "note_preview", "created_at")
    list_filter = ("created_at",)
    search_fields = (
        "order__order_number",
        "note",
    )
    readonly_fields = ("created_at",)
    raw_id_fields = ("order",)

    def note_preview(self, obj):
        return obj.note[:50] + "..." if len(obj.note) > 50 else obj.note

    note_preview.short_description = _("Note")
