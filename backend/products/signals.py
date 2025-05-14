from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Product, Rating


def update_product_count(category):
    count = category.products.count()
    category.product_count = count
    category.save(update_fields=["product_count"])


@receiver(post_save, sender=Product)
def update_product_count_on_save(sender, instance, **kwargs):
    if instance.category:
        update_product_count(instance.category)


@receiver(post_delete, sender=Product)
def update_product_count_on_delete(sender, instance, **kwargs):
    if instance.category:
        update_product_count(instance.category)


@receiver(post_save, sender=Rating)
def update_product_rating_on_save(sender, instance, **kwargs):
    instance.product.update_rating()


@receiver(post_delete, sender=Rating)
def update_product_rating_on_delete(sender, instance, **kwargs):
    instance.product.update_rating()
