import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing vector icons from Expo
import { supabase } from '@/src/lib/supabase';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('******'); // Current password placeholder
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // State to toggle password visibility

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          Alert.alert('Error', 'Failed to fetch session details.');
          return;
        }

        if (session?.user?.email) {
          setEmail(session.user.email);
          const { data, error: userError } = await supabase
            .from('profiles')
            .select('username, mobile_number, full_name, avatar_url')
            .eq('id', session.user.id)
            .single();

          if (userError) {
            Alert.alert('Error', 'Failed to fetch user profile.');
            return;
          }

          if (data) {
            setUsername(data.username || '');
            setMobileNumber(data.mobile_number ? String(data.mobile_number) : '');
            setFullName(data.full_name || '');
            setAvatarUrl(data.avatar_url || '');
          }
        } else {
          Alert.alert('No user session', 'Please log in again.');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        Alert.alert('Error', 'Something went wrong.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) {
        Alert.alert('Error', 'Failed to fetch session details.');
        return;
      }

      const updates: any = {};
      if (newEmail) updates.email = newEmail;
      if (newPassword) updates.password = newPassword;

      if (Object.keys(updates).length > 0) {
        // Update profile in Supabase
        const { error: updateError } = await supabase.auth.updateUser(updates);
        if (updateError) {
          Alert.alert('Error', 'Failed to update user profile.');
          return;
        }

        if (newEmail || newPassword) {
          // Sign out after email/password change
          await supabase.auth.signOut();
          Alert.alert('Success', 'Profile updated. Please sign in again.');
          router.replace('/sign-in');
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const handleUpdateAvatar = async (newAvatarUrl: string) => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) {
        Alert.alert('Error', 'Failed to fetch session details.');
        return;
      }

      const { error: updateAvatarError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', session.user.id);

      if (updateAvatarError) {
        Alert.alert('Error', 'Failed to update avatar.');
        return;
      }

      setAvatarUrl(newAvatarUrl);
      Alert.alert('Success', 'Avatar updated.');
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar Centered at the Top */}
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarText}>No Avatar</Text>
        )}
      </View>

      {/* Change Avatar Button */}
      <TouchableOpacity
        onPress={() => handleUpdateAvatar('new-avatar-url')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Change Avatar</Text>
      </TouchableOpacity>

      {/* Full Name */}
      <Text style={styles.text}>Full Name: {fullName}</Text>

      {/* Email Address */}
      <Text style={styles.text}>Email: {email}</Text>

      {/* Username */}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder={username || "New Username"}
      />

      {/* Mobile Number */}
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder={mobileNumber || "Mobile Number"}
        keyboardType="phone-pad"
      />
      
      {/* New Email */}
      <TextInput
        style={styles.input}
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder={newEmail || "New Email"}
        keyboardType="email-address"
      />
      
      {/* New Password (with current password as placeholder) */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputWithIcon}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder={currentPassword} // Use current password as placeholder
          secureTextEntry={!passwordVisible} // Toggle password visibility
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIconContainer}
        >
          <Ionicons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleUpdateProfile}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      
      {/* Spacer between buttons */}
      <View style={styles.spacer} />

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
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:0.5, // Space from top
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  avatarText: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: '55%',
    height:38,
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
