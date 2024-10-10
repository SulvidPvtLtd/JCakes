import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons from expo
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign in' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="john.doe@gmail.com"
        style={styles.emailInput}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={!isPasswordVisible} // Control visibility
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={isPasswordVisible ? 'eye-off' : 'eye'} // Show appropriate icon
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Button text="Sign in" />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
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
  emailInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,     
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50, // Fixed height for input
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
    height: 50, // Same height as input
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    height: '100%', // Ensure input takes full height of container
  },
  iconContainer: {
    padding: 10,
    justifyContent: 'center', // Center the icon vertically
    height: '100%', // Same height as the passwordContainer
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;
