import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function ProfileScreen() {
  const { userRole } = useContext(AppContext);

  // Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [phone, setPhone] = useState('+1 234 567 890');
  const [address, setAddress] = useState('123 Main Street, Apt 4B, New York');

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.roleBadge}>{userRole}</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          ) : (
            <Text style={styles.valueText}>{name}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.valueText}>{email}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone Number</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.valueText}>{phone}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Delivery Address</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={address}
              onChangeText={setAddress}
              multiline
            />
          ) : (
            <Text style={styles.valueText}>{address}</Text>
          )}
        </View>

        {isEditing ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E4ECDB', paddingHorizontal: 15, paddingTop: 40 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  profileCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 3, marginBottom: 30 },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D4C365',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  roleBadge: {
    alignSelf: 'center',
    backgroundColor: '#d5dfcc',
    color: '#2C3E50',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 20,
  },
  fieldContainer: { marginBottom: 15 },
  label: { fontSize: 12, color: '#888', fontWeight: 'bold', marginBottom: 4 },
  valueText: { fontSize: 16, color: '#2C3E50', fontWeight: '500', paddingVertical: 4 },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: '#333',
  },
  multilineInput: { height: 60, textAlignVertical: 'top' },
  editBtn: {
    backgroundColor: '#D4C365',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#D4C365',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonRow: { flexDirection: 'row', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  cancelBtnText: { color: '#555', fontWeight: 'bold', fontSize: 15 },
});