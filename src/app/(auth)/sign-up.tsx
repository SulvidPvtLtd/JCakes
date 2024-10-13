import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack, useRouter } from 'expo-router';
import {supabase} from '@/src/lib/supabase'


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();  // Use router for navigation

  async function checkAccountExists() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: "placeholder_password", // Dummy password to check existence
    });

    // If the error is about invalid login credentials, the account exists
    if (error && error.message === 'Invalid login credentials') {
      return true; // Account exists
    }
    return false; // Account doesn't exist
  }

  async function signUpWithEmail() {
    // console.warn("Sign Up");
    const accountExists = await checkAccountExists();

    if (accountExists) {
      Alert.alert("Account already exists. Redirecting to sign-in...");
      router.push('/sign-in');  // Navigate to sign-in
      setLoading(false);
      return;
    }

    // setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if(error){
      Alert.alert(error.message)
      setLoading(false)
    }
    
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jonh.doe@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button onPress={signUpWithEmail} disabled={loading} text={loading ? "Creating account...": "Create accont"} />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;