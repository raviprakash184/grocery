import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export function CheckoutScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState(state.user?.addresses[0]?.id || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00-11:00 AM');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 25;
  const total = subtotal + deliveryFee;

  const timeSlots = [
    '10:00-11:00 AM',
    '11:00-12:00 PM',
    '12:00-1:00 PM',
    '2:00-3:00 PM',
    '3:00-4:00 PM',
    '4:00-5:00 PM',
    '5:00-6:00 PM'
  ];

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed!',
      'Your order has been placed successfully and will be delivered within 10-15 minutes.',
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch({ type: 'CLEAR_CART' });
            navigation.navigate('Orders' as never);
          }
        }
      ]
    );
  };

  if (state.cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No items in cart</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.emptyLink}>Go back to shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="map-pin" size={20} color="#22c55e" />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>
          {state.user?.addresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              style={[
                styles.addressOption,
                selectedAddress === address.id && styles.selectedOption
              ]}
              onPress={() => setSelectedAddress(address.id)}
            >
              <View style={styles.addressHeader}>
                <Text style={styles.addressType}>{address.type}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>
              <Text style={styles.addressText}>{address.address}</Text>
              {address.landmark && (
                <Text style={styles.landmarkText}>Near {address.landmark}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Delivery Time */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="clock" size={20} color="#22c55e" />
            <Text style={styles.sectionTitle}>Delivery Time</Text>
          </View>
          <View style={styles.timeSlots}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeSlot,
                  selectedTimeSlot === slot && styles.selectedTimeSlot
                ]}
                onPress={() => setSelectedTimeSlot(slot)}
              >
                <Text style={[
                  styles.timeSlotText,
                  selectedTimeSlot === slot && styles.selectedTimeSlotText
                ]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="credit-card" size={20} color="#22c55e" />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cod' && styles.selectedOption
            ]}
            onPress={() => setPaymentMethod('cod')}
          >
            <Text style={styles.paymentTitle}>Cash on Delivery</Text>
            <Text style={styles.paymentSubtitle}>Pay when your order arrives</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'online' && styles.selectedOption
            ]}
            onPress={() => setPaymentMethod('online')}
          >
            <Text style={styles.paymentTitle}>Online Payment</Text>
            <Text style={styles.paymentSubtitle}>UPI, Cards, Net Banking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Order Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        
        <View style={styles.cartItems}>
          {state.cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name} x {item.quantity}</Text>
              <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
        </View>
        
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
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
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
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  emptyLink: {
    color: '#22c55e',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginLeft: 8,
  },
  addressOption: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: '#22c55e',
    backgroundColor: '#dcfce7',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textTransform: 'capitalize',
  },
  defaultBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  landmarkText: {
    fontSize: 12,
    color: '#999',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    borderColor: '#22c55e',
    backgroundColor: '#dcfce7',
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  selectedTimeSlotText: {
    color: '#16a34a',
  },
  paymentOption: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 12,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 12,
  },
  cartItems: {
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  itemPrice: {
    fontSize: 12,
    color: '#111',
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
  placeOrderButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});