import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { CategoryCard } from '../components/CategoryCard';
import { categories } from '../data/mockData';

export function CategoriesScreen() {
  const renderCategory = ({ item }: { item: any }) => (
    <CategoryCard category={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  list: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});