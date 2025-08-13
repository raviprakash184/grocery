import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export function Header() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation();
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <View style={styles.logo}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoText}>Z</Text>
              </View>
              <Text style={styles.logoName}>epto</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.location}>
            <Icon name="map-pin" size={16} color="#666" />
            <Text style={styles.locationText}>New Delhi 110001</Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart' as never)}
          >
            <Icon name="shopping-cart" size={24} color="#666" />
            {cartItemsCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products, brands and more"
            value={state.searchQuery}
            onChangeText={(text) => dispatch({ type: 'SET_SEARCH_QUERY', payload: text })}
            onSubmitEditing={() => navigation.navigate('Search' as never)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    backgroundColor: '#22c55e',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#22c55e',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});