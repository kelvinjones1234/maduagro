import { X, Upload } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";
import { useState } from "react";

// Add New Product Modal Component
export default function AddNewProduct() {
  const { setShowModal } = useDashboard();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    image: null as File | null, // Update the type here
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, image: e.target.files?.[0] || null }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Add New Product</h3>
        <button
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            placeholder="Enter product name"
            aria-required="true"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            aria-required="true"
          >
            <option value="">Select a category</option>
            <option value="Fresh Produce">Fresh Produce</option>
            <option value="Grain">Grain</option>
            <option value="Tuber">Tuber</option>
            <option value="Fruit">Fruit</option>
            <option value="Livestock">Livestock</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="text"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="e.g. 500 kg"
              aria-required="true"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="price"
            >
              Price per Unit
            </label>
            <input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="e.g. ₦800/kg"
              aria-required="true"
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            rows={3}
            placeholder="Enter product description"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="image"
          >
            Product Image
          </label>
          <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <Upload
                className="mx-auto h-10 w-10 text-gray-400"
                aria-hidden="true"
              />
              <div className="mt-2 flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-700 transition-colors"
                >
                  <span>Upload a file</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                    accept="image/png,image/jpeg,image/gif"
                    aria-label="Upload product image"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div> 
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
          aria-label="Cancel adding product"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-all"
          aria-label="Add product"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
