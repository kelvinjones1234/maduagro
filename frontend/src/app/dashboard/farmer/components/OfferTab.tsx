"use client";

import { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  MapPin,
  Tag,
  ShoppingBag,
  Upload,
  ChevronDown,
  X,
  Edit2,
  Save,
  XCircle,
} from "lucide-react";

export default function OfferTab() {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    priceRange: "",
    availability: "",
  });
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Premium Quality Maize",
      location: "Kaduna, Nigeria",
      price: "₦45,000/ton",
      quantity: "50 tons available",
      seller: "AgriCorp Nigeria",
      verified: true,
      imageUrl: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Organic Cassava",
      location: "Oyo, Nigeria",
      price: "₦35,000/ton",
      quantity: "20 tons available",
      seller: "Green Farms Ltd",
      verified: true,
      imageUrl: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Fresh Tomatoes",
      location: "Kano, Nigeria",
      price: "₦7,500/crate",
      quantity: "200 crates available",
      seller: "Northern Produce",
      verified: false,
      imageUrl: "/images/test2.jpg",
    },
  ]);
  const [editingListingId, setEditingListingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Mock data for demonstration
  const availableCategories = [
    "Grains",
    "Fruits",
    "Vegetables",
    "Tubers",
    "Cash Crops",
    "Livestock",
  ];

  const handleEditClick = (listing) => {
    setEditingListingId(listing.id);
    setEditFormData({ ...listing });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (id) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === id ? { ...listing, ...editFormData } : listing
      )
    );
    setEditingListingId(null);
    setEditFormData({});
    // TODO: Send updated data to API
  };

  const handleCancelEdit = () => {
    setEditingListingId(null);
    setEditFormData({});
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Commodity Sourcing
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Find, purchase, or request agricultural commodities from verified
              sellers across all regions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === "browse"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Commodities
            </button>
            <button
              onClick={() => setActiveTab("request")}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === "request"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Request
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === "sell"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Offer
            </button>
          </div>
        </div>

        {activeTab === "browse" ? (
          <>
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search commodities..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm outline-0 focus:ring-green-500 focus:border-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div className="w-full md:w-48">
                  <div className="relative">
                    <select
                      className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                      value={filters.category}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                    >
                      <option value="">All Categories</option>
                      {availableCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Location Filter */}
                <div className="w-full md:w-48">
                  <div className="relative">
                    <select
                      className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                    >
                      <option value="">All Locations</option>
                      <option value="north">Northern Region</option>
                      <option value="south">Southern Region</option>
                      <option value="east">Eastern Region</option>
                      <option value="west">Western Region</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Advanced Filters Button */}
                <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Commodity Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    {listing.verified && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Verified Seller
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    {editingListingId === listing.id ? (
                      <>
                        <input
                          type="text"
                          name="title"
                          value={editFormData.title}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border border-gray-200 rounded-md text-lg font-semibold text-gray-900 mb-2"
                        />
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          <input
                            type="text"
                            name="location"
                            value={editFormData.location}
                            onChange={handleEditChange}
                            className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm"
                          />
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Tag className="h-4 w-4 mr-1 text-gray-400" />
                          <input
                            type="text"
                            name="price"
                            value={editFormData.price}
                            onChange={handleEditChange}
                            className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm"
                          />
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <ShoppingBag className="h-4 w-4 mr-1 text-gray-400" />
                          <input
                            type="text"
                            name="quantity"
                            value={editFormData.quantity}
                            onChange={handleEditChange}
                            className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm"
                          />
                        </div>
                        <div className="mt-2 text-sm text-gray-500 flex items-center">
                          <span className="mr-2">Seller:</span>
                          <input
                            type="text"
                            name="seller"
                            value={editFormData.seller}
                            onChange={handleEditChange}
                            className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <button
                            onClick={() => handleSave(listing.id)}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 flex items-center"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1.5 bg-white border border-red-600 text-red-600 text-sm font-medium rounded-md hover:bg-red-50 flex items-center"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {listing.title}
                          </h3>
                          <button
                            onClick={() => handleEditClick(listing)}
                            className="text-gray-500 hover:text-green-600"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {listing.location}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Tag className="h-4 w-4 mr-1 text-gray-400" />
                          {listing.price}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <ShoppingBag className="h-4 w-4 mr-1 text-gray-400" />
                          {listing.quantity}
                        </div>
                        {/* <div className="mt-2 text-sm text-gray-500">
                          Seller: {listing.seller}
                        </div> */}
                        <div className="mt-4 flex justify-between">
                          <button className="px-3 py-1.5 bg-white border border-green-600 text-green-600 text-sm font-medium rounded-md hover:bg-green-50">
                            Request Sample
                          </button>
                          <button className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                            Purchase
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : activeTab === "request" ? (
          <RequestCommodityForm />
        ) : (
          <SellCommodityForm />
        )}
      </div>
    </div>
  );
}

function RequestCommodityForm() {
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
    <div className="bg-white rounded-lg shadow-sm p-6">
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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

function SellCommodityForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    price: "",
    location: "",
    availability: "",
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
    console.log("Submitting sale offer:", formData);
    // TODO: Send to API
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Post Commodity for Sale
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        List your agricultural commodities for buyers to discover. Provide
        detailed information to attract potential customers.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="tablet-lg:grid grid-cols-1 tablet-lg:grid-cols-2 gap-6">
          {/* Commodity Title */}
          <div className="col-span-2 mb-4 tablet-lg:mb-0">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Commodity Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 outline-0 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Premium Quality Maize for Sale"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              Available Quantity*
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. 50 tons, 1000 kg, 500 crates"
            />
          </div>

          {/* Price */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price*
            </label>
            <input
              type="text"
              id="price"
              name="price"
              required
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. ₦45,000 per ton"
            />
          </div>

          {/* Location */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Kaduna, Nigeria"
            />
          </div>

          {/* Availability */}
          <div className="mb-4 tablet-lg:mb-0">
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Availability Period*
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
              required
              value={formData.availability}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Available until July 30"
            />
          </div>

          {/* Description */}
          <div className="col-span-2 mb-4 tablet-lg:mb-0">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Detailed Description*
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Describe quality specifications, certifications, moisture content, packaging details, etc."
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
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

        {/* Visibility Settings */}
        <div className="mt-4">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              Listing Visibility
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
                  Public - All verified buyers can see and respond
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
                  Private - Only selected buyers can see and respond
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
            Post Commodity for Sale
          </button>
        </div>
      </form>
    </div>
  );
}
