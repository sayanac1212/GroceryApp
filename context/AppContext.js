import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRoleState] = useState('Customer'); // 'Admin' or 'Customer'
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Safely clear only the cart array
  const clearCart = () => {
    setCart([]);
  };

  // Custom setter to automatically clear cart when role changes
  const setUserRole = (newRole) => {
    if (newRole !== userRole) {
      clearCart(); // Clears only cart, preserving favorites & products
    }
    setUserRoleState(newRole);
  };

  const products = [
    { id: '1', name: 'Banana', price: 'Rs 50/kg', category: 'Fruits', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300' },
    { id: '2', name: 'Pineapple', price: 'Rs 120/kg', category: 'Fruits', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300' },
    { id: '3', name: 'Tomato', price: 'Rs 220/kg', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300' },
    { id: '4', name: 'Capsicum', price: 'Rs 100/kg', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300' },
    { id: '5', name: 'Orange', price: 'Rs 70/kg', category: 'Fruits', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=300' },
    { id: '6', name: 'Lemon', price: 'Rs 80/kg', category: 'Fruits', image: 'https://images.unsplash.com/photo-1521997888043-aa9c827744f8?w=300' },
    { id: '7', name: 'Cabbage', price: 'Rs 300/kg', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=300' },
    { id: '8', name: 'Carrot', price: 'Rs 60/kg', category: 'Vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300' },
  ];

  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, { ...product, qty }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        products,
        cart,
        addToCart,
        updateCartQty,
        clearCart,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};