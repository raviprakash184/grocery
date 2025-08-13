import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-200" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h3>
        <p className="text-xs text-gray-600">{category.productCount} products</p>
      </div>
    </Link>
  );
}