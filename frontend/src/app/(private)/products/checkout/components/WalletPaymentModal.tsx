import React from "react";

const WalletPaymentModal = ({ isOpen, onClose, setFormData }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    setFormData((prev) => ({
      ...prev,
      selectedPayment: "wallet",
      useNewPayment: false,
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Wallet Payment</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Pay using your digital wallet. Select this option to proceed with
              a wallet payment.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>
                <strong>Wallet Provider:</strong> Example Wallet
              </p>
              <p>
                <strong>Instructions:</strong> You will be redirected to your
                wallet provider to authorize the payment after saving.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
            >
              Save Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPaymentModal;
