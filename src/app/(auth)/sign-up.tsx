import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { supabase } from '@/src/lib/supabase';
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobileNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSignUp = async () => {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      const user = signUpData.user;
      if (user) {
        const updates: any = {
          id: user.id, // Ensure user.id is a string (typically UUID)
          full_name: fullName,
          username,
          mobile: mobile? parseInt(mobile, 10) : null, // Convert mobile number to number
          avatar_url: avatarUrl,
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(updates);

        if (profileError) {
          throw profileError;
        }

        Alert.alert('Registration Successful', 'You have successfully signed up!');
        setEmail('');
        setPassword('');
        setFullName('');
        setUsername('');
        setMobileNumber('');
        setAvatarUrl(null);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  // const uploadAvatar = async () => {
  //   try {
  //     setUploading(true);

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       quality: 1,
  //     });

  //     if (result.canceled || !result.assets || result.assets.length === 0) {
  //       console.log('User cancelled image picker.');
  //       return;
  //     }

  //     const image = result.assets[0];
  //     const fileExt = image.uri.split('.').pop();
  //     const fileName = `${Date.now()}.${fileExt}`;
  //     const response = await fetch(image.uri);
  //     const blob = await response.blob();

  //     const { data, error: uploadError } = await supabase.storage
  //       .from('avatars')
  //       .upload(fileName, blob, {
  //         contentType: image.type || 'image/jpeg',
  //       });

  //     if (uploadError) throw uploadError;

  //     const publicUrlResponse = supabase.storage.from('avatars').getPublicUrl(data.path);

  //     if (!publicUrlResponse.data) {
  //       throw new Error('Failed to get public URL for the avatar.');
  //     }

  //     setAvatarUrl(publicUrlResponse.data.publicUrl);

  //     Alert.alert('Avatar uploaded successfully!');
  //   } catch (error: any) {
  //     Alert.alert('Error uploading avatar', error.message);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <View style={styles.container}>

      {/* Adding space between the upload button and the first input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} color="#007AFF" />
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  inputContainer: {
    marginTop: 20, // Add some space between the upload button and the inputs
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  avatar: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
    resizeMode: 'cover',
  },
  avatarPlaceholder: {
    backgroundColor: '#f0f0f0',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
  },
});
