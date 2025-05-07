import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Calendar,
  Crop,
  ShoppingBag,
  Edit,
  Save,
  X,
} from "lucide-react";

type ProfileData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  farmInfo: {
    farmName: string;
    farmSize: string;
    mainProducts: string[];
    established: string;
  };
};

export default function ProfileInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      fullName: "John Audu",
      email: "johnaudu@example.com",
      phone: "+234 801 234 5678",
      location: "Kaduna, Nigeria",
    },
    farmInfo: {
      farmName: "Audu's Organic Farm",
      farmSize: "12 Hectares",
      mainProducts: ["Tomatoes", "Maize", "Peppers", "Yams"],
      established: "2022",
    },
  });

  const [editedData, setEditedData] = useState<ProfileData>({ ...profileData });

  const handleInputChange = (
    section: keyof ProfileData,
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

  const handleProductsChange = (value: any) => {
    const productsArray = value.split(",").map((item: string) => item.trim());
    setEditedData({
      ...editedData,
      farmInfo: {
        ...editedData.farmInfo,
        mainProducts: productsArray,
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
    <div className="bg-white rounded-lg shadow-sm">
      {/* Profile Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Information
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
                <label className="block text-xs text-gray-500 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.personalInfo.fullName}
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
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.personalInfo.email}
                    onChange={(e) =>
                      handleInputChange("personalInfo", "email", e.target.value)
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
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.personalInfo.phone}
                    onChange={(e) =>
                      handleInputChange("personalInfo", "phone", e.target.value)
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
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
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

          {/* Farm Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Farm Information
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <Home className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  Farm Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.farmInfo.farmName}
                    onChange={(e) =>
                      handleInputChange("farmInfo", "farmName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">
                    {profileData.farmInfo.farmName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <Crop className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  Farm Size
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.farmInfo.farmSize}
                    onChange={(e) =>
                      handleInputChange("farmInfo", "farmSize", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">
                    {profileData.farmInfo.farmSize}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <ShoppingBag className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  Main Products
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.farmInfo.mainProducts.join(", ")}
                    onChange={(e) => handleProductsChange(e.target.value)}
                    placeholder="Enter products separated by commas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profileData.farmInfo.mainProducts.map((product, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  Established
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.farmInfo.established}
                    onChange={(e) =>
                      handleInputChange(
                        "farmInfo",
                        "established",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">
                    {profileData.farmInfo.established}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
