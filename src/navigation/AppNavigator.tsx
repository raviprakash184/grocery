import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { Header } from '../components/Header';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';

import { RootStackParamList } from '../types';
import { useApp } from '../context/AppContext';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { state } = useApp();
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Products') {
            iconName = 'grid';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else {
            iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        header: () => <Header />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen 
          name="Category" 
          component={CategoryScreen}
          options={{
            headerShown: true,
            headerTitle: 'Category',
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#111',
          }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen}
          options={{
            headerShown: true,
            headerTitle: 'Checkout',
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#111',
          }}
        />
        <Stack.Screen 
          name="Orders" 
          component={OrdersScreen}
          options={{
            headerShown: true,
            headerTitle: 'My Orders',
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#111',
          }}
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen}
          options={{
            headerShown: true,
            headerTitle: 'Search',
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#111',
          }}
        />
        <Stack.Screen 
          name="Categories" 
          component={CategoriesScreen}
          options={{
            headerShown: true,
            headerTitle: 'All Categories',
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#111',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}