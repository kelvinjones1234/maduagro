export const products = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Fresh Produce",
    quantity: "500 kg",
    price: "₦800/kg",
    status: "available",
    color: "green",
    views: 245,
    rating: 4.8,
    image: "/placeholder/tomatoes.jpg",
    description: "Fresh organic tomatoes harvested from local farms",
  },
  {
    id: 2,
    name: "Maize",
    category: "Grain",
    quantity: "1200 kg",
    price: "₦350/kg",
    status: "available",
    color: "yellow",
    views: 189,
    rating: 4.5,
    image: "/placeholder/maize.jpg",
    description: "High-quality maize from northern Nigeria",
  },
  {
    id: 3,
    name: "Peppers",
    category: "Fresh Produce",
    quantity: "350 kg",
    price: "₦1,200/kg",
    status: "low",
    color: "red",
    warning: true,
    views: 312,
    rating: 4.7,
    image: "/placeholder/peppers.jpg",
    description: "Spicy fresh peppers perfect for soups and stews",
  },
  {
    id: 4,
    name: "Yams",
    category: "Tuber",
    quantity: "800 kg",
    price: "₦450/kg",
    status: "available",
    color: "purple",
    views: 208,
    rating: 4.6,
    image: "/placeholder/yams.jpg",
    description: "Premium yams from Benue state",
  },
];

export const orders = [
  {
    id: "ORD-4591",
    customer: "Praise Godwin",
    products: "200kg of Tomatoes",
    date: "Apr 20, 2025",
    amount: "₦160,000",
    status: "Processing",
    location: "Lagos",
    estimatedDelivery: "Apr 22, 2025",
  },
  {
    id: "ORD-4590",
    customer: "Fatima Ibrahim",
    products: "50kg of Peppers, 100kg of Yams",
    date: "Apr 19, 2025",
    amount: "₦105,000",
    status: "In Transit",
    location: "Abuja",
    estimatedDelivery: "Apr 21, 2025",
  },
  {
    id: "ORD-4587",
    customer: "Chidi Okonkwo",
    products: "300kg of Maize",
    date: "Apr 18, 2025",
    amount: "₦105,000",
    status: "Delivered",
    location: "Enugu",
    estimatedDelivery: "Apr 20, 2025",
  },
];



export const messages = [
  {
    id: 1,
    sender: "Praise Godwin",
    content: "When will my tomatoes order be delivered?",
    time: "Today, 11:30 AM",
    read: false,
    avatar: "/placeholder/avatar1.jpg",
  },
  {
    id: 2,
    sender: "Fatima Ibrahim",
    content: "Are the peppers still available for order?",
    time: "Yesterday, 3:45 PM",
    read: true,
    avatar: "/placeholder/avatar2.jpg",
  },
  {
    id: 3,
    sender: "Chidi Okonkwo",
    content: "Thank you for the prompt delivery!",
    time: "Apr 18, 4:20 PM",
    read: true,
    avatar: "/placeholder/avatar3.jpg",
  },
];

export const priceData = [
  { month: "Apr", price: 60 },
  { month: "May", price: 80 },
  { month: "Jun", price: 40 },
  { month: "Jul", price: 75 },
  { month: "Aug", price: 100 },
];

export const activities = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    description: "200kg of Tomatoes from Praise Godwin",
    time: "Today, 10:24 AM",
  },
  {
    id: 2,
    type: "price",
    title: "Price alert",
    description: "Maize prices increased by 8% in Lagos market",
    time: "Yesterday, 4:30 PM",
  },
  {
    id: 3,
    type: "storage",
    title: "Storage update",
    description: "Warehouse humidity levels optimal",
    time: "Yesterday, 9:15 AM",
  },
  {
    id: 4,
    type: "message",
    title: "New message",
    description: "Praise Godwin asked about order delivery",
    time: "Today, 11:30 AM",
  },
  {
    id: 5,
    type: "message",
    title: "New message",
    description: "Praise Godwin asked about order delivery",
    time: "Today, 11:30 AM",
  },
  {
    id: 6,
    type: "message",
    title: "New message",
    description: "Praise Godwin asked about order delivery",
    time: "Today, 11:30 AM",
  },
];

export const productComments = [
  {
    id: 1,
    product: "Tomatoes",
    user: "Blessing Adewale",
    comment: "Excellent quality tomatoes, will order again!",
    rating: 5,
    date: "Apr 15, 2025",
  },
  {
    id: 2,
    product: "Peppers",
    user: "Mohammed Sani",
    comment: "Very fresh and spicy, just as described",
    rating: 4,
    date: "Apr 14, 2025",
  },
  {
    id: 3,
    product: "Yams",
    user: "Ngozi Okafor",
    comment: "Good quality but delivery was delayed",
    rating: 3,
    date: "Apr 10, 2025",
  },
];

