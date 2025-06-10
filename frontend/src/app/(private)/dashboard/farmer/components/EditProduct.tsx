"use client";

import { X, Upload, AlertTriangle } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";
import { useState, useEffect, useRef } from "react";
import { editProduct, fetchCategories } from "../api";
import Notification from "./Notification";

interface ProductCategory {
  id: string;
  category_name: string;
  category_slug: string;
}

interface ProductForm {
  product_name: string;
  product_category: string | null;
  product_description: string;
  available_quantity: string | null;
  availability_status: string;
  weight_per_unit: string | null;
  product_price: string | null;
  image: File | null;
  imagePreview: string;
}

export default function EditProduct() {
  const { selectedProduct, setShowModal, refreshProducts } = useDashboard();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const [productForm, setProductForm] = useState<ProductForm>({
    product_name: "",
    product_category: null,
    product_description: "",
    available_quantity: null,
    availability_status: "available",
    weight_per_unit: null,
    product_price: null,
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setProductForm({
        product_name: selectedProduct.product_name || "",
        product_category: selectedProduct.category_details?.id || null,
        product_description: selectedProduct.product_description || "",
        available_quantity:
          selectedProduct.available_quantity?.toString() || null,
        availability_status: selectedProduct.availability_status || "available",
        weight_per_unit: selectedProduct.weight_per_unit?.toString() || null,
        product_price: selectedProduct.product_price?.toString() || null,
        image: null,
        imagePreview: selectedProduct.image || "",
      });
    }
  }, [selectedProduct]);

  useEffect(() => {
    const abortController = new AbortController();
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        if (!abortController.signal.aborted) {
          setCategories(categoriesData);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setNotification({
            message: "Failed to load categories. Please try again.",
            type: "error",
          });
          setErrors((prev) => ({
            ...prev,
            form: "Failed to load categories. Please try again.",
          }));
        }
      }
    };
    loadCategories();
    return () => abortController.abort();
  }, []);

  const validateField = (fieldName: string) => {
    const newErrors = { ...errors };
    switch (fieldName) {
      case "product_name":
        if (!productForm.product_name.trim()) {
          newErrors.product_name = "Product name is required";
        } else {
          delete newErrors.product_name;
        }
        break;
      case "product_category":
        if (!productForm.product_category) {
          newErrors.product_category = "Category is required";
        } else {
          delete newErrors.product_category;
        }
        break;
      case "product_description":
        if (!productForm.product_description.trim()) {
          newErrors.product_description = "Description is required";
        } else {
          delete newErrors.product_description;
        }
        break;
      case "available_quantity":
        if (!productForm.available_quantity) {
          newErrors.available_quantity = "Available quantity is required";
        } else if (!/^\d+$/.test(productForm.available_quantity)) {
          newErrors.available_quantity = "Enter a valid integer (e.g., 500)";
        } else if (Number(productForm.available_quantity) < 0) {
          newErrors.available_quantity = "Quantity cannot be negative";
        } else {
          delete newErrors.available_quantity;
        }
        break;
      case "weight_per_unit":
        if (!productForm.weight_per_unit) {
          newErrors.weight_per_unit = "Weight per unit is required";
        } else if (!/^\d+$/.test(productForm.weight_per_unit)) {
          newErrors.weight_per_unit = "Enter a valid integer (e.g., 1)";
        } else if (Number(productForm.weight_per_unit) <= 0) {
          newErrors.weight_per_unit = "Weight must be greater than 0";
        } else {
          delete newErrors.weight_per_unit;
        }
        break;
      case "product_price":
        if (!productForm.product_price) {
          newErrors.product_price = "Price per unit is required";
        } else if (!/^\d+(\.\d{1,2})?$/.test(productForm.product_price)) {
          newErrors.product_price = "Enter a valid price (e.g., 800 or 800.00)";
        } else if (Number(productForm.product_price) <= 0) {
          newErrors.product_price = "Price must be greater than 0";
        } else {
          delete newErrors.product_price;
        }
        break;
      case "image":
        if (!productForm.image && !productForm.imagePreview) {
          newErrors.image = "Product image is required";
        } else {
          delete newErrors.image;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!productForm.product_name.trim()) {
      newErrors.product_name = "Product name is required";
    }
    if (!productForm.product_category) {
      newErrors.product_category = "Category is required";
    }
    if (!productForm.product_description.trim()) {
      newErrors.product_description = "Description is required";
    }
    if (!productForm.available_quantity) {
      newErrors.available_quantity = "Available quantity is required";
    } else if (!/^\d+$/.test(productForm.available_quantity)) {
      newErrors.available_quantity = "Enter a valid integer (e.g., 500)";
    } else if (Number(productForm.available_quantity) < 0) {
      newErrors.available_quantity = "Quantity cannot be negative";
    }
    if (!productForm.weight_per_unit) {
      newErrors.weight_per_unit = "Weight per unit is required";
    } else if (!/^\d+$/.test(productForm.weight_per_unit)) {
      newErrors.weight_per_unit = "Enter a valid integer (e.g., 1)";
    } else if (Number(productForm.weight_per_unit) <= 0) {
      newErrors.weight_per_unit = "Weight must be greater than 0";
    }
    if (!productForm.product_price) {
      newErrors.product_price = "Price per unit is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(productForm.product_price)) {
      newErrors.product_price = "Enter a valid price (e.g., 800 or 800.00)";
    } else if (Number(productForm.product_price) <= 0) {
      newErrors.product_price = "Price must be greater than 0";
    }
    if (!productForm.image && !productForm.imagePreview) {
      newErrors.image = "Product image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (touched[name]) {
      validateField(name);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Only JPG and PNG formats are supported",
        }));
        setTouched((prev) => ({ ...prev, image: true }));
        setNotification({
          message: "Only JPG and PNG formats are supported",
          type: "error",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        setTouched((prev) => ({ ...prev, image: true }));
        setNotification({
          message: "Image size must be less than 5MB",
          type: "error",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string,
        }));
        setErrors((prev) => ({ ...prev, image: undefined }));
        setTouched((prev) => ({ ...prev, image: true }));
        validateField("image");
      };
      reader.readAsDataURL(file);
    } else {
      setProductForm((prev) => ({ ...prev, image: null, imagePreview: "" }));
      setTouched((prev) => ({ ...prev, image: true }));
      validateField("image");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
    setTouched((prev) => ({ ...prev, image: true }));
    validateField("image");
  };

  const handleSubmit = async () => {
    if (!selectedProduct?.id) {
      setNotification({
        message: "No product selected for update",
        type: "error",
      });

      return;
    }

    setTouched({
      product_name: true,
      product_category: true,
      product_description: true,
      available_quantity: true,
      weight_per_unit: true,
      product_price: true,
      image: true,
    });

    const isValid = validateForm();
    if (!isValid) {
      setNotification({
        message: "Please fill in all required fields correctly",
        type: "error",
      });
      return;
    }

    // Check if any changes were made
    const hasChanges =
      productForm.product_name !== (selectedProduct.product_name || "") ||
      productForm.product_category !==
        (selectedProduct.category_details?.id || null) ||
      productForm.product_description !==
        (selectedProduct.product_description || "") ||
      productForm.available_quantity !==
        (selectedProduct.available_quantity?.toString() || null) ||
      productForm.availability_status !==
        (selectedProduct.availability_status || "available") ||
      productForm.weight_per_unit !==
        (selectedProduct.weight_per_unit?.toString() || null) ||
      productForm.product_price !==
        (selectedProduct.product_price?.toString() || null) ||
      productForm.image !== null; // If a new image is selected, it's a change

    if (!hasChanges) {
      setNotification({
        message: "No changes made",
        type: "error",
      });
      // setShowModal(false);
      return;
    }

    setIsLoading(true);
    setErrors({});

    const data = new FormData();
    data.append("product_name", productForm.product_name);
    if (productForm.product_category)
      data.append("product_category", productForm.product_category);
    data.append("product_description", productForm.product_description);
    if (productForm.available_quantity)
      data.append("available_quantity", productForm.available_quantity);
    if (productForm.availability_status)
      data.append("availability_status", productForm.availability_status);
    if (productForm.weight_per_unit)
      data.append("weight_per_unit", productForm.weight_per_unit);
    if (productForm.product_price)
      data.append("product_price", productForm.product_price);
    if (productForm.image) data.append("image", productForm.image);

    try {
      await editProduct(selectedProduct.id, data);
      setNotification({
        message: "Product updated successfully",
        type: "success",
      });
      refreshProducts();
      setTimeout(() => setShowModal(false), 1000);
    } catch (error: any) {
      let errorMessage = "Failed to update product. Please try again.";
      const newErrors: { [key: string]: string } = {};

      if (error.response?.data) {
        const backendErrors = error.response.data;
        if (backendErrors.detail) {
          errorMessage = backendErrors.detail;
        } else {
          Object.keys(backendErrors).forEach((field) => {
            if (
              Array.isArray(backendErrors[field]) &&
              backendErrors[field].length > 0
            ) {
              newErrors[field] = backendErrors[field][0];
            }
          });
          if (Object.keys(newErrors).length > 0) {
            errorMessage = "Please check the form for errors";
          }
        }
      }

      setErrors(newErrors);
      setNotification({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Edit Product</h3>
        <button
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
          className="text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {errors.form && (
        <div className="mb-6 p-4 border border-red-200 rounded-md text-red-700 text-sm flex items-start">
          <AlertTriangle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>
          <div className="flex items-start space-x-5">
            <div
              onClick={triggerFileInput}
              className={`flex flex-col items-center justify-center border-2 border-dashed ${
                touched.image && errors.image
                  ? "border-red-300"
                  : touched.image && !errors.image
                  ? "border-green-300"
                  : "border-gray-300"
              } rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer p-4 w-32 h-32`}
            >
              {productForm.imagePreview ? (
                <img
                  src={
                    productForm.imagePreview.startsWith("data:")
                      ? productForm.imagePreview
                      : `http://127.0.0.1:8000/${productForm.imagePreview}`
                  }
                  alt="Product preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 text-center">
                    Click to upload
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png"
                className="hidden"
                aria-label="Upload product image"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                Upload a clear, high-quality image of your product. Recommended
                size: 1000×1000px.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: JPG, PNG
              </p>
              {productForm.imagePreview && (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="mt-3 text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Change image
                </button>
              )}
            </div>
          </div>
          {touched.image && errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        {/* Form Fields */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="product_name"
          >
            Product Name
          </label>
          <input
            id="product_name"
            name="product_name"
            type="text"
            value={productForm.product_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-sm border ${
              touched.product_name && errors.product_name
                ? "border-red-300"
                : touched.product_name && !errors.product_name
                ? "border-green-300"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 ${
              touched.product_name && errors.product_name
                ? "focus:ring-red-500"
                : "focus:ring-green-500"
            }`}
            placeholder="Enter product name"
            aria-required="true"
          />
          {touched.product_name && errors.product_name && (
            <p className="mt-1 text-sm text-red-600">{errors.product_name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="product_category"
            >
              Category
            </label>
            <select
              id="product_category"
              name="product_category"
              value={productForm.product_category || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 text-sm border ${
                touched.product_category && errors.product_category
                  ? "border-red-300"
                  : touched.product_category && !errors.product_category
                  ? "border-green-300"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 ${
                touched.product_category && errors.product_category
                  ? "focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
              aria-required="true"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            {touched.product_category && errors.product_category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.product_category}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="weight_per_unit"
            >
              Weight per Unit
            </label>
            <input
              id="weight_per_unit"
              name="weight_per_unit"
              type="text"
              value={productForm.weight_per_unit || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 text-sm border ${
                touched.weight_per_unit && errors.weight_per_unit
                  ? "border-red-300"
                  : touched.weight_per_unit && !errors.weight_per_unit
                  ? "border-green-300"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 ${
                touched.weight_per_unit && errors.weight_per_unit
                  ? "focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
              placeholder="e.g. 1"
              aria-required="true"
            />
            {touched.weight_per_unit && errors.weight_per_unit && (
              <p className="mt-1 text-sm text-red-600">
                {errors.weight_per_unit}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="available_quantity"
            >
              Available Quantity
            </label>
            <input
              id="available_quantity"
              name="available_quantity"
              type="text"
              value={productForm.available_quantity || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 text-sm border ${
                touched.available_quantity && errors.available_quantity
                  ? "border-red-300"
                  : touched.available_quantity && !errors.available_quantity
                  ? "border-green-300"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 ${
                touched.available_quantity && errors.available_quantity
                  ? "focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
              placeholder="e.g. 500"
              aria-required="true"
            />
            {touched.available_quantity && errors.available_quantity && (
              <p className="mt-1 text-sm text-red-600">
                {errors.available_quantity}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="product_price"
            >
              Price per Unit
            </label>
            <input
              id="product_price"
              name="product_price"
              type="text"
              value={productForm.product_price || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 text-sm border ${
                touched.product_price && errors.product_price
                  ? "border-red-300"
                  : touched.product_price && !errors.product_price
                  ? "border-green-300"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 ${
                touched.product_price && errors.product_price
                  ? "focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
              placeholder="e.g. 800.00"
              aria-required="true"
            />
            {touched.product_price && errors.product_price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.product_price}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="availability_status"
          >
            Status
          </label>
          <select
            id="availability_status"
            name="availability_status"
            value={productForm.availability_status}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-sm border ${
              touched.availability_status && errors.availability_status
                ? "border-red-300"
                : touched.availability_status && !errors.availability_status
                ? "border-green-300"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 ${
              touched.availability_status && errors.availability_status
                ? "focus:ring-red-500"
                : "focus:ring-green-500"
            }`}
            aria-required="true"
          >
            <option value="available">Available</option>
            <option value="low">Low in Stock</option>
            <option value="out">Out of Stock</option>
          </select>
          {touched.availability_status && errors.availability_status && (
            <p className="mt-1 text-sm text-red-600">
              {errors.availability_status}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="product_description"
          >
            Description
          </label>
          <textarea
            id="product_description"
            name="product_description"
            value={productForm.product_description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-sm border ${
              touched.product_description && errors.product_description
                ? "border-red-300"
                : touched.product_description && !errors.product_description
                ? "border-green-300"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 ${
              touched.product_description && errors.product_description
                ? "focus:ring-red-500"
                : "focus:ring-green-500"
            }`}
            rows={3}
            placeholder="Enter product description"
            aria-required="true"
          />
          {touched.product_description && errors.product_description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.product_description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
          aria-label="Cancel editing product"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={`px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-all flex items-center justify-center ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          aria-label="Save product changes"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          duration={3000}
        />
      )}
    </div>
  );
}
