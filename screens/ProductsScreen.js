import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function ProductsScreen({ navigation }) {
  const { products, addToCart, toggleFavorite } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('Fruits');

  const filteredProducts = products.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Daily Grocery Food</Text>
      
      {/* Category Filter Pills */}
      <View style={styles.categoryRow}>
        <TouchableOpacity 
          style={[styles.pill, selectedCategory === 'Fruits' && styles.activePill]}
          onPress={() => setSelectedCategory('Fruits')}
        >
          <Text style={[styles.pillText, selectedCategory === 'Fruits' && styles.activePillText]}>Fruits</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.pill, selectedCategory === 'Vegetables' && styles.activePill]}
          onPress={() => setSelectedCategory('Vegetables')}
        >
          <Text style={[styles.pillText, selectedCategory === 'Vegetables' && styles.activePillText]}>Vegetables</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeading}>Found more {selectedCategory.toLowerCase()} !</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cartBtn} onPress={() => addToCart(item)}>
                <Text style={styles.actionText}>+ Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(item)}>
                <Text style={styles.favText}>❤️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E4ECDB', paddingHorizontal: 15, paddingTop: 40 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  categoryRow: { flexDirection: 'row', marginBottom: 15 },
  pill: { backgroundColor: '#d5dfcc', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, marginRight: 10 },
  activePill: { backgroundColor: '#D4C365' },
  pillText: { color: '#666', fontWeight: 'bold' },
  activePillText: { color: '#fff' },
  subHeading: { fontSize: 14, color: '#555', marginBottom: 15, fontWeight: '600' },
  row: { justifyContent: 'space-between' },
  card: { backgroundColor: '#fff', width: '48%', borderRadius: 12, padding: 12, marginBottom: 15, elevation: 2 },
  productImage: { width: '100%', height: 110, resizeMode: 'contain', marginBottom: 8 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { color: '#666', fontSize: 13, marginVertical: 4 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  cartBtn: { backgroundColor: '#D4C365', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  actionText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  favBtn: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 }
});