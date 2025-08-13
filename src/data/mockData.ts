import { Product, Category, User, Address, Order } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Fruits & Vegetables', image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 120 },
  { id: '2', name: 'Dairy & Bakery', image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 85 },
  { id: '3', name: 'Snacks & Beverages', image: 'https://images.pexels.com/photos/33162/drink-coca-cola-coke-glass.jpg?auto=compress&cs=tinysrgb&w=400', productCount: 200 },
  { id: '4', name: 'Personal Care', image: 'https://images.pexels.com/photos/8129903/pexels-photo-8129903.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 150 },
  { id: '5', name: 'Household Items', image: 'https://images.pexels.com/photos/4239088/pexels-photo-4239088.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 95 },
  { id: '6', name: 'Baby Care', image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 75 },
  { id: '7', name: 'Meat & Fish', image: 'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400', productCount: 60 },
  { id: '8', name: 'Pharmacy', image: 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=400', productCount: 110 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Bananas',
    price: 40,
    originalPrice: 50,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '1',
    unit: '1 dozen',
    inStock: true,
    discount: 20,
    rating: 4.5,
    description: 'Fresh, ripe bananas perfect for snacking'
  },
  {
    id: '2',
    name: 'Organic Apples',
    price: 120,
    originalPrice: 150,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '1',
    unit: '1 kg',
    inStock: true,
    discount: 20,
    rating: 4.7,
    description: 'Crisp and sweet organic apples'
  },
  {
    id: '3',
    name: 'Fresh Milk',
    price: 28,
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '2',
    unit: '500ml',
    inStock: true,
    rating: 4.3,
    description: 'Pure and fresh full-cream milk'
  },
  {
    id: '4',
    name: 'Brown Bread',
    price: 35,
    originalPrice: 40,
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '2',
    unit: '400g',
    inStock: true,
    discount: 12.5,
    rating: 4.2,
    description: 'Healthy whole wheat brown bread'
  },
  {
    id: '5',
    name: 'Coca Cola',
    price: 40,
    image: 'https://images.pexels.com/photos/33162/drink-coca-cola-coke-glass.jpg?auto=compress&cs=tinysrgb&w=400',
    category: '3',
    unit: '750ml',
    inStock: true,
    rating: 4.1,
    description: 'Refreshing cola drink'
  },
  {
    id: '6',
    name: 'Mixed Vegetables',
    price: 80,
    originalPrice: 100,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '1',
    unit: '1 kg',
    inStock: true,
    discount: 20,
    rating: 4.4,
    description: 'Fresh seasonal mixed vegetables'
  },
  {
    id: '7',
    name: 'Greek Yogurt',
    price: 65,
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '2',
    unit: '200g',
    inStock: true,
    rating: 4.6,
    description: 'Creamy and healthy Greek yogurt'
  },
  {
    id: '8',
    name: 'Potato Chips',
    price: 20,
    originalPrice: 25,
    image: 'https://images.pexels.com/photos/461335/pexels-photo-461335.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '3',
    unit: '100g',
    inStock: true,
    discount: 20,
    rating: 4.0,
    description: 'Crispy and delicious potato chips'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 9876543210',
  addresses: [
    {
      id: '1',
      type: 'home',
      address: '123 Main Street, Apartment 4B, New Delhi - 110001',
      landmark: 'Near Metro Station',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      address: '456 Business Plaza, Office 12A, Gurgaon - 122001',
      landmark: 'Opposite City Mall',
      isDefault: false
    }
  ]
};

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    items: [products[0], products[1]],
    total: 160,
    status: 'delivered',
    deliveryAddress: mockUser.addresses[0],
    orderDate: '2024-01-15',
    deliveryTime: '10:30 AM'
  },
  {
    id: 'ORD002',
    items: [products[2], products[3]],
    total: 63,
    status: 'confirmed',
    deliveryAddress: mockUser.addresses[0],
    orderDate: '2024-01-16',
    deliveryTime: '2:00 PM'
  }
];