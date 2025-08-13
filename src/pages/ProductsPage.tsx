import React, { useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function ProductsPage() {
  const { state } = useApp();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (state.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.category.includes(state.searchQuery)
      );
    }

    if (state.selectedCategory) {
      filtered = filtered.filter(product => product.category === state.selectedCategory);
    }

    return filtered;
  }, [state.searchQuery, state.selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {state.searchQuery ? `Search results for "${state.searchQuery}"` : 'All Products'}
          </h1>
          <div className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No products found</div>
            <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
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