import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function SearchScreen() {
  const { state } = useApp();

  const searchResults = useMemo(() => {
    if (!state.searchQuery.trim()) return [];
    
    return products.filter(product =>
      product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.searchQuery]);

  const renderProduct = ({ item }: { item: any }) => {
    const cartItem = state.cart.find(cartItem => cartItem.id === item.id);
    return <ProductCard product={item} cartItem={cartItem} />;
  };

  const renderEmpty = () => {
    if (!state.searchQuery.trim()) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Enter a search term to find products</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No products found</Text>
        <Text style={styles.emptySubtitle}>Try searching with different keywords</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {state.searchQuery.trim() && (
        <View style={styles.header}>
          <Text style={styles.title}>Search results for "{state.searchQuery}"</Text>
          <Text style={styles.count}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
          </Text>
        </View>
      )}

      <FlatList
        data={searchResults}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#ccc',
  },
});