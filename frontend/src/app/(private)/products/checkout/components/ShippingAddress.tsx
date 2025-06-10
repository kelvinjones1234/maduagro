import { MapPin, Plus, Edit3, Trash2, Check, ArrowLeft } from "lucide-react";

const ShippingAddress = ({
  formData,
  savedAddresses,
  handleInputChange,
  selectSavedAddress,
  setFormData,
  nigerianStates,
  errors,
}) => {
  return (
    <div className="bg-white rounded-lg px-3 py-4 mobile-lg:px-4 tablet-sm:px-5 tablet-lg:px-6 shadow-sm">
      <div className="flex items-center gap-2 mobile-lg:gap-3 mb-4 tablet-lg:mb-6">
        <div className="w-7 h-7 mobile-lg:w-8 mobile-lg:h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <MapPin
            size={14}
            className="mobile-lg:w-4 mobile-lg:h-4 text-amber-600"
          />
        </div>
        <h3 className="text-base mobile-lg:text-lg font-semibold text-gray-900">
          Shipping Address
        </h3>
      </div>

      {/* Saved Addresses */}
      {savedAddresses.length > 0 && !formData.useNewAddress && (
        <div className="mb-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Saved Addresses</h4>
          {savedAddresses.map((address) => (
            <div
              key={address.id}
              className={`p-2 mobile-lg:p-3 border rounded-lg cursor-pointer transition-all ${
                formData.selectedAddress === address.id
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => selectSavedAddress(address)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-gray-900 text-sm">
                      {address.label}
                    </span>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-gray-600 text-sm break-words">
                    {address.address}
                    {address.apartment && `, ${address.apartment}`}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                </div>
                <div className="flex gap-1 ml-2 flex-shrink-0">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit3
                      size={12}
                      className="mobile-lg:w-3.5 mobile-lg:h-3.5"
                    />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-500">
                    <Trash2
                      size={12}
                      className="mobile-lg:w-3.5 mobile-lg:h-3.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                useNewAddress: true,
              }))
            }
            className="flex items-center gap-1 mobile-lg:gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            <Plus size={14} className="mobile-lg:w-4 mobile-lg:h-4" />
            Ship to different address
          </button>
        </div>
      )}

      {/* New Address Form */}
      {(formData.useNewAddress || !savedAddresses.length) && (
        <div className="space-y-3 mobile-lg:space-y-4">
          {/* Back Button - Only show if there are saved addresses */}
          {savedAddresses.length > 0 && (
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 ">
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    useNewAddress: false,
                  }))
                }
                className="flex items-center gap-1 mobile-lg:gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
              >
                <ArrowLeft size={14} className="mobile-lg:w-4 mobile-lg:h-4 " />
                Back to saved addresses
              </button>
              <span className="text-sm text-gray-500">Add New Address</span>
            </div>
          )}

          <div className="grid grid-cols-1 tablet-sm:grid-cols-2 gap-3 mobile-lg:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
              placeholder="123 Main Street"
              required
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
              Apartment, suite, etc. (optional)
            </label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
              placeholder="Apt 4B, Suite 200"
            />
          </div>

          <div className="grid grid-cols-1 mobile-lg:grid-cols-2 laptop-sm:grid-cols-3 gap-3 mobile-lg:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                required
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                required
              >
                <option value="">Select State</option>
                {nigerianStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>
            <div className="mobile-lg:col-span-2 laptop-sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                placeholder="100001"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
              className="text-amber-500 focus:ring-amber-500 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Save this address for future orders
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
