import { PlusCircle, Star } from "lucide-react";
import { productComments, messages } from "../../ConstData";

// Messages and Communication Tab Component
export default function MessagesTab() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mobile-lg:p-5 tablet-lg:p-6">
      <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-center mb-4 mobile-lg:mb-6">
        <h2 className="text-lg mobile-sm:text-xl tablet-lg:text-2xl font-bold text-gray-900 tracking-tight">
          Messages & Communication
        </h2>
        <div className="flex space-x-2 mt-3 mobile-lg:mt-0">
          <button
            className="text-gray-600 px-3 py-1.5 mobile-lg:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 text-xs mobile-sm:text-sm"
            aria-label="Mark all messages as read"
          >
            Mark All Read
          </button>
          <button
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg px-3 py-1.5 mobile-lg:py-2 flex items-center text-xs mobile-sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Compose new message"
          >
            <PlusCircle
              className="h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 mr-1"
              aria-hidden="true"
            />
            New Message
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg divide-y divide-gray-200">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 mobile-lg:p-4 hover:bg-gray-50 transition-colors duration-150 ${
              !message.read ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-start">
              <div className="h-8 w-8 mobile-lg:h-10 mobile-lg:w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <span className="text-gray-600 font-medium text-sm mobile-sm:text-base">
                  {message.sender.charAt(0)}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs mobile-sm:text-sm font-medium text-gray-900">
                    {message.sender}
                  </h3>
                  <p className="text-[0.65rem] mobile-sm:text-xs text-gray-500">
                    {message.time}
                  </p>
                </div>
                <div className="mt-1">
                  <p className="text-xs mobile-sm:text-sm text-gray-600">
                    {message.content}
                  </p>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    className="bg-green-100 text-green-700 text-[0.65rem] mobile-sm:text-xs font-medium px-2 py-1 rounded-lg hover:bg-green-200 transition-all duration-150"
                    aria-label={`Reply to ${message.sender}`}
                  >
                    Reply
                  </button>
                  <button
                    className="bg-gray-100 text-gray-700 text-[0.65rem] mobile-sm:text-xs font-medium px-2 py-1 rounded-lg hover:bg-gray-200 transition-all duration-150"
                    aria-label={`Archive message from ${message.sender}`}
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 mobile-lg:mt-6">
        <h3 className="text-base mobile-sm:text-lg tablet-lg:text-lg font-medium text-gray-900 mb-3 mobile-lg:mb-4">
          Product Comments
        </h3>
        <div className="bg-white rounded-lg divide-y divide-gray-200">
          {productComments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 mobile-lg:p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex flex-col mobile-lg:flex-row justify-between items-start mobile-lg:items-start">
                <div className="w-full mobile-lg:w-3/4">
                  <h4 className="text-xs mobile-sm:text-sm font-medium text-gray-900">
                    {comment.user}
                    <span className="ml-2 text-[0.65rem] mobile-sm:text-xs text-gray-500">
                      on {comment.product}
                    </span>
                  </h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 mobile-lg:h-4 mobile-lg:w-4 ${
                          i < comment.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill={i < comment.rating ? "currentColor" : "none"}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-1 text-[0.65rem] mobile-sm:text-xs text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                  <p className="mt-1 mobile-lg:mt-2 text-xs mobile-sm:text-sm text-gray-600">
                    {comment.comment}
                  </p>
                </div>
                <button
                  className="mt-2 mobile-lg:mt-0 text-[0.65rem] mobile-sm:text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-lg transition-all duration-150"
                  aria-label={`Reply to ${comment.user}'s comment on ${comment.product}`}
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
