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

export function ProductsScreen() {
  const { state } = useApp();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (state.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.category.includes(state.searchQuery)
      );
    }

    if (state.selectedCategory) {
      filtered = filtered.filter(product => product.category === state.selectedCategory);
    }

    return filtered;
  }, [state.searchQuery, state.selectedCategory]);

  const renderProduct = ({ item }: { item: any }) => {
    const cartItem = state.cart.find(cartItem => cartItem.id === item.id);
    return <ProductCard product={item} cartItem={cartItem} />;
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>Try adjusting your search terms</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {state.searchQuery ? `Search results for "${state.searchQuery}"` : 'All Products'}
        </Text>
        <Text style={styles.count}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={filteredProducts}
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
    fontSize: 24,
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