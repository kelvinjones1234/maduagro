import { PlusCircle, Upload, X } from "lucide-react";
import { useState } from "react";

export default function MakeOffer() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    timeframe: "",
    location: "",
    price: "",
    description: "",
    contactMethod: "",
    contactDetails: "",
    attachments: [] as File[],
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
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting request:", formData);
    // TODO: Send to API
  };

  return (
    <div className="bg-white shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Post Commodity Request
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Let sellers know what you're looking for. Verified sellers will be able
        to respond with their best offers.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="tablet-lg:grid grid-cols-1 tablet-lg:grid-cols-2 gap-6">
          {/* Request Title */}
          <div className="col-span-2 mb-4 tablet-lg:mb-0">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 tablet-lg:mb-1 "
            >
              Request Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Seeking 10 Tons of High-Quality Maize"
            />
          </div>

          {/* Category */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category*
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Category</option>
              <option value="grains">Grains</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="tubers">Tubers</option>
              <option value="cashCrops">Cash Crops</option>
              <option value="livestock">Livestock</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity Required*
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. 10 tons, 500 kg, 1000 units"
            />
          </div>

          {/* Timeframe */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="timeframe"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delivery Timeframe*
            </label>
            <input
              type="text"
              id="timeframe"
              name="timeframe"
              required
              value={formData.timeframe}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Within 2 weeks, By June 30"
            />
          </div>

          {/* Delivery Location */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delivery Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Lagos, Nigeria"
            />
          </div>

          {/* Budget/Price Range */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Budget / Price Range
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. ₦40,000-45,000 per ton"
            />
          </div>

          {/* Description */}
          <div className="col-span-2 mb-4 tablet-lg:mb-0">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Detailed Requirements*
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Describe quality specifications, certifications needed, moisture content, packaging requirements, etc."
            />
          </div>

          {/* Contact Method */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="contactMethod"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Contact Method*
            </label>
            <select
              id="contactMethod"
              name="contactMethod"
              required
              value={formData.contactMethod}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Contact Method</option>
              <option value="platform">Platform Messages</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          {/* Contact Details */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="contactDetails"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Details
            </label>
            <input
              type="text"
              id="contactDetails"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Email address or phone number"
            />
          </div>

          {/* File Attachments */}
          <div className="col-span-2 mb-4 tablet-lg:mb-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-300" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF, DOCX up to 10MB each
                </p>
              </div>
            </div>

            {/* Attached Files List */}
            {formData.attachments.length > 0 && (
              <ul className="mt-4 space-y-2">
                {formData.attachments.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md text-sm"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mt-4">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              Request Visibility
            </legend>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="visibility-public"
                  name="visibility"
                  type="radio"
                  defaultChecked
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <label
                  htmlFor="visibility-public"
                  className="ml-3 text-sm text-gray-700"
                >
                  Public - All verified sellers can see and respond
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="visibility-private"
                  name="visibility"
                  type="radio"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <label
                  htmlFor="visibility-private"
                  className="ml-3 text-sm text-gray-700"
                >
                  Private - Only selected sellers can see and respond
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Post Commodity Request
          </button>
        </div>
      </form>
    </div>
  );
}
