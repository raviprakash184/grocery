import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../types';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

export function CategoryScreen() {
  const route = useRoute<CategoryScreenRouteProp>();
  const { categoryId } = route.params;
  const { state } = useApp();

  const category = categories.find(c => c.id === categoryId);
  const categoryProducts = products.filter(product => product.category === categoryId);

  const renderProduct = ({ item }: { item: any }) => {
    const cartItem = state.cart.find(cartItem => cartItem.id === item.id);
    return <ProductCard product={item} cartItem={cartItem} />;
  };

  if (!category) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Category not found</Text>
        <Text style={styles.errorSubtitle}>The category you're looking for doesn't exist.</Text>
      </View>
    );
  }

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No products available in this category</Text>
      <Text style={styles.emptySubtitle}>Check back later for new arrivals</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Category Header */}
      <View style={styles.header}>
        <Image source={{ uri: category.image }} style={styles.categoryImage} />
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.productCount}>{categoryProducts.length} products available</Text>
        </View>
      </View>

      {/* Products Grid */}
      <FlatList
        data={categoryProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsList}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 14,
    color: '#666',
  },
  productsList: {
    paddingHorizontal: 12,
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
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});