import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { mockOrders } from '../data/mockData';

export function OrdersScreen() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Icon name="check-circle" size={20} color="#22c55e" />;
      case 'confirmed':
        return <Icon name="clock" size={20} color="#3b82f6" />;
      case 'cancelled':
        return <Icon name="x-circle" size={20} color="#ef4444" />;
      default:
        return <Icon name="package" size={20} color="#6b7280" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'delivered':
        return { color: '#16a34a', backgroundColor: '#dcfce7' };
      case 'confirmed':
        return { color: '#2563eb', backgroundColor: '#dbeafe' };
      case 'cancelled':
        return { color: '#dc2626', backgroundColor: '#fee2e2' };
      default:
        return { color: '#4b5563', backgroundColor: '#f3f4f6' };
    }
  };

  if (mockOrders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="package" size={80} color="#d1d5db" />
        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptySubtitle}>Start shopping to see your orders here</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {mockOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View style={styles.orderStatus}>
              {getStatusIcon(order.status)}
              <View style={[styles.statusBadge, getStatusStyle(order.status)]}>
                <Text style={[styles.statusText, { color: getStatusStyle(order.status).color }]}>
                  {order.status}
                </Text>
              </View>
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={styles.orderDate}>
                {new Date(order.orderDate).toLocaleDateString()} at {order.deliveryTime}
              </Text>
            </View>
            <View style={styles.orderTotal}>
              <Text style={styles.totalAmount}>₹{order.total}</Text>
              <Text style={styles.itemCount}>{order.items.length} items</Text>
            </View>
          </View>

          <View style={styles.orderContent}>
            <View style={styles.itemsSection}>
              <Text style={styles.sectionTitle}>Items</Text>
              {order.items.slice(0, 2).map((item) => (
                <View key={item.id} style={styles.orderItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemUnit}>{item.unit}</Text>
                  </View>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
              ))}
              {order.items.length > 2 && (
                <Text style={styles.moreItems}>
                  +{order.items.length - 2} more items
                </Text>
              )}
            </View>

            <View style={styles.addressSection}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <Text style={styles.addressText}>{order.deliveryAddress.address}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingTop: 16,
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
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  orderTotal: {
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  itemCount: {
    fontSize: 12,
    color: '#666',
  },
  orderContent: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  itemsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
    marginBottom: 2,
  },
  itemUnit: {
    fontSize: 10,
    color: '#666',
  },
  itemPrice: {
    fontSize: 12,
    color: '#111',
  },
  moreItems: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  addressSection: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  addressText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});