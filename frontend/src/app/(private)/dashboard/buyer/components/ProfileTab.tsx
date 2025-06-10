import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Edit,
  Save,
  X,
} from "lucide-react";
import StatsOverview from "./StatsOverview";

type BuyerProfileData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  buyerInfo: {
    preferredProducts: string[];
    businessName: string;
    buyerType: string;
  };
};

export default function BuyerProfileInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<BuyerProfileData>({
    personalInfo: {
      fullName: "Jane Okeke",
      email: "janeokeke@example.com",
      phone: "+234 812 345 6789",
      location: "Lagos, Nigeria",
    },
    buyerInfo: {
      preferredProducts: ["Tomatoes", "Peppers", "Onions"],
      businessName: "Okeke Fresh Market",
      buyerType: "Retailer",
    },
  });

  const [editedData, setEditedData] = useState<BuyerProfileData>({
    ...profileData,
  });

  const handleInputChange = (
    section: keyof BuyerProfileData,
    field: string,
    value: any
  ) => {
    setEditedData({
      ...editedData,
      [section]: {
        ...editedData[section],
        [field]: value,
      },
    });
  };

  const handleProductsChange = (value: string) => {
    const productsArray = value.split(",").map((item: string) => item.trim());
    setEditedData({
      ...editedData,
      buyerInfo: {
        ...editedData.buyerInfo,
        preferredProducts: productsArray,
      },
    });
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({ ...profileData });
    setIsEditing(false);
  };
 
  return (
    <>
      <StatsOverview />
      <div className="bg-white rounded-lg shadow-sm">
        {/* Profile Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Buyer/Organisation Profile Information
            </h2>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              <Edit className="h-4 w-4 mr-1.5" />
              Edit
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
              >
                <X className="h-4 w-4 mr-1.5" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-1.5" />
                Save
              </button>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 tablet-sm:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Personal Information
              </h3>

              <div className="space-y-5">
                <div>
                  <label className=" text-xs text-gray-500 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.fullName}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "fullName",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-800">
                      {profileData.personalInfo.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className=" text-xs text-gray-500 mb-1 flex items-center">
                    <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.personalInfo.email}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "email",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-800">
                      {profileData.personalInfo.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className=" text-xs text-gray-500 mb-1 flex items-center">
                    <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.personalInfo.phone}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "phone",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-800">
                      {profileData.personalInfo.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className=" text-xs text-gray-500 mb-1 flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.personalInfo.location}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "location",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-800">
                      {profileData.personalInfo.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Buyer Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Buyer Information
              </h3>

              <div className="space-y-5">
                <div>
                  <label className=" text-xs text-gray-500 mb-1 flex items-center">
                    <ShoppingBag className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    Business Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.buyerInfo.businessName}
                      onChange={(e) =>
                        handleInputChange(
                          "buyerInfo",
                          "businessName",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-800">
                      {profileData.buyerInfo.businessName}
                    </p>
                  )}
                </div>

                <div>
                  <label className=" text-xs text-gray-500 mb-1 flex items-center">
                    <ShoppingBag className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    Preferred Products
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.buyerInfo.preferredProducts.join(", ")}
                      onChange={(e) => handleProductsChange(e.target.value)}
                      placeholder="Enter products separated by commas"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.buyerInfo.preferredProducts.map(
                        (product, index) => (
                          <span
                            key={index}
                            className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded"
                          >
                            {product}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className=" text-xs text-gray-500 mb-1 flex items-center">
                    <ShoppingBag className="h-3.5 w-3.5 mr середина текста.5 text-gray-400" />
                    Buyer Type
                  </label>
                  {isEditing ? (
                    <select
                      value={editedData.buyerInfo.buyerType}
                      onChange={(e) =>
                        handleInputChange(
                          "buyerInfo",
                          "buyerType",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                    >
                      <option value="Retailer">Retailer</option>
                      <option value="Wholesaler">Wholesaler</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Restaurant">Restaurant</option>
                    </select>
                  ) : (
                    <p className="text-sm font-medium text-gray-800">
                      {profileData.buyerInfo.buyerType}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
