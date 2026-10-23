import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function CartScreen() {
  const { cart, updateCartQty } = useContext(AppContext);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return sum + numericPrice * item.qty;
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Cart</Text>
      
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.unit}>Fresh quality</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => updateCartQty(item.id, 1)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{item.qty}</Text>
              <TouchableOpacity onPress={() => updateCartQty(item.id, -1)}>
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>Rs {calculateTotal().toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.bookBtn} onPress={() => Alert.alert('Success', 'Order placed successfully!')}>
            <Text style={styles.bookBtnText}>Book Now &gt;&gt;&gt;</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E4ECDB', paddingHorizontal: 15, paddingTop: 40 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  thumbnail: { width: 55, height: 55, resizeMode: 'contain', marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  unit: { fontSize: 12, color: '#888', marginVertical: 2 },
  price: { color: '#2C3E50', fontWeight: 'bold', fontSize: 13 },
  qtyContainer: { alignItems: 'center', paddingHorizontal: 8 },
  qtyBtn: { fontSize: 18, fontWeight: 'bold', color: '#D4C365', paddingHorizontal: 6 },
  qtyNum: { fontSize: 15, fontWeight: 'bold', marginVertical: 2 },
  empty: { textAlign: 'center', marginTop: 50, color: '#888', fontSize: 16 },
  footer: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 10, elevation: 4 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  bookBtn: { backgroundColor: '#D4C365', padding: 15, borderRadius: 10, alignItems: 'center' },
  bookBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});