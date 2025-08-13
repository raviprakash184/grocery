import React from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { Product, CartItem } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
}

export function ProductCard({ product, cartItem }: ProductCardProps) {
  const { dispatch } = useApp();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: newQuantity }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.unit}</p>
        
        {product.rating && (
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          {cartItem ? (
            <div className="flex items-center space-x-2 bg-green-100 rounded-lg px-3 py-1">
              <button
                onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-semibold text-green-700 px-2">{cartItem.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add</span>
            </button>
          )}
        </div>

        {!product.inStock && (
          <p className="text-red-500 text-sm mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
}