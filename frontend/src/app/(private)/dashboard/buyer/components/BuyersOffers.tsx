import { useState, useMemo, useEffect } from "react";

export default function BuyersOffers() {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Premium Quality Maize",
      category: "Grains",
      deliveryTime: "2025-06-15",
      deliveryLocation: "Kaduna, Nigeria",
      budget: "₦40,000 - ₦45,000 per ton",
      description:
        "High-quality maize with low moisture content, suitable for industrial use.",
      image: "https://via.placeholder.com/150",
      contactDetail: "buyer@example.com",
      createdAt: "2025-05-01 14:30",
      status: "Active",
    },
    {
      id: 2,
      title: "Organic Tomatoes",
      category: "Vegetables",
      deliveryTime: "2025-07-01",
      deliveryLocation: "Lagos, Nigeria",
      budget: "₦20,000 - ₦25,000 per crate",
      description:
        "Fresh organic tomatoes, pesticide-free, packed in 10kg crates.",
      image: null,
      contactDetail: "+234 800 123 4567",
      createdAt: "2025-05-03 09:15",
      status: "Active",
    },
    {
      id: 3,
      title: "Premium Cashew Nuts",
      category: "Cash Crops",
      deliveryTime: "2025-08-15",
      deliveryLocation: "Ibadan, Nigeria",
      budget: "₦350,000 - ₦400,000 per ton",
      description:
        "High-quality cashew nuts, properly dried and sorted for export.",
      image: null,
      contactDetail: "crops@example.com",
      createdAt: "2025-05-05 11:20",
      status: "Active",
    },
    {
      id: 4,
      title: "Yellow Yam Tubers",
      category: "Tubers",
      deliveryTime: "2025-06-30",
      deliveryLocation: "Enugu, Nigeria",
      budget: "₦15,000 - ₦20,000 per 100kg",
      description: "Fresh yellow yam tubers, uniform size, pest-free.",
      image: null,
      contactDetail: "+234 800 987 6543",
      createdAt: "2025-05-02 16:45",
      status: "Pending",
    },
    {
      id: 5,
      title: "Cattle for Meat Processing",
      category: "Livestock",
      deliveryTime: "2025-07-10",
      deliveryLocation: "Kano, Nigeria",
      budget: "₦250,000 - ₦300,000 per head",
      description:
        "Healthy cattle for meat processing, 300-400kg weight range.",
      image: null,
      contactDetail: "livestock@example.com",
      createdAt: "2025-05-04 08:30",
      status: "Active",
    },
    {
      id: 6,
      title: "Organic Mango Harvest",
      category: "Fruits",
      deliveryTime: "2025-06-20",
      deliveryLocation: "Oyo, Nigeria",
      budget: "₦25,000 - ₦30,000 per crate",
      description: "Organically grown mangoes, variety mix, uniform ripeness.",
      image: null,
      contactDetail: "+234 800 555 1234",
      createdAt: "2025-05-06 13:10",
      status: "Pending",
    },
  ]);

  const [editingOffer, setEditingOffer] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const categories = [
    "All",
    "Grains",
    "Fruits",
    "Vegetables",
    "Tubers",
    "Cash Crops",
    "Livestock",
  ];

  const statuses = ["All", "Active", "Pending", "Expired"];

  // Filter offers based on search term, category, status, and date range
  const filteredOffers = useMemo(() => {
    return offers
      .filter((offer) => {
        const matchesSearch =
          offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.deliveryLocation
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "All" || offer.category === selectedCategory;

        const matchesStatus =
          selectedStatus === "All" || offer.status === selectedStatus;

        const offerDate = new Date(offer.createdAt);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        const matchesDate =
          (!startDate || offerDate >= startDate) &&
          (!endDate || offerDate <= endDate);

        return matchesSearch && matchesCategory && matchesStatus && matchesDate;
      })
      .sort((a, b) => {
        if (sortConfig !== null) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
  }, [
    offers,
    searchTerm,
    selectedCategory,
    selectedStatus,
    dateRange,
    sortConfig,
  ]);

  // Get current offers for pagination
  const indexOfLastOffer = currentPage * itemsPerPage;
  const indexOfFirstOffer = indexOfLastOffer - itemsPerPage;
  const currentOffers = filteredOffers.slice(
    indexOfFirstOffer,
    indexOfLastOffer
  );
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, dateRange, itemsPerPage]);

  const handleEdit = (offer) => {
    setEditingOffer({ ...offer });
    setConfirmDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOffer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (id) => {
    setOffers((prev) =>
      prev.map((offer) => (offer.id === id ? editingOffer : offer))
    );
    setEditingOffer(null);
  };

  const handleCancel = () => {
    setEditingOffer(null);
  };

  const handleDeleteConfirm = (id) => {
    setConfirmDelete(id);
    setEditingOffer(null);
  };

  const handleDelete = (id) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== id));
    setConfirmDelete(null);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setDateRange({ start: "", end: "" });
    setSortConfig({ key: "createdAt", direction: "desc" });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow p-4 laptop-lg:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Your Purchase Requests
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        View and manage all your commodity purchase requests. Edit details in
        real-time to keep your offers up to date.
      </p>

      {/* Advanced Filter Panel */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Filters</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 tablet-lg:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div className="relative col-span-2">
            <input
              type="text"
              placeholder="Search by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500 pl-10"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Range and Per Page Controls */}
        <div className="mt-4 grid grid-cols-1 tablet-lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              From Date
            </label>
            <input
              type="date"
              id="startDate"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              To Date
            </label>
            <input
              type="date"
              id="endDate"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="sortBy"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={(e) => {
                const [key, direction] = e.target.value.split("-");
                setSortConfig({ key, direction });
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="deliveryTime-asc">Delivery Date (Earliest)</option>
              <option value="deliveryTime-desc">Delivery Date (Latest)</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="perPage"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Items Per Page
            </label>
            <select
              id="perPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value={3}>3 per page</option>
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredOffers.length === 0 ? "0" : indexOfFirstOffer + 1} to{" "}
          {Math.min(indexOfLastOffer, filteredOffers.length)} of{" "}
          {filteredOffers.length} requests
        </p>
      </div>

      {filteredOffers.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-gray-50">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No offers found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ||
            selectedCategory !== "All" ||
            selectedStatus !== "All" ||
            dateRange.start ||
            dateRange.end
              ? "No offers match your current filters. Try adjusting or clearing your filters."
              : "You don't have any buyer offers yet."}
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Create Your First Offer
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {currentOffers.map((offer) => (
            <div
              key={offer.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="divide-y divide-gray-200">
                {/* Header with quick actions */}
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        offer.status
                      )}`}
                    >
                      {offer.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Created: {formatDate(offer.createdAt.split(" ")[0])}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(offer)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      disabled={!!confirmDelete}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(offer.id)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={!!confirmDelete && confirmDelete !== offer.id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>

                {/* Main content */}
                <div className="p-4">
                  <div className="flex flex-col tablet-lg:flex-row tablet-lg:items-start gap-6">
                    <div className="tablet-lg:w-24 h-24 flex-shrink-0">
                      {offer.image ? (
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {offer.title}
                      </h3>
                      <div className="grid grid-cols-1 tablet-lg:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                            {offer.category}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Due: {formatDate(offer.deliveryTime)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {offer.deliveryLocation}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {offer.budget}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                              />
                            </svg>
                            {offer.contactDetail}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Confirmation */}
              {confirmDelete === offer.id && (
                <div className="p-4 bg-red-50 border-t border-red-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-red-800">
                        Confirm Deletion
                      </h4>
                      <p className="text-sm text-red-700 mb-4">
                        Are you sure you want to delete this offer? This action
                        cannot be undone.
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={cancelDelete}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Yes, Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Form */}
              {editingOffer && editingOffer.id === offer.id && (
                <div className="mt-4 border-t border-gray-200 pt-4 p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-800 mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit Offer Details
                  </h4>
                  <div className="tablet-sm:grid gap-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Request Title*
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={editingOffer.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Category*
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={editingOffer.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select Category</option>
                        {categories
                          .filter((c) => c !== "All")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="deliveryTime"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Delivery Time*
                      </label>
                      <input
                        type="date"
                        id="deliveryTime"
                        name="deliveryTime"
                        required
                        value={editingOffer.deliveryTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="deliveryLocation"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Delivery Location*
                      </label>
                      <input
                        type="text"
                        id="deliveryLocation"
                        name="deliveryLocation"
                        required
                        value={editingOffer.deliveryLocation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. Kaduna, Nigeria"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Budget/Price Range*
                      </label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        required
                        value={editingOffer.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. ₦40,000 - ₦45,000 per ton"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contactDetail"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Contact Detail*
                      </label>
                      <input
                        type="text"
                        id="contactDetail"
                        name="contactDetail"
                        required
                        value={editingOffer.contactDetail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. Email or phone number"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Status*
                      </label>
                      <select
                        id="status"
                        name="status"
                        required
                        value={editingOffer.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
                      >
                        {statuses
                          .filter((s) => s !== "All")
                          .map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Detailed Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        value={editingOffer.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md outline-0 text-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="Describe quality requirements, certifications, etc."
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(offer.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredOffers.length > 0 && (
        <div className="mt-6 flex items-center justify-center">
          <div className="tablet-lg:flex-1 tablet-lg:flex tablet-lg:items-center tablet-lg:justify-between">
            <div>
              <p className="text-sm text-gray-700 text-center">
                Showing{" "}
                <span className="font-medium">{indexOfFirstOffer + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastOffer, filteredOffers.length)}
                </span>{" "}
                of <span className="font-medium">{filteredOffers.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">First Page</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-green-50 border-green-500 text-green-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Last Page</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414zm6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
