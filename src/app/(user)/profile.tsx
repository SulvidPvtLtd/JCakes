import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '@/src/lib/supabase';
import Button from '@/src/components/Button';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const [email, setEmail] = useState<string>(''); // Ensure the state only accepts strings

  // Fetch user email on component mount
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          //console.error("Error fetching session:", error.message);
          //Alert.alert("Error", "Failed to fetch session details.");
          return;
        }

        if (session?.user?.email) {
          setEmail(session.user.email); // Safely assign email if it exists
        } else {
          Alert.alert("No user session", "Please log in again.");
        }
      } catch (err) {
        //console.error("Unexpected error fetching user email:", err);
        Alert.alert("Error", "Something went wrong.");
      }
    };

    fetchUserEmail();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      {email ? (
        <Text style={styles.email}>Email: {email}</Text>
      ) : (
        <Text style={styles.loading}>Loading email...</Text>
      )}

      <Button 
        text="Sign Out" 
        onPress={async () => {
          try {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert("Sign-out Error", error.message);
            } else {
              Alert.alert("Signed Out", "You have been signed out.");
              // Redirect to the login screen
              router.replace(`/sign-in`);
            }
          } catch (err) {
            console.error("Unexpected error during sign-out:", err);
            Alert.alert("Unexpected Error", "Something went wrong.");
          }
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  email: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  loading: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
});

export default ProfileScreen;