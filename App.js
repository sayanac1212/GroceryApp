import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, AppContext } from './context/AppContext';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  const { userRole } = useContext(AppContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#D4C365',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Products') {
            iconName = 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      {userRole === 'Customer' && <Tab.Screen name="Favorites" component={FavoritesScreen} />}
      {userRole === 'Customer' && <Tab.Screen name="Profile" component={ProfileScreen} />}
    </Tab.Navigator>
  );
}

// Logout handler screen inside Drawer
function LogoutScreen({ navigation }) {
  const { setUserRole } = useContext(AppContext);
  
  useEffect(() => {
    setUserRole('Customer'); // Reset role
    navigation.replace('Home');
  }, []);

  return null;
}

function DrawerNavigator() {
  const { userRole } = useContext(AppContext);
  
  return (
    <Drawer.Navigator screenOptions={{ drawerActiveTintColor: '#D4C365' }}>
      <Drawer.Screen name="HomeTabs" component={TabNavigator} options={{ title: 'Grocery Store' }} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      {userRole === 'Customer' && <Drawer.Screen name="Favorites" component={FavoritesScreen} />}
      {userRole === 'Customer' && <Drawer.Screen name="Profile" component={ProfileScreen} />}
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MainApp" component={DrawerNavigator} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: true, title: 'Product Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}