

"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import CheckoutSteps from "./components/CheckoutSteps";
import ContactInformation from "./components/ContactInformation";
import ShippingAddress from "./components/ShippingAddress";
import DeliveryOptions from "./components/DeliveryOptions";
import { useCart } from "@/app/(public)/context/CartContext";
import OrderSummary from "./components/OrderSummary";
import { useRouter } from "next/navigation";
import BankTransferModal from "./components/TransferModal";
import WalletPaymentModal from "./components/WalletPaymentModal";
import { ArrowLeft, User, Truck, CreditCard, Shield } from "lucide-react";
import PaymentOptions from "./components/PaymentOptions";
import CardPayment from "./components/CardPaymentModal";

const CheckoutPage = () => {
  // Constants
  const STORAGE_KEY = "checkout_progress";
  const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Mock saved details - using state to allow modifications
  const [savedAddresses] = useState([
    {
      id: "addr1",
      label: "Home",
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street",
      apartment: "Apt 4B",
      city: "Lagos",
      state: "lagos",
      postalCode: "100001",
      isDefault: true,
    },
    {
      id: "addr2",
      label: "Office",
      firstName: "John",
      lastName: "Doe",
      address: "456 Business Ave",
      apartment: "Suite 200",
      city: "Abuja",
      state: "abuja",
      postalCode: "900001",
      isDefault: false,
    },
  ]);

  const [savedPaymentMethods] = useState([
    {
      id: "card1",
      type: "visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "26",
      cardName: "John Doe",
      isDefault: true,
    },
    {
      id: "card2",
      type: "mastercard",
      last4: "8888",
      expiryMonth: "06",
      expiryYear: "27",
      cardName: "John Doe",
      isDefault: false,
    },
  ]);

  // Use state for savedContacts to allow adding new ones
  const [savedContacts, setSavedContacts] = useState([
    {
      id: "contact1",
      email: "john.doe@example.com",
      phone: "+234 801 234 5678",
      isDefault: true,
    },
  ]);

  // Mock cart data
  const cart = useMemo(
    () => [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 15000,
        quantity: 2,
        image: "/api/placeholder/80/80",
        sku: "PWH-001",
      },
      {
        id: 2,
        name: "Smart Phone Case",
        price: 3500,
        quantity: 1,
        image: "/api/placeholder/80/80",
        sku: "SPC-002",
      },
    ],
    []
  );

  // Default form data
  const defaultFormData = {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    saveInfo: false,
    sameAsBilling: true,
    deliveryOption: "standard",
    selectedAddress: "",
    selectedPayment: "",
    selectedContact: "",
    useNewAddress: false,
    useNewPayment: false,
    useNewContact: false,
  };

  // Load saved data from localStorage
  const loadSavedProgress = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { data, timestamp } = JSON.parse(saved);

        // Check if data has expired
        if (Date.now() - timestamp > EXPIRY_TIME) {
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }

        return data;
      }
    } catch (error) {
      console.error("Error loading saved progress:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  };

  // Save progress to localStorage
  const saveProgress = (step, formData, contacts) => {
    try {
      const dataToSave = {
        currentStep: step,
        formData: {
          ...formData,
          // Don't save sensitive payment data
          cardNumber: "",
          cvv: "",
        },
        savedContacts: contacts,
        timestamp: Date.now(),
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data: dataToSave,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // Initialize state with saved data or defaults
  const initializeState = () => {
    const savedProgress = loadSavedProgress();

    if (savedProgress) {
      return {
        formData: { ...defaultFormData, ...savedProgress.formData },
        currentStep: savedProgress.currentStep || 1,
        contacts: savedProgress.savedContacts || [
          {
            id: "contact1",
            email: "john.doe@example.com",
            phone: "+234 801 234 5678",
            isDefault: true,
          },
        ],
      };
    }

    return {
      formData: defaultFormData,
      currentStep: 1,
      contacts: [
        {
          id: "contact1",
          email: "john.doe@example.com",
          phone: "+234 801 234 5678",
          isDefault: true,
        },
      ],
    };
  };

  const initialState = initializeState();

  const [formData, setFormData] = useState(initialState.formData);
  const [currentStep, setCurrentStep] = useState(initialState.currentStep);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Update savedContacts with initialized data
  useState(() => {
    setSavedContacts(initialState.contacts);
  });

  // Modal states
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const { setOpenCart } = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push("/products");
    setOpenCart(true);
  };

  // Save progress whenever formData, currentStep, or savedContacts change
  useEffect(() => {
    // Don't save on initial load to avoid overwriting with defaults
    const timer = setTimeout(() => {
      saveProgress(currentStep, formData, savedContacts);
    }, 500); // Debounce saves

    return () => clearTimeout(timer);
  }, [formData, currentStep, savedContacts]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const selectSavedAddress = useCallback((address) => {
    setFormData((prev) => ({
      ...prev,
      selectedAddress: address.id,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      apartment: address.apartment,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      useNewAddress: false,
    }));
  }, []);

  const selectSavedPayment = useCallback((payment) => {
    setFormData((prev) => ({
      ...prev,
      selectedPayment: payment.id,
      cardName: payment.cardName,
      expiryDate: `${payment.expiryMonth}/${payment.expiryYear.slice(2)}`,
      useNewPayment: false,
    }));
  }, []);

  const selectSavedContact = useCallback((contact) => {
    setFormData((prev) => ({
      ...prev,
      selectedContact: contact.id,
      email: contact.email,
      phone: contact.phone,
      useNewContact: false,
    }));
  }, []);

  // Function to handle saving new contact
  const handleSaveContact = useCallback(
    (contactData) => {
      const newContact = {
        id: `contact${Date.now()}`, // Simple ID generation
        email: contactData.email,
        phone: contactData.phone,
        isDefault: savedContacts.length === 0, // Make it default if it's the first contact
      };

      setSavedContacts((prev) => [...prev, newContact]);

      // Auto-select the newly saved contact
      setFormData((prev) => ({
        ...prev,
        selectedContact: newContact.id,
        email: newContact.email,
        phone: newContact.phone,
        useNewContact: false,
      }));
    },
    [savedContacts.length]
  );

  // Function to handle deleting contact
  const handleDeleteContact = useCallback(
    (contactId) => {
      setSavedContacts((prev) =>
        prev.filter((contact) => contact.id !== contactId)
      );

      // If the deleted contact was selected, clear the selection
      if (formData.selectedContact === contactId) {
        setFormData((prev) => ({
          ...prev,
          selectedContact: "",
          email: "",
          phone: "",
        }));
      }
    },
    [formData.selectedContact]
  );

  const orderSummary = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const freeShippingThreshold = 20000;
    const baseShippingCost =
      formData.deliveryOption === "express"
        ? 3000
        : formData.deliveryOption === "overnight"
        ? 5000
        : 1500;
    const shippingCost =
      subtotal >= freeShippingThreshold ? 0 : baseShippingCost;
    const tax = Math.round(subtotal * 0.075);
    const total = subtotal + shippingCost + tax;

    return { subtotal, shippingCost, tax, total, freeShippingThreshold };
  }, [cart, formData.deliveryOption]);

  // Updated to only 3 steps
  const steps = [
    { id: 1, name: "Contact", icon: User },
    { id: 2, name: "Shipping", icon: Truck },
    { id: 3, name: "Payment", icon: CreditCard },
  ];

  const nigerianStates = [
    { value: "lagos", label: "Lagos" },
    { value: "abuja", label: "Abuja (FCT)" },
    { value: "kano", label: "Kano" },
    { value: "rivers", label: "Rivers" },
    { value: "ogun", label: "Ogun" },
    { value: "kaduna", label: "Kaduna" },
    { value: "oyo", label: "Oyo" },
    { value: "delta", label: "Delta" },
  ];

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    } else if (step === 2) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
    } else if (step === 3) {
      if (formData.useNewPayment || !savedPaymentMethods.length) {
        if (!formData.cardNumber)
          newErrors.cardNumber = "Card number is required";
        if (!formData.expiryDate)
          newErrors.expiryDate = "Expiry date is required";
        if (!formData.cvv) newErrors.cvv = "CVV is required";
        if (!formData.cardName)
          newErrors.cardName = "Cardholder name is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if user can proceed from step 1 (contact step)
  const canProceedFromContactStep = () => {
    if (formData.useNewContact) {
      // If adding new contact, both fields must be filled
      return formData.email && formData.phone;
    } else {
      // If using saved contacts, one must be selected
      return formData.selectedContact;
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !canProceedFromContactStep()) {
      // Don't proceed if no contact is selected or new contact is incomplete
      return;
    }

    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCompleteOrder = async () => {
    if (validateStep(currentStep)) {
      setIsProcessing(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Clear saved progress on successful order completion
        localStorage.removeItem(STORAGE_KEY);

        alert("Order completed successfully!");

        // Optionally redirect to order confirmation page
        // router.push('/order-confirmation');
      } catch (error) {
        console.error("Order failed:", error);
        alert("Failed to complete order. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Function to clear saved progress (optional utility)
  const clearSavedProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(defaultFormData);
    setCurrentStep(1);
    setSavedContacts([
      {
        id: "contact1",
        email: "john.doe@example.com",
        phone: "+234 801 234 5678",
        isDefault: true,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm px-[.5rem] tablet-lg:px-[1rem]">
        <div className="mx-auto px-2 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors cursor-pointer"
                onClick={handleClick}
              >
                <ArrowLeft size={18} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Cart</span>
                <span className="sm:hidden">Back</span>
              </button>
              <div className="h-4 sm:h-6 w-px bg-gray-300" />
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Checkout
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Shield size={14} />
              <span className="hidden sm:inline">Secure Checkout</span>
              <span className="sm:hidden">Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-2 sm:py-8 px-[.5rem] tablet-lg:px-[2rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="space-y-4 sm:space-y-6">
            <CheckoutSteps steps={steps} currentStep={currentStep} />

            {currentStep === 1 && (
              <ContactInformation
                formData={formData}
                savedContacts={savedContacts}
                handleInputChange={handleInputChange}
                selectSavedContact={selectSavedContact}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                onDeleteContact={handleDeleteContact}
                onSaveContact={handleSaveContact}
              />
            )}

            {currentStep === 2 && (
              <>
                <ShippingAddress
                  formData={formData}
                  savedAddresses={savedAddresses}
                  handleInputChange={handleInputChange}
                  selectSavedAddress={selectSavedAddress}
                  setFormData={setFormData}
                  nigerianStates={nigerianStates}
                  errors={errors}
                />
                {/* <DeliveryOptions
                  formData={formData}
                  handleInputChange={handleInputChange}
                  orderSummary={orderSummary}
                /> */}
              </>
            )}

            {currentStep === 3 && (
              <PaymentOptions
                formData={formData}
                setFormData={setFormData}
                openModal={openModal}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="px-4 py-2 text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>
              )}
              <div className="flex gap-2">
                {/* Optional: Add clear progress button for development/testing */}
                {process.env.NODE_ENV === "development" && (
                  <button
                    onClick={clearSavedProgress}
                    className="px-3 py-2 text-xs text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md"
                  >
                    Clear Progress
                  </button>
                )}
                <button
                  onClick={
                    currentStep === steps.length
                      ? handleCompleteOrder
                      : handleNextStep
                  }
                  className={`px-6 py-2 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors ${
                    isProcessing ? "opacity-50 cursor-not-allowed" : ""
                  } ${
                    currentStep === 1 && !canProceedFromContactStep()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    isProcessing ||
                    (currentStep === 1 && !canProceedFromContactStep())
                  }
                >
                  {currentStep === steps.length ? "Complete Order" : "Continue"}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary cart={cart} orderSummary={orderSummary} />
        </div>

        {/* Payment Method Modals */}
        <CardPayment
          isOpen={activeModal === "card"}
          onClose={closeModal}
          formData={formData}
          handleInputChange={handleInputChange}
          savedPaymentMethods={savedPaymentMethods}
          selectSavedPayment={selectSavedPayment}
          setFormData={setFormData}
          errors={errors}
        />

        <WalletPaymentModal
          isOpen={activeModal === "wallet"}
          onClose={closeModal}
          formData={formData}
          handleInputChange={handleInputChange}
          savedPaymentMethods={savedPaymentMethods}
          selectSavedPayment={selectSavedPayment}
          setFormData={setFormData}
          errors={errors}
        />

        <BankTransferModal
          isOpen={activeModal === "transfer"}
          onClose={closeModal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
