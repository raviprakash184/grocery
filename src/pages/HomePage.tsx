import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Truck, Shield, ArrowRight } from 'lucide-react';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { categories, products } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function HomePage() {
  const { state } = useApp();
  
  const featuredProducts = products.slice(0, 6);
  const featuredCategories = categories.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Groceries delivered in <span className="text-yellow-300">10 minutes</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Get fresh groceries & daily essentials delivered to your doorstep
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <Clock className="h-5 w-5" />
                <span>10 min delivery</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <Truck className="h-5 w-5" />
                <span>Free delivery</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <Shield className="h-5 w-5" />
                <span>Quality assured</span>
              </div>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link
              to="/categories"
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const cartItem = state.cart.find(item => item.id === product.id);
              return (
                <ProductCard key={product.id} product={product} cartItem={cartItem} />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}