export const productOffers = [
  {
    id: 1,
    name: "Maize",
    category: "Grains",
    quantity: "500 kg",
    price: "₦200/kg",
    location: "Benue, Nigeria",
    status: "Available",
  },
  {
    id: 2,
    name: "Tomatoes",
    category: "Vegetables",
    quantity: "200 crates",
    price: "₦800/crate",
    location: "Kano, Nigeria",
    status: "Pending",
  },
];

// for buyer messages tab

export const initialContacts = [
  {
    id: 1,
    name: "John's Organic Farm",
    unread: 2,
    avatar: "J",
    verified: true,
    rating: 4.9,
    location: "Seattle, WA",
    lastSeen: "today at 11:30 AM",
    status: "Online",
  },
  {
    id: 2,
    name: "Fresh Harvest Co-op",
    unread: 0,
    avatar: "F",
    verified: true,
    rating: 4.7,
    location: "Portland, OR",
    lastSeen: "yesterday at 4:45 PM",
    status: "Offline",
  },
  {
    id: 3,
    name: "Green Valley Produce",
    unread: 1,
    avatar: "G",
    verified: false,
    rating: 4.5,
    location: "Eugene, OR",
    lastSeen: "today at 9:15 AM",
    status: "Online",
  },
  {
    id: 4,
    name: "City Greenhouse",
    unread: 0,
    avatar: "C",
    verified: true,
    rating: 4.8,
    location: "Tacoma, WA",
    lastSeen: "2 hours ago",
    status: "Online",
  },
  {
    id: 5,
    name: "Riverside Gardens",
    unread: 3,
    avatar: "R",
    verified: false,
    rating: 4.3,
    location: "Vancouver, WA",
    lastSeen: "5 minutes ago",
    status: "Online",
  },
];

// Additional sellers on the platform
export const allSellers = [
  ...initialContacts,
  {
    id: 6,
    name: "Hilltop Orchard",
    unread: 0,
    avatar: "H",
    verified: true,
    rating: 4.6,
    location: "Bend, OR",
    lastSeen: "1 day ago",
    status: "Offline",
  },
  {
    id: 7,
    name: "Mountain View Farm",
    unread: 0,
    avatar: "M",
    verified: true,
    rating: 4.9,
    location: "Spokane, WA",
    lastSeen: "today at 2:20 PM",
    status: "Online",
  },
  {
    id: 8,
    name: "Sunset Gardens",
    unread: 0,
    avatar: "S",
    verified: false,
    rating: 4.4,
    location: "Olympia, WA",
    lastSeen: "30 minutes ago",
    status: "Online",
  },
  {
    id: 9,
    name: "Valley Blooms",
    unread: 0,
    avatar: "V",
    verified: true,
    rating: 4.7,
    location: "Salem, OR",
    lastSeen: "today at 10:45 AM",
    status: "Online",
  },
  {
    id: 10,
    name: "Pacific Crest Farms",
    unread: 0,
    avatar: "P",
    verified: true,
    rating: 4.8,
    location: "Medford, OR",
    lastSeen: "yesterday at 7:30 PM",
    status: "Offline",
  },
  {
    id: 11,
    name: "Pacific Crest Farms",
    unread: 0,
    avatar: "P",
    verified: true,
    rating: 4.8,
    location: "Medford, OR",
    lastSeen: "yesterday at 7:30 PM",
    status: "Offline",
  },
  {
    id: 12,
    name: "Pacific Crest Farms",
    unread: 0,
    avatar: "P",
    verified: true,
    rating: 4.8,
    location: "Medford, OR",
    lastSeen: "yesterday at 7:30 PM",
    status: "Offline",
  },
];

// Sample messages for each contact with timestamps

