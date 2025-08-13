import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export function ProfileScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Icon name="user" size={32} color="#22c55e" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{state.user?.name}</Text>
            <Text style={styles.email}>{state.user?.email}</Text>
            <Text style={styles.phone}>{state.user?.phone}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>₹2,450</Text>
            <Text style={styles.statLabel}>Total Savings</Text>
          </View>
        </View>
      </View>

      {/* Addresses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="map-pin" size={20} color="#22c55e" />
            <Text style={styles.sectionTitle}>Saved Addresses</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.addButton}>Add New</Text>
          </TouchableOpacity>
        </View>
        
        {state.user?.addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
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
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => navigation.navigate('Orders' as never)}
        >
          <Icon name="package" size={20} color="#666" />
          <Text style={styles.actionText}>My Orders</Text>
          <Icon name="chevron-right" size={16} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Icon name="settings" size={20} color="#666" />
          <Text style={styles.actionText}>Settings</Text>
          <Icon name="chevron-right" size={16} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Icon name="help-circle" size={20} color="#666" />
          <Text style={styles.actionText}>Help & Support</Text>
          <Icon name="chevron-right" size={16} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionItem, styles.logoutItem]}
          onPress={handleLogout}
        >
          <Icon name="log-out" size={20} color="#ef4444" />
          <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
          <Icon name="chevron-right" size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* Customer Support */}
      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>Need Help?</Text>
        <Text style={styles.supportText}>
          Our customer support team is available 24/7 to help you.
        </Text>
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginLeft: 8,
  },
  addButton: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '600',
  },
  addressCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 12,
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
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#ef4444',
  },
  supportSection: {
    backgroundColor: '#dcfce7',
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});