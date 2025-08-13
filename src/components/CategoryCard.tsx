import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Category' as never, { categoryId: category.id } as never);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: category.image }} style={styles.image} />
        <View style={styles.overlay} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{category.name}</Text>
        <Text style={styles.productCount}>{category.productCount} products</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
    overflow: 'hidden',
    width: 140,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 10,
    color: '#666',
  },
});