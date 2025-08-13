import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { categories, products } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function HomeScreen() {
  const { state } = useApp();
  const navigation = useNavigation();
  
  const featuredProducts = products.slice(0, 6);
  const featuredCategories = categories.slice(0, 8);

  const renderProduct = ({ item }: { item: any }) => {
    const cartItem = state.cart.find(cartItem => cartItem.id === item.id);
    return <ProductCard product={item} cartItem={cartItem} />;
  };

  const renderCategory = ({ item }: { item: any }) => (
    <CategoryCard category={item} />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Groceries delivered in{'\n'}
          <Text style={styles.heroHighlight}>10 minutes</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Get fresh groceries & daily essentials delivered to your doorstep
        </Text>
        
        <View style={styles.features}>
          <View style={styles.feature}>
            <Icon name="clock" size={16} color="#fff" />
            <Text style={styles.featureText}>10 min delivery</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="truck" size={16} color="#fff" />
            <Text style={styles.featureText}>Free delivery</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="shield" size={16} color="#fff" />
            <Text style={styles.featureText}>Quality assured</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('Products' as never)}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
          <Icon name="arrow-right" size={16} color="#22c55e" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories' as never)}>
            <View style={styles.viewAll}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="arrow-right" size={14} color="#22c55e" />
            </View>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={featuredCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products' as never)}>
            <View style={styles.viewAll}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="arrow-right" size={14} color="#22c55e" />
            </View>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={featuredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.productsList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  hero: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroHighlight: {
    color: '#fbbf24',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  featureText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 6,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  section: {
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  categoriesList: {
    paddingLeft: 12,
  },
  productsList: {
    paddingHorizontal: 12,
  },
});