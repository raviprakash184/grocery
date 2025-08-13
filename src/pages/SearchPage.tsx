import React, { useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function SearchPage() {
  const { state } = useApp();

  const searchResults = useMemo(() => {
    if (!state.searchQuery.trim()) return [];
    
    return products.filter(product =>
      product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.searchQuery]);

  if (!state.searchQuery.trim()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Products</h1>
          <div className="text-center py-12">
            <p className="text-gray-600">Enter a search term to find products</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Search results for "{state.searchQuery}"
          </h1>
          <div className="text-gray-600">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No products found</div>
            <p className="text-gray-400 mt-2">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => {
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