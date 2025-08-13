import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export function CartScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 25;
  const total = subtotal + deliveryFee;

  if (state.cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-bag" size={80} color="#d1d5db" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add some products to get started</Text>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('Home' as never)}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {state.cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemUnit}>{item.unit}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
            <View style={styles.itemActions}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  style={styles.quantityButton}
                >
                  <Icon name="minus" size={16} color="#666" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Icon name="plus" size={16} color="#666" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                style={styles.removeButton}
              >
                <Icon name="trash-2" size={18} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{subtotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery fee</Text>
          <Text style={styles.summaryValue}>
            {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
          </Text>
        </View>
        {deliveryFee > 0 && (
          <Text style={styles.freeDeliveryText}>
            Add ₹{500 - subtotal} more for free delivery
          </Text>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout' as never)}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  itemUnit: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  itemActions: {
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  quantityButton: {
    padding: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  summary: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#111',
  },
  freeDeliveryText: {
    fontSize: 12,
    color: '#22c55e',
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  checkoutButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueShoppingText: {
    color: '#22c55e',
    fontSize: 14,
    textAlign: 'center',
  },
});