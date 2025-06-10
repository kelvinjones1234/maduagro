import {
  CreditCard,
  Wallet,
  ArrowUpDown,
  Check,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

const PaymentOptions = ({ formData, setFormData, openModal }) => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Mock wallet data - replace with actual data
  const walletData = {
    balance: 2450.75,
    currency: "NGN",
    accountNumber: "4521 8796 3254 1078",
    bankName: "Digital Wallet Bank",
  };

  // Mock bank transfer data - replace with actual data
  const bankTransferData = {
    accountNumber: "8765 4321 9876 5432",
    bankName: "SecureBank Transfer Services",
    swiftCode: "SECBUS33XXX",
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Pay securely with your credit or debit card",
      icon: CreditCard,
      badge: "Most Popular",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      description: "Pay with your digital wallet",
      icon: Wallet,
      badge: null,
    },
    {
      id: "transfer",
      name: "Bank Transfer",
      description: "Transfer directly from your bank account",
      icon: ArrowUpDown,
      badge: "Secure",
    },
  ];

  const handlePaymentSelect = (methodId) => {
    setFormData((prev) => ({
      ...prev,
      selectedPayment: methodId,
    }));

    // Only open modal for card payment method
    if (methodId === "card") {
      openModal(methodId);
    }
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const formatBalance = (balance, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(balance);
  };

  return (
    <div className="bg-white rounded-lg px-3 py-4 mobile-lg:px-4 tablet-sm:px-5 tablet-lg:px-6 shadow-sm">
      <div className="flex items-center gap-2 mobile-lg:gap-3 mb-4 tablet-lg:mb-6">
        <div className="w-7 h-7 mobile-lg:w-8 mobile-lg:h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <CreditCard
            size={14}
            className="mobile-lg:w-4 mobile-lg:h-4 text-amber-600"
          />
        </div>
        <h3 className="text-base mobile-lg:text-lg font-semibold text-gray-900">
          Payment Method
        </h3>
      </div>

      <div className="space-y-3 mobile-lg:space-y-4">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          const isSelected = formData.selectedPayment === method.id;
          const isWallet = method.id === "wallet";
          const isBankTransfer = method.id === "transfer";

          return (
            <div key={method.id}>
              <div
                className={`relative p-3 mobile-lg:p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handlePaymentSelect(method.id)}
              >
                <div className="flex items-center gap-3 mobile-lg:gap-4">
                  <div
                    className={`w-10 h-10 mobile-lg:w-12 mobile-lg:h-12 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-amber-100 text-amber-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <IconComponent
                      size={18}
                      className="mobile-lg:w-5 mobile-lg:h-5"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-medium text-gray-900 text-sm mobile-lg:text-base">
                        {method.name}
                      </h4>
                      {method.badge && (
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                          {method.badge}
                        </span>
                      )}
                      {/* Wallet Balance Display */}
                      {isWallet && (
                        <div className="ml-auto flex items-center gap-1 mobile-lg:gap-2">
                          <span className="text-xs mobile-lg:text-sm text-gray-500">
                            Balance:
                          </span>
                          <span className="font-semibold text-sm mobile-lg:text-base text-green-600">
                            {formatBalance(
                              walletData.balance,
                              walletData.currency
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mobile-lg:text-sm">
                      {method.description}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  <div
                    className={`w-5 h-5 mobile-lg:w-6 mobile-lg:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-amber-500 bg-amber-500"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <Check
                        size={12}
                        className="mobile-lg:w-3.5 mobile-lg:h-3.5 text-white"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Digital Wallet Account Details */}
              {isWallet && isSelected && (
                <div className="mt-3 p-3 mobile-lg:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900 text-sm mobile-lg:text-base">
                      Funding Account Details
                    </h5>
                    <button
                      onClick={() => setShowAccountDetails(!showAccountDetails)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs mobile-lg:text-sm font-medium transition-colors"
                    >
                      {showAccountDetails ? (
                        <>
                          <Eye
                            size={14}
                            className="mobile-lg:w-4 mobile-lg:h-4"
                          />
                          Hide
                        </>
                      ) : (
                        <>
                          <EyeOff
                            size={14}
                            className="mobile-lg:w-4 mobile-lg:h-4"
                          />
                          Show
                        </>
                      )}
                    </button>
                  </div>

                  {showAccountDetails && (
                    <div className="space-y-3">
                      {/* Bank Name */}
                      <div>
                        <label className="block text-xs mobile-lg:text-sm font-medium text-gray-700 mb-1">
                          Bank Name
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm mobile-lg:text-base text-gray-900">
                            {walletData.bankName}
                          </span>
                        </div>
                      </div>

                      {/* Account Number */}
                      <div>
                        <label className="block text-xs mobile-lg:text-sm font-medium text-gray-700 mb-1">
                          Account Number
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm mobile-lg:text-base text-gray-900 font-mono bg-white px-2 py-1 rounded border">
                            {walletData.accountNumber}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                walletData.accountNumber.replace(/\s/g, ""),
                                "wallet-account"
                              )
                            }
                            className="p-1.5 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                            title="Copy account number"
                          >
                            <Copy
                              size={14}
                              className="mobile-lg:w-4 mobile-lg:h-4"
                            />
                          </button>
                          {copiedField === "wallet-account" && (
                            <span className="text-xs text-green-600 font-medium">
                              Copied!
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Current Balance */}
                      <div className="pt-2 border-t border-blue-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs mobile-lg:text-sm font-medium text-gray-700">
                            Current Balance
                          </span>
                          <span className="text-base mobile-lg:text-lg font-bold text-green-600">
                            {formatBalance(
                              walletData.balance,
                              walletData.currency
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 p-2 mobile-lg:p-3 bg-blue-100 rounded text-xs mobile-lg:text-sm text-blue-800">
                    <strong>Note:</strong> Use these details to fund your
                    digital wallet from your bank account.
                  </div>
                </div>
              )}

              {/* Bank Transfer Account Details */}
              {isBankTransfer && isSelected && (
                <div className="mt-3 p-3 mobile-lg:p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900 text-sm mobile-lg:text-base">
                      Transfer Account Details
                    </h5>
                    <button
                      onClick={() => setShowAccountDetails(!showAccountDetails)}
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 text-xs mobile-lg:text-sm font-medium transition-colors"
                    >
                      {showAccountDetails ? (
                        <>
                          <EyeOff
                            size={14}
                            className="mobile-lg:w-4 mobile-lg:h-4"
                          />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye
                            size={14}
                            className="mobile-lg:w-4 mobile-lg:h-4"
                          />
                          Show
                        </>
                      )}
                    </button>
                  </div>

                  {showAccountDetails && (
                    <div className="space-y-3">
                      {/* Bank Name */}
                      <div>
                        <label className="block text-xs mobile-lg:text-sm font-medium text-gray-700 mb-1">
                          Bank Name
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm mobile-lg:text-base text-gray-900">
                            {bankTransferData.bankName}
                          </span>
                        </div>
                      </div>

                      {/* Account Number */}
                      <div>
                        <label className="block text-xs mobile-lg:text-sm font-medium text-gray-700 mb-1">
                          Account Number
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm mobile-lg:text-base text-gray-900 font-mono bg-white px-2 py-1 rounded border">
                            {bankTransferData.accountNumber}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                bankTransferData.accountNumber.replace(
                                  /\s/g,
                                  ""
                                ),
                                "transfer-account"
                              )
                            }
                            className="p-1.5 hover:bg-green-100 rounded text-green-600 transition-colors"
                            title="Copy account number"
                          >
                            <Copy
                              size={14}
                              className="mobile-lg:w-4 mobile-lg:h-4"
                            />
                          </button>
                          {copiedField === "transfer-account" && (
                            <span className="text-xs text-green-600 font-medium">
                              Copied!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 p-2 mobile-lg:p-3 bg-green-100 rounded text-xs mobile-lg:text-sm text-green-800">
                    <strong>Important:</strong> Transfer processing may take 1-3
                    business days. Include your reference number in the transfer
                    memo.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Security Note */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
            <Check size={10} className="text-green-600" />
          </div>
          <p className="text-xs mobile-lg:text-sm text-gray-600">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
