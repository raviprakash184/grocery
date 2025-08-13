import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}% OFF</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.unit}>{product.unit}</Text>
        
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="#fbbf24" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
          </View>

          {cartItem ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleUpdateQuantity(cartItem.quantity - 1)}
                style={styles.quantityButton}
              >
                <Icon name="minus" size={16} color="#22c55e" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{cartItem.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleUpdateQuantity(cartItem.quantity + 1)}
                style={styles.quantityButton}
              >
                <Icon name="plus" size={16} color="#22c55e" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleAddToCart}
              disabled={!product.inStock}
              style={[styles.addButton, !product.inStock && styles.disabledButton]}
            >
              <Icon name="plus" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>

        {!product.inStock && (
          <Text style={styles.outOfStock}>Out of stock</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  unit: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    padding: 4,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    marginHorizontal: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  outOfStock: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 8,
  },
});