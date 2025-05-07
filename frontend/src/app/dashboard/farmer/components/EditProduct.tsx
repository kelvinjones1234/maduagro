import { X, Upload } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";
import { useState, useEffect, useRef } from "react";
import { ProductType } from "../../types";

type ProductForm = Omit<
  ProductType,
  "id" | "color" | "views" | "rating" | "warning"
>;

export default function EditProduct() {
  const { selectedProduct, setShowModal } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [productForm, setProductForm] = useState<ProductForm>({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    status: "available",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setProductForm({
        name: selectedProduct.name || "",
        category: selectedProduct.category || "",
        quantity: selectedProduct.quantity,
        price: selectedProduct.price,
        description: selectedProduct.description || "",
        status: selectedProduct.status || "available",
        image: null,
        imagePreview: selectedProduct.imagePreview || undefined,
      });
    }
  }, [selectedProduct]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm((prev) => ({
          ...prev,
          image: image,
          imagePreview: imagePreview,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    // Assuming you have a function to handle the submission
    // Example: updateProduct(selectedProduct?.id, productForm);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">Edit Product</h3>
        <button
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-6">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>
          <div className="flex items-start space-x-5">
            <div
              onClick={triggerFileInput}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer p-4 w-32 h-32"
            >
              {productForm.imagePreview ? (
                <img
                  src={productForm.imagePreview}
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
                accept="image/*"
                className="hidden"
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
        </div>

        {/* Form Fields - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              type="text"
              name="name"
              value={productForm.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <input
              type="text"
              name="category"
              value={productForm.category}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., Vegetables, Fruits, Dairy"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity*
            </label>
            <input
              type="number"
              name="quantity"
              value={productForm.quantity}
              onChange={handleChange}
              min="0"
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Unit* ($)
            </label>
            <input
              type="number"
              name="price"
              value={productForm.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status*
            </label>
            <select
              name="status"
              value={productForm.status}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="available">Available</option>
              <option value="low">Low in Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Description - Full width */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={productForm.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            placeholder="Provide details about your product such as freshness, quality, and origin"
          ></textarea>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center gap-4 border-t border-gray-200 px-6 py-4 bg-gray-50">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
