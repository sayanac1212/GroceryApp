import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const [isStarted, setIsStarted] = useState(false);
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [role, setRole] = useState('Customer'); // 'Customer' or 'Admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserRole } = useContext(AppContext);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setUserRole(role);
    navigation.replace('MainApp');
  };

  if (!isStarted) {
    return (
      <View style={styles.container}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500' }} 
          style={styles.heroImage} 
        />
        <Text style={styles.shopTitle}>Grocery Shop</Text>
        <Text style={styles.shopSubtitle}>The easiest way to buy your grocery shopping</Text>
        <TouchableOpacity style={styles.mainBtn} onPress={() => setIsStarted(true)}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</Text>
      
      <View style={styles.roleRow}>
        <TouchableOpacity 
          style={[styles.roleTab, role === 'Customer' && styles.activeRole]} 
          onPress={() => setRole('Customer')}
        >
          <Text style={[styles.roleText, role === 'Customer' && styles.activeRoleText]}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.roleTab, role === 'Admin' && styles.activeRole]} 
          onPress={() => setRole('Admin')}
        >
          <Text style={[styles.roleText, role === 'Admin' && styles.activeRoleText]}>Admin</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {mode === 'signin' ? (
        <TouchableOpacity style={styles.mainBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Sign In as {role}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.mainBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Sign Up New Account</Text>
        </TouchableOpacity>
      )}

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>
          {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
        </Text>
        <TouchableOpacity onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
          <Text style={styles.switchLink}>{mode === 'signin' ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E4ECDB', alignItems: 'center', justifyContent: 'center', padding: 20 },
  heroImage: { width: 280, height: 320, resizeMode: 'contain', marginBottom: 30 },
  shopTitle: { fontSize: 28, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
  shopSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 40 },
  formContainer: { flex: 1, backgroundColor: '#E4ECDB', justifyContent: 'center', padding: 25 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2C3E50', marginBottom: 20, textAlign: 'center' },
  roleRow: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#d5dfcc', borderRadius: 8, padding: 4 },
  roleTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  activeRole: { backgroundColor: '#fff', elevation: 2 },
  roleText: { color: '#666', fontWeight: '600' },
  activeRoleText: { color: '#2C3E50', fontWeight: 'bold' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d0dcd0', padding: 14, borderRadius: 10, marginBottom: 15 },
  mainBtn: { backgroundColor: '#D4C365', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10, elevation: 2 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  switchText: { color: '#666' },
  switchLink: { color: '#2C3E50', fontWeight: 'bold' }
});