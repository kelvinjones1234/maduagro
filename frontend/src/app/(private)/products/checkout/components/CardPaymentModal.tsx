// import React from "react";
// import { CreditCard, Plus, Edit3, Trash2, ArrowLeft } from "lucide-react";

// const CardTypeIcon = ({ type }) => {
//   const icons = {
//     visa: "💳",
//     mastercard: "💳",
//     default: "💳",
//   };
//   return <span className="text-lg">{icons[type] || icons.default}</span>;
// };

// const CardPayment = ({
//   isOpen,
//   onClose,
//   formData,
//   handleInputChange,
//   savedPaymentMethods,
//   selectSavedPayment,
//   setFormData,
//   errors,
//   onSavePayment,
// }) => {
//   if (!isOpen) return null;

//   const handleSave = () => {
//     if (formData.useNewPayment) {
//       onSavePayment({
//         id: `card${Date.now()}`,
//         type: "card",
//         last4: formData.cardNumber.slice(-4),
//         expiryMonth: formData.expiryDate.split("/")[0],
//         expiryYear: `20${formData.expiryDate.split("/")[1]}`,
//         cardName: formData.cardName,
//         isDefault: savedPaymentMethods.length === 0,
//       });
//     }
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Card Payment</h3>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Payment Information Section */}
//           <div className="bg-white rounded-lg px-3 py-4 mobile-lg:px-4 tablet-sm:px-5 tablet-lg:px-6 shadow-sm">
//             <div className="flex items-center gap-2 mobile-lg:gap-3 mb-4 tablet-lg:mb-6">
//               <div className="w-7 h-7 mobile-lg:w-8 mobile-lg:h-8 rounded-full bg-amber-100 flex items-center justify-center">
//                 <CreditCard
//                   size={14}
//                   className="mobile-lg:w-4 mobile-lg:h-4 text-amber-600"
//                 />
//               </div>
//               <h3 className="text-base mobile-lg:text-lg font-semibold text-gray-900">
//                 Payment Information
//               </h3>
//             </div>

//             {/* Saved Payment Methods */}
//             {savedPaymentMethods.length > 0 && !formData.useNewPayment && (
//               <div className="mb-4 space-y-2">
//                 <h4 className="text-sm font-medium text-gray-700">
//                   Saved Payment Methods
//                 </h4>
//                 {savedPaymentMethods.map((payment) => (
//                   <div
//                     key={payment.id}
//                     className={`p-2 mobile-lg:p-3 border rounded-lg cursor-pointer transition-all ${
//                       formData.selectedPayment === payment.id
//                         ? "border-amber-500 bg-amber-50"
//                         : "border-gray-200 hover:border-gray-300"
//                     }`}
//                     onClick={() => selectSavedPayment(payment)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 mobile-lg:gap-3 min-w-0 flex-1">
//                         <CardTypeIcon type={payment.type} />
//                         <div className="min-w-0 flex-1">
//                           <p className="font-medium text-gray-900 text-sm">
//                             •••• •••• •••• {payment.last4}
//                           </p>
//                           <p className="text-gray-600 text-sm">
//                             Expires {payment.expiryMonth}/{payment.expiryYear}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1 mobile-lg:gap-2 ml-2 flex-shrink-0">
//                         {payment.isDefault && (
//                           <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full hidden mobile-lg:inline">
//                             Default
//                           </span>
//                         )}
//                         <div className="flex gap-1">
//                           <button className="p-1 text-gray-400 hover:text-gray-600">
//                             <Edit3
//                               size={12}
//                               className="mobile-lg:w-3.5 mobile-lg:h-3.5"
//                             />
//                           </button>
//                           <button className="p-1 text-gray-400 hover:text-red-500">
//                             <Trash2
//                               size={12}
//                               className="mobile-lg:w-3.5 mobile-lg:h-3.5"
//                             />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     {payment.isDefault && (
//                       <div className="mt-2 mobile-lg:hidden">
//                         <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
//                           Default
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       useNewPayment: true,
//                     }))
//                   }
//                   className="flex items-center gap-1 mobile-lg:gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
//                 >
//                   <Plus size={14} className="mobile-lg:w-4 mobile-lg:h-4" />
//                   Use a different card for payment
//                 </button>
//               </div>
//             )}

