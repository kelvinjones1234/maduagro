import { Mail, Phone, Plus, Trash2, ArrowLeft, Save } from "lucide-react";

const ContactInformation = ({
  formData,
  savedContacts,
  handleInputChange,
  selectSavedContact,
  setFormData,
  errors,
  setErrors, // Add this prop
  onDeleteContact,
  onSaveContact, // New prop to handle saving contact
}) => {
  const handleBackToSaved = () => {
    setFormData((prev) => ({
      ...prev,
      useNewContact: false,
      email: "",
      phone: "",
    }));
  };

  const handleSaveContact = () => {
    // Validate form before saving
    if (!formData.email || !formData.phone) {
      setErrors({
        email: !formData.email ? "Email is required" : "",
        phone: !formData.phone ? "Phone number is required" : "",
      });
      return;
    }

    // Call the save handler from parent
    onSaveContact({
      email: formData.email,
      phone: formData.phone,
    });

    // Reset form and go back to saved contacts
    handleBackToSaved();
  };

  return (
    <div className="bg-white rounded-lg px-3 py-4 mobile-lg:px-4 tablet-sm:px-5 tablet-lg:px-6 shadow-sm">
      <div className="flex items-center gap-2 mobile-lg:gap-3 mb-4 tablet-lg:mb-6">
        <div className="w-7 h-7 mobile-lg:w-8 mobile-lg:h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <Mail
            size={14}
            className="mobile-lg:w-4 mobile-lg:h-4 text-amber-600"
          />
        </div>
        <h3 className="text-base mobile-lg:text-lg font-semibold text-gray-900">
          Contact Information
        </h3>
      </div>

      {/* Saved Contacts */}
      {savedContacts.length > 0 && !formData.useNewContact && (
        <div className="mb-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Saved Contacts</h4>
          {savedContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-2 mobile-lg:p-3 border rounded-lg cursor-pointer transition-all ${
                formData.selectedContact === contact.id
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => selectSavedContact(contact)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {contact.email}
                  </p>
                  <p className="text-gray-600 text-sm">{contact.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  {contact.isDefault && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteContact(contact.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                useNewContact: true,
                email: "",
                phone: "",
                selectedContact: "", // Clear selection when adding new
              }))
            }
            className="flex items-center gap-1 mobile-lg:gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            <Plus size={14} className="mobile-lg:w-4 mobile-lg:h-4" />
            Add new contact info
          </button>
        </div>
      )}

      {/* New Contact Form */}
      {(formData.useNewContact || !savedContacts.length) && (
        <div>
          {savedContacts.length > 0 && (
            <div className="flex justify-between mb-4">
              <button
                onClick={handleBackToSaved}
                className="flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                <ArrowLeft size={14} className="mobile-lg:w-4 mobile-lg:h-4" />
                Back to saved contacts
              </button>
              <button
                onClick={handleSaveContact}
                className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1.5 rounded-md hover:bg-amber-600 text-sm font-medium"
              >
                <Save size={14} className="mobile-lg:w-4 mobile-lg:h-4" />
                Save Contact
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 tablet-sm:grid-cols-2 gap-3 mobile-lg:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                placeholder="john@example.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                placeholder="+234 800 000 0000"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
          {!savedContacts.length && (
            <button
              onClick={handleSaveContact}
              className="mt-4 flex items-center gap-1 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 text-sm font-medium"
            >
              <Save size={16} className="mobile-lg:w-4 mobile-lg:h-4" />
              Save Contact
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactInformation;
