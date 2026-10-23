import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function FavoritesScreen() {
  const { favorites, addToCart, toggleFavorite } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Favourite Items</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text style={styles.empty}>No favorite items added yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cartBtn} onPress={() => addToCart(item)}>
                <Text style={styles.actionText}>+ Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.remBtn} onPress={() => toggleFavorite(item)}>
                <Text style={styles.remText}>Remove</Text>
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
  row: { justifyContent: 'space-between' },
  card: { backgroundColor: '#fff', width: '48%', borderRadius: 12, padding: 12, marginBottom: 15, elevation: 2 },
  productImage: { width: '100%', height: 110, resizeMode: 'contain', marginBottom: 8 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { color: '#666', fontSize: 13, marginVertical: 4 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  cartBtn: { backgroundColor: '#D4C365', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  actionText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  remBtn: { backgroundColor: '#e74c3c', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  remText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: '#888', fontSize: 16 }
});