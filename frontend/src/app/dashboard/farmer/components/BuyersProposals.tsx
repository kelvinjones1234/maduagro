import { useState, useMemo, useEffect } from "react";

export default function BuyersProposals() {
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

  return (
    <div className="bg-white shadow p-4 laptop-lg:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Farmer Product Listings
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Browse all products uploaded by farmers. Stay updated and make informed
        decisions with real-time listing details.
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
                    {/* <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        offer.status
                      )}`}
                    >
                      {offer.status}
                    </span> */}
                    <span className="text-sm text-gray-500">
                      Created: {formatDate(offer.createdAt.split(" ")[0])}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="group relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
                      disabled={!!confirmDelete}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 transition-transform group-hover:rotate-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                        <span className="group-hover:text-white/90 transition-colors">
                          Contact Buyer
                        </span>
                      </div>
                      <span className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-10 rounded-md transition-opacity"></span>
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
                                d="M7 3h10v4H7V3zm0 14h10v4H7v-4zm10-7H7v4h10v-4zM5 7h14v10H5V7z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 3v18m6-18v18"
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
