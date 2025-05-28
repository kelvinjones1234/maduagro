import random
import os
from django.contrib.auth import get_user_model
from django.core.files import File
from django.utils.text import slugify
from products.models import ProductCategory, Product

User = get_user_model()

# Create or get admin user
admin_user, created = User.objects.get_or_create(
    email="admin@gmail.com", defaults={"username": "admin", "password": "admin"}
)
if created:
    admin_user.set_password("admin")
    admin_user.save()

# Optional: Clear existing data
Product.objects.all().delete()
ProductCategory.objects.all().delete()

# Sample descriptions and data
descriptions = [
    "Fresh and organic, straight from the farm.",
    "High-quality produce packed with nutrients.",
    "Locally sourced and naturally grown.",
    "Ideal for bulk buyers and regular consumption.",
    "Best in class, great for healthy living.",
]
product_price = ["100", "140", "200", "300", "350", "400", "420", "450", "500"]

# Agricultural categories
agri_categories = [
    "Grains & Cereals",
    "Fruits",
    "Vegetables",
    "Tubers & Roots",
    "Legumes & Pulses",
    "Nuts & Seeds",
    "Herbs & Spices",
    "Dairy Products",
    "Meat & Livestock",
    "Poultry & Eggs",
    "Fish & Seafood",
    "Beverage Crops",
    "Oil Crops",
]


available_quantity = [0, 1, 2, 3, 4, 5, 6, 7, 8]

# Dummy images to attach
image_files = [
    os.path.join("media", "2148761770.jpg"),  # Make sure this path exists
    os.path.join("media", "2148761770.jpg"),
    os.path.join("media", "2148761770.jpg"),
]

# Dictionary of crops for each category (shortened for 5 used categories)
agri_category_crops = {
    "Grains & Cereals": ["Maize", "Rice", "Wheat", "Millet", "Barley"],
    "Fruits": ["Mango", "Banana", "Orange", "Pineapple", "Apple"],
    "Vegetables": ["Tomato", "Cabbage", "Carrot", "Spinach", "Onion"],
    "Tubers & Roots": ["Cassava", "Yam", "Sweet Potato", "Cocoyam", "Ginger"],
    "Legumes & Pulses": ["Soybean", "Cowpea", "Groundnut", "Lentils", "Chickpeas"],
    "Nuts & Seeds": ["Cashew Nut", "Sesame Seed", "Sunflower Seed"],
    "Herbs & Spices": ["Basil", "Thyme", "Garlic"],
    "Dairy Products": ["Milk", "Cheese", "Butter"],
    "Meat & Livestock": ["Beef", "Goat Meat"],
    "Poultry & Eggs": ["Chicken", "Duck", "Eggs"],
    "Fish & Seafood": ["Catfish", "Tilapia", "Shrimp"],
    "Beverage Crops": ["Coffee", "Tea", "Cocoa"],
    "Oil Crops": ["Palm Oil", "Soybean", "Coconut"],
}


# availability_status = ["out", "available", "low"]

# Create 5 random unique categories
used_categories = random.sample(agri_categories, 5)

for category_name in used_categories:
    category_slug = slugify(category_name)
    category = ProductCategory.objects.create(
        category_name=category_name, category_slug=category_slug
    )

    crop_list = agri_category_crops.get(category_name, ["Generic Product"])

    for i in range(1, 21):
        crop_name = random.choice(crop_list)
        product_name = f"{crop_name}"
        image_path = random.choice(image_files)

        with open(image_path, "rb") as img_file:
            product = Product(
                seller=admin_user,
                product_name=product_name,
                product_category=category,
                available_quantity=random.choice(available_quantity),
                product_description=random.choice(descriptions),
                product_price=random.choice(product_price),
                average_rating=round(random.uniform(2.0, 5.0), 1),
                rating_count=random.randint(1, 100),
                # available=random.choice(availability_status),
            )
            product.image.save(
                f"{slugify(product_name)}.jpg", File(img_file), save=True
            )

print("✅ Done: 5 categories and 100 products created.")
