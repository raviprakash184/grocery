import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { state } = useApp();

  const category = categories.find(c => c.id === categoryId);
  const categoryProducts = products.filter(product => product.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={category.image}
              alt={category.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600">{categoryProducts.length} products available</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No products available in this category</div>
            <p className="text-gray-400 mt-2">Check back later for new arrivals</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => {
              const cartItem = state.cart.find(item => item.id === product.id);
              return (
                <ProductCard key={product.id} product={product} cartItem={cartItem} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}