import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing vector icons from Expo
import { supabase } from '@/src/lib/supabase';
import { router } from 'expo-router';

const ProfileScreen = () => {
  

  return (
    <View style={styles.container}>
      

      {/* Sign Out Button */}
      <TouchableOpacity
        onPress={async () => {
          try {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert('Sign-out Error', error.message);
            } else {
              Alert.alert('Signed Out', 'You have been signed out.');
              router.replace('/sign-in');
            }
          } catch (err) {
            console.error('Unexpected error during sign-out:', err);
            Alert.alert('Unexpected Error', 'Something went wrong.');
          }
        }}
        style={[styles.button, styles.signOutButton]} // Custom style for sign-out button
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',  // Center all content horizontally
    justifyContent: 'flex-start', // Align items to the top
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 14,
    width: '100%', // Make inputs full width
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: '55%',
    height: 38,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#dc3545', // Red background for Sign-Out button
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '100%', // Full width
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputWithIcon: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
  },
  eyeIconContainer: {
    paddingLeft: 10,
  },
  spacer: {
    height: 5,
  },
});

export default ProfileScreen;
