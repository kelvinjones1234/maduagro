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