export const initialAllMessages = {
  1: [
    {
      id: 101,
      sender: "John's Organic Farm",
      recipient: "You",
      content: "Hi there! Do you need any seasonal vegetables this week?",
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      read: false,
      status: "delivered",
      replies: [],
    },
    {
      id: 102,
      sender: "You",
      recipient: "John's Organic Farm",
      content: "Yes, I'm looking for fresh tomatoes and cucumbers.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
      status: "read",
      replies: [
        {
          id: 103,
          sender: "John's Organic Farm",
          recipient: "You",
          content:
            "We have both in stock! Would you like me to put aside 2 pounds of each?",
          timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
          read: false,
          status: "delivered",
          replies: [],
        },
      ],
    },
  ],
  2: [
    {
      id: 201,
      sender: "Fresh Harvest Co-op",
      recipient: "You",
      content: "Thanks for your order! Your pickup will be ready tomorrow.",
      timestamp: new Date(Date.now() - 86400000), // yesterday
      read: true,
      status: "read",
      replies: [
        {
          id: 202,
          sender: "You",
          recipient: "Fresh Harvest Co-op",
          content: "Great, what time can I come by?",
          timestamp: new Date(Date.now() - 82800000), // 23 hours ago
          read: true,
          status: "read",
          replies: [
            {
              id: 203,
              sender: "Fresh Harvest Co-op",
              recipient: "You",
              content: "Anytime between 9am-5pm works for us!",
              timestamp: new Date(Date.now() - 81000000), // 22.5 hours ago
              read: true,
              status: "read",
              replies: [],
            },
          ],
        },
      ],
    },
  ],
  3: [
    {
      id: 301,
      sender: "Green Valley Produce",
      recipient: "You",
      content:
        "We just got a fresh shipment of berries. Would you be interested?",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: false,
      status: "delivered",
      replies: [],
    },
  ],
  4: [
    {
      id: 401,
      sender: "You",
      recipient: "City Greenhouse",
      content: "Do you have any herbs available?",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      read: true,
      status: "read",
      replies: [
        {
          id: 402,
          sender: "City Greenhouse",
          recipient: "You",
          content: "Yes, we have basil, mint, and rosemary currently.",
          timestamp: new Date(Date.now() - 259000000), // 3 days ago (few minutes later)
          read: true,
          status: "read",
          replies: [],
        },
      ],
    },
  ],
  5: [
    {
      id: 501,
      sender: "Riverside Gardens",
      recipient: "You",
      content: "Your order #RG-1234 is confirmed!",
      timestamp: new Date(Date.now() - 604800000), // 1 week ago
      read: false,
      status: "delivered",
      replies: [
        {
          id: 502,
          sender: "Riverside Gardens",
          recipient: "You",
          content: "We've added a complimentary pack of seeds to your order.",
          timestamp: new Date(Date.now() - 604500000), // 1 week ago (few hours later)
          read: false,
          status: "delivered",
          replies: [
            {
              id: 503,
              sender: "Riverside Gardens",
              recipient: "You",
              content:
                "Your order has been shipped and will arrive in 2-3 days.",
              timestamp: new Date(Date.now() - 432000000), // 5 days ago
              read: false,
              status: "delivered",
              replies: [],
            },
          ],
        },
      ],
    },
  ],
  6: [
    {
      id: 501,
      sender: "Riverside Gardens",
      recipient: "You",
      content: "Your order #RG-1234 is confirmed!",
      timestamp: new Date(Date.now() - 604800000), // 1 week ago
      read: false,
      status: "delivered",
      replies: [
        {
          id: 502,
          sender: "Riverside Gardens",
          recipient: "You",
          content: "We've added a complimentary pack of seeds to your order.",
          timestamp: new Date(Date.now() - 604500000), // 1 week ago (few hours later)
          read: false,
          status: "delivered",
          replies: [
            {
              id: 503,
              sender: "Riverside Gardens",
              recipient: "You",
              content:
                "Your order has been shipped and will arrive in 2-3 days.",
              timestamp: new Date(Date.now() - 432000000), // 5 days ago
              read: false,
              status: "delivered",
              replies: [],
            },
          ],
        },
      ],
    },
  ],
  7: [
    {
      id: 501,
      sender: "Riverside Gardens",
      recipient: "You",
      content: "Your order #RG-1234 is confirmed!",
      timestamp: new Date(Date.now() - 604800000), // 1 week ago
      read: false,
      status: "delivered",
      replies: [
        {
          id: 502,
          sender: "Riverside Gardens",
          recipient: "You",
          content: "We've added a complimentary pack of seeds to your order.",
          timestamp: new Date(Date.now() - 604500000), // 1 week ago (few hours later)
          read: false,
          status: "delivered",
          replies: [
            {
              id: 503,
              sender: "Riverside Gardens",
              recipient: "You",
              content:
                "Your order has been shipped and will arrive in 2-3 days.",
              timestamp: new Date(Date.now() - 432000000), // 5 days ago
              read: false,
              status: "delivered",
              replies: [],
            },
          ],
        },
      ],
    },
  ],
};