//             {/* New Payment Form */}
//             {(formData.useNewPayment || !savedPaymentMethods.length) && (
//               <div className="space-y-3 mobile-lg:space-y-4">
//                 {/* Back Button - Only show if there are saved payment methods */}
//                 {savedPaymentMethods.length > 0 && (
//                   <div className="flex items-center justify-between pb-2 border-b border-gray-100">
//                     <button
//                       onClick={() =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           useNewPayment: false,
//                         }))
//                       }
//                       className="flex items-center gap-1 mobile-lg:gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
//                     >
//                       <ArrowLeft
//                         size={14}
//                         className="mobile-lg:w-4 mobile-lg:h-4"
//                       />
//                       Back
//                     </button>
//                     <span className="text-sm text-gray-500">
//                       Add New Payment Method
//                     </span>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
//                     Card Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="cardNumber"
//                     value={formData.cardNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
//                     placeholder="1234 5678 9012 3456"
//                     maxLength="19"
//                     required
//                   />
//                   {errors.cardNumber && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.cardNumber}
//                     </p>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-2 gap-3 mobile-lg:gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
//                       Expiry Date *
//                     </label>
//                     <input
//                       type="text"
//                       name="expiryDate"
//                       value={formData.expiryDate}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
//                       placeholder="MM/YY"
//                       maxLength="5"
//                       required
//                     />
//                     {errors.expiryDate && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {errors.expiryDate}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
//                       CVV *
//                     </label>
//                     <input
//                       type="text"
//                       name="cvv"
//                       value={formData.cvv}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
//                       placeholder="123"
//                       maxLength="4"
//                       required
//                     />
//                     {errors.cvv && (
//                       <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
//                     Cardholder Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="cardName"
//                     value={formData.cardName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
//                     placeholder="PraiseMedia"
//                     required
//                   />
//                   {errors.cardName && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.cardName}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="saveInfo"
//                     checked={formData.saveInfo}
//                     onChange={handleInputChange}
//                     className="text-amber-500 focus:ring-amber-500 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">
//                     Save this payment method for future orders
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="mt-6 flex gap-3">
//             <button
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
//             >
//               Use Payment Card
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardPayment;

import React from "react";
import { CreditCard, Plus, Edit3, Trash2, ArrowLeft } from "lucide-react";

const CardTypeIcon = ({ type }) => {
  const icons = {
    visa: "💳",
    mastercard: "💳",
    default: "💳",
  };
  return <span className="text-lg">{icons[type] || icons.default}</span>;
};

const CardPayment = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  savedPaymentMethods,
  selectSavedPayment,
  setFormData,
  errors,
  onSavePayment,
}) => {
  if (!isOpen) return null;

  const handleSave = () => {
    if (formData.useNewPayment) {
      onSavePayment({
        id: `card${Date.now()}`,
        type: "card",
        last4: formData.cardNumber.slice(-4),
        expiryMonth: formData.expiryDate.split("/")[0],
        expiryYear: `20${formData.expiryDate.split("/")[1]}`,
        cardName: formData.cardName,
        isDefault: savedPaymentMethods.length === 0,
      });
      // Redirect to saved payment methods list
      setFormData((prev) => ({
        ...prev,
        useNewPayment: false,
      }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Card Payment</h3>
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

          {/* Payment Information Section */}
          <div className="bg-white rounded-lg px-3 py-4 mobile-lg:px-4 tablet-sm:px-5 tablet-lg:px-6 shadow-sm">
            <div className="flex items-center gap-2 mobile-lg:gap-3 mb-4 tablet-lg:mb-6">
              <div className="w-7 h-7 mobile-lg:w-8 mobile-lg:h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <CreditCard
                  size={14}
                  className="mobile-lg:w-4 mobile-lg:h-4 text-amber-600"
                />
              </div>
              <h3 className="text-base mobile-lg:text-lg font-semibold text-gray-900">
                Payment Information
              </h3>
            </div>

            {/* Saved Payment Methods */}
            {savedPaymentMethods.length > 0 && !formData.useNewPayment && (
              <div className="mb-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Saved Payment Methods
                </h4>
                {savedPaymentMethods.map((payment) => (
                  <div
                    key={payment.id}
                    className={`p-2 mobile-lg:p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.selectedPayment === payment.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => selectSavedPayment(payment)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 mobile-lg:gap-3 min-w-0 flex-1">
                        <CardTypeIcon type={payment.type} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm">
                            •••• •••• •••• {payment.last4}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Expires {payment.expiryMonth}/{payment.expiryYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mobile-lg:gap-2 ml-2 flex-shrink-0">
                        {payment.isDefault && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full hidden mobile-lg:inline">
                            Default
                          </span>
                        )}
                        <div className="flex gap-1">
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
                    {payment.isDefault && (
                      <div className="mt-2 mobile-lg:hidden">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                          Default
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      useNewPayment: true,
                    }))
                  }
                  className="flex items-center gap-1 mobile-lg:gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  <Plus size={14} className="mobile-lg:w-4 mobile-lg:h-4" />
                  Use a different card for payment
                </button>
              </div>
            )}

            {/* New Payment Form */}
            {(formData.useNewPayment || !savedPaymentMethods.length) && (
              <div className="space-y-3 mobile-lg:space-y-4">
                {/* Back Button - Only show if there are saved payment methods */}
                {savedPaymentMethods.length > 0 && (
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <button
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          useNewPayment: false,
                        }))
                      }
                      className="flex items-center gap-1 mobile-lg:gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
                    >
                      <ArrowLeft
                        size={14}
                        className="mobile-lg:w-4 mobile-lg:h-4"
                      />
                      Back
                    </button>
                    <span className="text-sm text-gray-500">
                      Add New Payment Method
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mobile-lg:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 mobile-lg:mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 mobile-lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors text-sm mobile-lg:text-base"
                    placeholder="PraiseMedia"
                    required
                  />
                  {errors.cardName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.cardName}
                    </p>
                  )}
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
                    Save this payment method for future orders
                  </span>
                </div>
              </div>
            )}
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
              {formData.useNewPayment || !savedPaymentMethods.length
                ? "Add Card"
                : "Use Payment Card"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
