import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { products, addToCart, favorites, toggleFavorite, userRole } = useContext(AppContext);
  const [qty, setQty] = useState(1);

  const isFavorite = favorites.some((item) => item.id === product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  // If user is Admin, restrict access as per requirements
  if (userRole !== 'Customer') {
    return (
      <View style={styles.restrictedContainer}>
        <View style={styles.restrictedCard}>
          <Text style={styles.restrictedTitle}>Access Restricted</Text>
          <Text style={styles.restrictedText}>The Product Details screen is exclusively for Customer accounts.</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Top Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
          <TouchableOpacity style={styles.iconCircle} onPress={() => toggleFavorite(product)}>
            <Text style={{ fontSize: 18 }}>{isFavorite ? '❤️' : '♡'}</Text>
          </TouchableOpacity>
        </View>

        {/* Product Image & Dots */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.dotsRow}>
            <View style={styles.dotInactive} />
            <View style={styles.dotActive} />
            <View style={styles.dotInactive} />
          </View>
        </View>

        {/* Details Content Box */}
        <View style={styles.detailsCard}>
          <View style={styles.titleQtyRow}>
            <View>
              <Text style={styles.title}>Fresh {product.name}</Text>
              <Text style={styles.rating}>★★★★★</Text>
            </View>
            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{qty}kg</Text>
              <TouchableOpacity onPress={() => setQty(qty + 1)}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.desc}>
            {product.name} is a very good fruit for body health and extra vitamin and extra energy for body. This is a increase of body for baby and boys..... <Text style={styles.seeMore}>See more</Text>
          </Text>

          <Text style={styles.sectionTitle}>Related Items</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedRow}>
            {relatedProducts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.relatedCard}
                onPress={() => navigation.push('ProductDetails', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.relatedImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Footer Bar */}
      <View style={styles.footerBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>{product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addCartBtn} onPress={() => addToCart(product, qty)}>
          <Text style={styles.addCartText}>Add to Cart &gt;&gt;&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#E4ECDB' },
  scrollContainer: { paddingBottom: 100, paddingTop: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 },
  iconCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  iconText: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
  imageContainer: { alignItems: 'center', marginVertical: 10 },
  image: { width: 220, height: 200, resizeMode: 'contain' },
  dotsRow: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  dotActive: { width: 18, height: 6, borderRadius: 3, backgroundColor: '#E2C753', marginHorizontal: 3 },
  dotInactive: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D5DFCC', marginHorizontal: 3 },
  detailsCard: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, marginTop: 15, elevation: 4 },
  titleQtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4 },
  rating: { color: '#F39C12', fontSize: 14, letterSpacing: 2 },
  qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F6ED', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 },
  qtyBtnText: { fontSize: 16, fontWeight: 'bold', color: '#D4C365', paddingHorizontal: 6 },
  qtyText: { fontSize: 14, fontWeight: 'bold', color: '#2C3E50', marginHorizontal: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginTop: 15, marginBottom: 8 },
  desc: { color: '#666', fontSize: 13, lineHeight: 18, marginBottom: 10 },
  seeMore: { color: '#E2C753', fontWeight: 'bold' },
  relatedRow: { flexDirection: 'row', marginTop: 5 },
  relatedCard: { width: 70, height: 70, backgroundColor: '#F9FBF7', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#EBEFF3' },
  relatedImage: { width: 50, height: 50, resizeMode: 'contain' },
  footerBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFDD0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  priceLabel: { fontSize: 12, color: '#888' },
  priceValue: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  addCartBtn: { backgroundColor: '#E2C753', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 16 },
  addCartText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  restrictedContainer: { flex: 1, backgroundColor: '#E4ECDB', justifyContent: 'center', alignItems: 'center', padding: 20 },
  restrictedCard: { backgroundColor: '#fff', width: '100%', padding: 25, borderRadius: 20, alignItems: 'center', elevation: 4 },
  restrictedTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
  restrictedText: { color: '#666', textAlign: 'center', marginBottom: 20, fontSize: 14 },
  backBtn: { backgroundColor: '#D4C365', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 10 },
  backBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});