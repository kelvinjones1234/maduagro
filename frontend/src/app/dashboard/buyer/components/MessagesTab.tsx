import React from "react";
import {
  Send,
  Reply,
  Plus,
  Search,
  Users,
  X,
  Check,
  CheckCheck,
  ChevronDown,
  MoreVertical,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import {
  allSellers,
  initialContacts,
  initialAllMessages,
} from "@/app/dashboard/ConstData";
import { formatDate } from "../../lib/FormatDate";
import { groupMessagesByDate } from "../../lib/GroupMessageByDate";

import { useChatScroll } from "../../lib/ChatScroll";

// Custom hook for responsive design
const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: windowSize.width < 768, // mobile-lg breakpoint
    isTablet: windowSize.width >= 768 && windowSize.width < 900, // tablet-sm to laptop-sm
    isDesktop: windowSize.width >= 1024, // laptop-sm and above
  };
};

export default function MessagesTab() {
  const [viewMode, setViewMode] = useState("chats");
  const [contacts, setContacts] = useState(initialContacts);
  const [allMessages, setAllMessages] = useState(initialAllMessages);
  const [activeContact, setActiveContact] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupedMessages, setGroupedMessages] = useState([]);
  const { scrollContainerRef, chatScroll } = useChatScroll();
  const messagesEndRef = useRef(null);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showContactsList, setShowContactsList] = useState(true);

  // Set first contact as active on initial load for chats view
  useEffect(() => {
    if (contacts.length > 0 && !activeContact && viewMode === "chats") {
      setActiveContact(contacts[0]);
      if (isMobile) {
        setShowContactsList(false);
      }
    }
  }, [viewMode, contacts, isMobile]);

  // Update current messages when active contact changes
  useEffect(() => {
    if (activeContact) {
      const contactMessages = allMessages[activeContact.id] || [];
      setCurrentMessages(contactMessages);
      setGroupedMessages(groupMessagesByDate(contactMessages));

      if (contactMessages.length > 0) {
        const markMessagesRead = (messages) =>
          messages.map((msg) => ({
            ...msg,
            read: msg.sender !== "You" ? true : msg.read,
            status:
              msg.sender === "You" && msg.status === "delivered"
                ? "read"
                : msg.status,
            replies: msg.replies ? markMessagesRead(msg.replies) : [],
          }));

        const updatedMessages = markMessagesRead(contactMessages);
        const updatedAllMessages = { ...allMessages };
        updatedAllMessages[activeContact.id] = updatedMessages;
        setAllMessages(updatedAllMessages);

        const countUnread = (messages) =>
          messages.reduce(
            (count, msg) =>
              count +
              (msg.read || msg.sender === "You" ? 0 : 1) +
              (msg.replies ? countUnread(msg.replies) : 0),
            0
          );

        setContacts(
          contacts.map((contact) =>
            contact.id === activeContact.id
              ? { ...contact, unread: countUnread(updatedMessages) }
              : contact
          )
        );
      }
      chatScroll();
    }
  }, [activeContact]);

  // Scroll to bottom when new messages or replies are added
  useEffect(() => {
    chatScroll();
  }, [groupedMessages]);

  // Start a new conversation with a seller
  const startConversation = (seller) => {
    const existingSeller = contacts.find((contact) => contact.id === seller.id);

    if (!existingSeller) {
      setContacts([...contacts, seller]);
      if (!allMessages[seller.id]) {
        const updatedAllMessages = { ...allMessages };
        updatedAllMessages[seller.id] = [];
        setAllMessages(updatedAllMessages);
      }
    }

    setActiveContact(seller);
    setViewMode("chats");
    if (isMobile) {
      setShowContactsList(false);
    }
  };

  // Handle sending a new message to a contact
  const handleSendMessage = () => {
    if (newMessage.trim() && activeContact) {
      const newMsg = {
        id: Date.now(),
        sender: "You",
        recipient: activeContact.name,
        content: newMessage,
        timestamp: new Date(),
        read: true,
        status: "sent",
        replies: [],
      };

      const updatedMessages = [
        ...(allMessages[activeContact.id] || []),
        newMsg,
      ];

      setCurrentMessages(updatedMessages);
      setGroupedMessages(groupMessagesByDate(updatedMessages));

      const updatedAllMessages = { ...allMessages };
      updatedAllMessages[activeContact.id] = updatedMessages;
      setAllMessages(updatedAllMessages);

      setNewMessage("");

      setTimeout(() => {
        const deliveredMessages = updatedMessages.map((msg) =>
          msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg
        );

        setCurrentMessages(deliveredMessages);
        setGroupedMessages(groupMessagesByDate(deliveredMessages));

        const updatedDeliveredMessages = { ...allMessages };
        updatedAllMessages[activeContact.id] = deliveredMessages;
        setAllMessages(updatedAllMessages);

        setTimeout(() => {
          const readMessages = deliveredMessages.map((msg) =>
            msg.id === newMsg.id ? { ...msg, status: "read" } : msg
          );

          setCurrentMessages(readMessages);
          setGroupedMessages(groupMessagesByDate(readMessages));

          const updatedReadMessages = { ...allMessages };
          updatedAllMessages[activeContact.id] = readMessages;
          setAllMessages(updatedAllMessages);
        }, 1000);
      }, 1000);
    }
  };

  // Handle selecting a contact
  const handleSelectContact = (contact) => {
    setActiveContact(contact);
    if (isMobile) {
      setShowContactsList(false);
    }
  };

  // Handle going back to contacts list on mobile
  const handleBackToContacts = () => {
    setShowContactsList(true);
  };

  // Handle replying to a contact's message
  const handleReplyMessage = (messageId) => {
    if (replyMessage.trim() && activeContact) {
      const replyMsg = {
        id: Date.now(),
        sender: "You",
        recipient: activeContact.name,
        content: replyMessage,
        timestamp: new Date(),
        read: true,
        status: "sent",
        replies: [],
      };

      const updateReplies = (messages) =>
        messages.map((msg) =>
          msg.id === messageId
            ? { ...msg, replies: [...msg.replies, replyMsg] }
            : { ...msg, replies: msg.replies ? updateReplies(msg.replies) : [] }
        );

      const updatedMessages = updateReplies(currentMessages);
      setCurrentMessages(updatedMessages);
      setGroupedMessages(groupMessagesByDate(updatedMessages));

      const updatedAllMessages = { ...allMessages };
      updatedAllMessages[activeContact.id] = updatedMessages;
      setAllMessages(updatedAllMessages);

      setReplyMessage("");
      setActiveReplyId(null);

      setTimeout(() => {
        const deliveredMessages = updatedMessages.map((msg) =>
          msg.replies.some((r) => r.id === replyMsg.id)
            ? {
                ...msg,
                replies: msg.replies.map((r) =>
                  r.id === replyMsg.id ? { ...r, status: "delivered" } : r
                ),
              }
            : msg
        );

        setCurrentMessages(deliveredMessages);
        setGroupedMessages(groupMessagesByDate(deliveredMessages));

        const updatedDeliveredMessages = { ...allMessages };
        updatedAllMessages[activeContact.id] = deliveredMessages;
        setAllMessages(updatedAllMessages);

        setTimeout(() => {
          const readMessages = deliveredMessages.map((msg) =>
            msg.replies.some((r) => r.id === replyMsg.id)
              ? {
                  ...msg,
                  replies: msg.replies.map((r) =>
                    r.id === replyMsg.id ? { ...r, status: "read" } : r
                  ),
                }
              : msg
          );

          setCurrentMessages(readMessages);
          setGroupedMessages(groupMessagesByDate(readMessages));

          const updatedReadMessages = { ...allMessages };
          updatedAllMessages[activeContact.id] = readMessages;
          setAllMessages(updatedAllMessages);
        }, 1000);
      }, 1000);
    }
  };

  // Mark message as read
  const markAsRead = (messageId) => {
    if (!activeContact) return;

    const updateReadStatus = (messages) =>
      messages.map((msg) =>
        msg.id === messageId
          ? { ...msg, read: true }
          : {
              ...msg,
              replies: msg.replies ? updateReadStatus(msg.replies) : [],
            }
      );

    const updatedMessages = updateReadStatus(currentMessages);
    setCurrentMessages(updatedMessages);
    setGroupedMessages(groupMessagesByDate(updatedMessages));

    const updatedAllMessages = { ...allMessages };
    updatedAllMessages[activeContact.id] = updatedMessages;
    setAllMessages(updatedAllMessages);

    const countUnread = (messages) =>
      messages.reduce(
        (count, msg) =>
          count +
          (msg.read || msg.sender === "You" ? 0 : 1) +
          (msg.replies ? countUnread(msg.replies) : 0),
        0
      );

    setContacts(
      contacts.map((contact) =>
        contact.id === activeContact.id
          ? { ...contact, unread: countUnread(updatedMessages) }
          : contact
      )
    );
  };

  // Filter contacts or sellers based on search
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSellers = allSellers.filter((seller) =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render message status indicator
  const renderStatusIndicator = (status) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  // Render message with WhatsApp-like styling
  const renderMessage = (message) => {
    if (message.type === "date") {
      return (
        <div
          key={message.id}
          className="flex justify-center my-2 tablet-lg:my-4"
        >
          <div className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {message.date.toLocaleDateString([], {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      );
    }

    const isSender = message.sender === "You";
    const isReply = message.replyTo;

    return (
      <div
        key={message.id}
        className={`flex ${
          isSender ? "justify-end" : "justify-start"
        } mb-2 px-2 tablet-lg:px-4`}
      >
        <div
          className={`max-w-[80%] tablet-lg:max-w-md rounded-lg p-2 tablet-lg:p-3 ${
            isSender
              ? "bg-green-100 rounded-tr-none"
              : "bg-gray-100 rounded-tl-none"
          }`}
        >
          {isReply && (
            <div className="border-l-2 border-gray-400 pl-2 mb-2 text-xs text-gray-500 italic">
              Replying to: "{message.replyTo.content}"
            </div>
          )}
          <div className="text-sm">{message.content}</div>
          <div
            className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
              isSender ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <span>{formatDate(message.timestamp)}</span>
            {isSender && renderStatusIndicator(message.status)}
          </div>
        </div>
      </div>
    );
  };

  // Responsive layout helpers
  const renderContactList = () => (
    <div
      className={`${
        isMobile ? (showContactsList ? "block" : "hidden") : "block"
      } ${isDesktop ? "w-1/3" : isTablet ? "w-2/5" : "w-full"} ${
        isMobile ? "" : "border-r"
      } border-gray-200 p-2 tablet-lg:p-4`}
    >
      <div className="mb-2 tablet-lg:mb-4">
        <div className="relative mb-2 tablet-lg:mb-3">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full p-1.5 tablet-lg:p-2 pl-6 tablet-lg:pl-8 text-xs tablet-lg:text-sm border border-gray-200 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-1.5 tablet-lg:left-2 top-2 tablet-lg:top-2.5 h-3 tablet-lg:h-4 w-3 tablet-lg:w-4 text-gray-400" />
          {searchQuery && (
            <button
              className="absolute right-1.5 tablet-lg:right-2 top-2 tablet-lg:top-2.5 h-3 tablet-lg:h-4 w-3 tablet-lg:w-4 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 tablet-lg:h-4 w-3 tablet-lg:w-4" />
            </button>
          )}
        </div>
      </div>

      {/* the left section of the my conversation tab of the message tab! */}
      <div className="divide-y divide-gray-100 overflow-y-auto max-h-[300px] tablet-lg:max-h-[460px]">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-2 tablet-lg:p-3 flex items-center cursor-pointer transition-colors duration-150 rounded-lg ${
                activeContact && activeContact.id === contact.id
                  ? "bg-green-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleSelectContact(contact)}
            >
              <div className="relative">
                <div className="h-8 tablet-lg:h-10 w-8 tablet-lg:w-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center overflow-hidden">
                  <span className="text-green-700 font-medium text-xs tablet-lg:text-sm">
                    {contact.avatar}
                  </span>
                </div>
                {contact.status === "Online" && (
                  <div className="absolute bottom-0 right-0 h-2 tablet-lg:h-2.5 w-2 tablet-lg:w-2.5 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
              <div className="ml-2 tablet-lg:ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs tablet-lg:text-sm font-medium text-gray-900 flex items-center min-w-[120px]">
                    {contact.name}
                  </h3>
                  {contact.unread > 0 && (
                    <span className="bg-green-600 text-white w-1 h-1 p-2 flex items-center justify-center text-[0.6rem] rounded-full">
                      {contact.unread}
                    </span>
                  )}
                </div>
                <p className="text-[10px] tablet-lg:text-xs text-gray-500 truncate mt-0.5 tablet-lg:mt-1">
                  {allMessages[contact.id] && allMessages[contact.id][0]
                    ? `${
                        allMessages[contact.id][0].sender === "You"
                          ? "You: "
                          : ""
                      }${allMessages[contact.id][0].content.substring(0, 20)}${
                        allMessages[contact.id][0].content.length > 20
                          ? "..."
                          : ""
                      }`
                    : "No messages yet"}
                </p>
                <p className="text-[10px] tablet-lg:text-xs text-gray-400 mt-0.5 tablet-lg:mt-1">
                  {contact.lastSeen}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 tablet-lg:p-4 text-center text-gray-500 text-xs tablet-lg:text-sm">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );

  const renderChatView = () => (
    <div
      className={`${
        isMobile ? (showContactsList ? "hidden" : "block") : "block"
      } ${
        isDesktop ? "w-2/3" : isTablet ? "w-3/5" : "w-full"
      } flex flex-col h-full overflow-hidden`}
    >
      {activeContact ? (
        <>
          <div className="flex justify-between items-center p-2 tablet-lg:p-3 border-b border-gray-200">
            {isMobile && (
              <button
                onClick={handleBackToContacts}
                className="mr-2 p-1 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 tablet-lg:h-5 w-4 tablet-lg:w-5 text-gray-600" />
              </button>
            )}
            <div className="flex items-center flex-1">
              <div className="relative">
                <div className="h-8 tablet-lg:h-10 w-8 tablet-lg:w-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center overflow-hidden">
                  <span className="text-green-700 font-medium text-xs tablet-lg:text-base">
                    {activeContact.avatar}
                  </span>
                </div>
                {activeContact.status === "Online" && (
                  <div className="absolute bottom-0 right-0 h-2 tablet-lg:h-2.5 w-2 tablet-lg:w-2.5 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
              <div className="ml-2 tablet-lg:ml-3 overflow-hidden">
                <h2 className="text-sm tablet-lg:text-lg font-bold text-gray-900 flex items-center flex-wrap">
                  {activeContact.name}
                </h2>
                <p className="text-[10px] tablet-lg:text-xs text-gray-500 truncate">
                  {activeContact.status === "Online"
                    ? "Online"
                    : `Last seen ${activeContact.lastSeen}`}
                </p>
              </div>
            </div>
            <div className="flex space-x-1 tablet-lg:space-x-2">
              <button className="text-gray-600 p-1 tablet-lg:p-2 rounded-full hover:bg-gray-100">
                <Search className="h-4 tablet-lg:h-5 w-4 tablet-lg:w-5" />
              </button>
              <button className="text-gray-600 p-1 tablet-lg:p-2 rounded-full hover:bg-gray-100">
                <MoreVertical className="h-4 tablet-lg:h-5 w-4 tablet-lg:w-5" />
              </button>
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto bg-gray-50"
          >
            <div className="flex flex-col pt-2">
              {groupedMessages.length > 0 ? (
                <>
                  {groupedMessages.map((message) => renderMessage(message))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-2 tablet-lg:p-4">
                  <div className="bg-green-50 p-4 tablet-lg:p-6 rounded-full mb-2 tablet-lg:mb-4">
                    <Users className="h-8 tablet-lg:h-12 w-8 tablet-lg:w-12 text-green-600" />
                  </div>
                  <h3 className="text-gray-800 font-medium text-sm tablet-lg:text-base mb-2 text-center">
                    Start your conversation
                  </h3>
                  <p className="text-gray-500 text-xs tablet-lg:text-sm text-center">
                    Send your first message to {activeContact.name} to begin a
                    conversation.
                  </p>
                </div>
              )}
            </div>
          </div>
          {activeReplyId && (
            <div className="bg-gray-100 p-2 border-t border-gray-200 flex items-center">
              <div className="flex-1 bg-white rounded-lg p-1.5 tablet-lg:p-2 text-xs tablet-lg:text-sm text-gray-600 border border-gray-200 truncate">
                Replying to: "
                {groupedMessages.find((m) => m.id === activeReplyId)?.content}"
              </div>
              <button
                onClick={() => setActiveReplyId(null)}
                className="ml-2 text-gray-500 hover:text-gray-700 flex-shrink-0"
              >
                <X className="h-4 tablet-lg:h-5 w-4 tablet-lg:w-5" />
              </button>
            </div>
          )}
          <div className="p-2 tablet-lg:p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <button className="text-gray-500 p-1 tablet-lg:p-2 rounded-full hover:bg-gray-100">
                <Plus className="h-4 tablet-lg:h-5 w-4 tablet-lg:w-5" />
              </button>
              <div className="flex-1 mx-1 tablet-lg:mx-2">
                <textarea
                  className="w-full text-xs tablet-lg:text-sm text-gray-600 outline-none resize-none border border-gray-200 rounded-lg p-1.5 tablet-lg:p-2"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (newMessage.trim()) {
                        handleSendMessage();
                      }
                    }
                  }}
                  rows={1}
                />
              </div>

              <button
                onClick={handleSendMessage}
                className={`rounded-full p-1 tablet-lg:p-2 flex items-center ${
                  newMessage.trim()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "text-gray-400"
                }`}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 tablet-lg:h-5 w-4 tablet-lg:w-5" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-2 tablet-lg:p-4">
          <div className="bg-green-50 p-4 tablet-lg:p-6 rounded-full mb-2 tablet-lg:mb-4">
            <Users className="h-8 tablet-lg:h-12 w-8 tablet-lg:w-12 text-green-600" />
          </div>
          <h3 className="text-gray-800 font-medium text-sm tablet-lg:text-base mb-2 text-center">
            Select a conversation
          </h3>
          <p className="text-gray-500 text-xs tablet-lg:text-sm text-center">
            {isMobile
              ? "Go back to select a conversation"
              : "Choose a conversation from the left to view messages"}
          </p>
          {isMobile && (
            <button
              onClick={handleBackToContacts}
              className="mt-2 tablet-lg:mt-4 bg-green-600 text-white px-3 tablet-lg:px-4 py-1.5 tablet-lg:py-2 rounded-lg text-xs tablet-lg:text-sm"
            >
              Back to Contacts
            </button>
          )}
        </div>
      )}
    </div>
  );

  const renderSellersList = () => (
    <div className="p-2 tablet-lg:p-4">
      <div className="mb-2 tablet-lg:mb-4">
        <div className="relative mb-2 tablet-lg:mb-3">
          <input
            type="text"
            placeholder="Search sellers..."
            className="w-full p-1.5 tablet-lg:p-2 pl-6 tablet-lg:pl-8 text-xs tablet-lg:text-sm border border-gray-200 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-1.5 tablet-lg:left-2 top-2 tablet-lg:top-2.5 h-3 tablet-lg:h-4 w-3 tablet-lg:w-4 text-gray-400" />
          {searchQuery && (
            <button
              className="absolute right-1.5 tablet-lg:right-2 top-2 tablet-lg:top-2.5 h-3 tablet-lg:h-4 w-3 tablet-lg:w-4 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 tablet-lg:h-4 w-3 tablet-lg:w-4" />
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 laptop-tablet-lg:grid-cols-2 desktop-lg:grid-cols-3 gap-2 tablet-lg:gap-3 overflow-y-auto max-h-[300px] tablet-lg:max-h-[400px] laptop-tablet-lg:max-h-[500px]">
        {filteredSellers.length > 0 ? (
          filteredSellers.map((seller) => (
            <div
              key={seller.id}
              className="p-2 tablet-lg:p-3 hover:bg-gray-50 transition-colors duration-150 rounded-lg border border-gray-100"
            >
              <div className="flex items-start">
                <div className="relative">
                  <div className="h-8 tablet-lg:h-10 w-8 tablet-lg:w-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-green-700 font-medium text-xs tablet-lg:text-sm">
                      {seller.avatar}
                    </span>
                  </div>
                  {seller.status === "Online" && (
                    <div className="absolute bottom-0 right-0 h-2 tablet-lg:h-2.5 w-2 tablet-lg:w-2.5 bg-green-500 rounded-full border border-white"></div>
                  )}
                </div>
                <div className="ml-2 tablet-lg:ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs tablet-lg:text-sm font-medium text-gray-900 flex items-center">
                      {seller.name}
                    </h3>
                    <div className="text-[10px] tablet-lg:text-xs text-amber-600 font-medium flex items-center">
                      ★ {seller.rating}
                    </div>
                  </div>
                  <p className="text-[10px] tablet-lg:text-xs text-gray-500 mt-0.5 tablet-lg:mt-1">
                    {seller.location}
                  </p>
                  <p className="text-[10px] tablet-lg:text-xs text-gray-400 mt-0.5 tablet-lg:mt-1">
                    {seller.status === "Online"
                      ? "Online now"
                      : `Last seen ${seller.lastSeen}`}
                  </p>
                  <button
                    className="mt-1 tablet-lg:mt-2 w-full text-[10px] tablet-lg:text-xs bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg py-1 tablet-lg:py-1.5 hover:from-green-700 hover:to-green-800 transition-all duration-200"
                    onClick={() => startConversation(seller)}
                  >
                    Start Conversation
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 tablet-lg:p-4 text-center text-gray-500 text-xs tablet-lg:text-sm col-span-full">
            No sellers found
          </div>
        )}
      </div>
    </div>
  );

  // second section with the most outer border

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm h-auto tablet-lg:h-[600px] font-poppins">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 tablet-lg:py-4 text-center text-xs tablet-lg:text-sm font-medium ${
            viewMode === "chats"
              ? "text-green-700 border-b-2 border-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setViewMode("chats");
            if (isMobile) {
              setShowContactsList(true);
            }
          }}
        >
          My Conversations
        </button>
        <button
          className={`flex-1 py-2 tablet-lg:py-4 text-center text-xs tablet-lg:text-sm font-medium ${
            viewMode === "sellers"
              ? "text-green-700 border-b-2 border-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => {
            setViewMode("sellers");
            setActiveContact(null);
          }}
        >
          All Sellers
        </button>
      </div>
      {viewMode === "chats" ? (
        <div className="flex tablet-lg:flex-row">
          {renderContactList()}
          {renderChatView()}
        </div>
      ) : (
        renderSellersList()
      )}
    </div>
  );
}
