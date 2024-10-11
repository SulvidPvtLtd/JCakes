import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import ButtonUser from '@/src/components/ButtonUser';
import ButtonAdmin from '@/src/components/ButtonAdmin';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      
      <Link href={'/(user)'} asChild>
        <ButtonUser text="User" />
      </Link>

      <Link href={'/(admin)'} asChild>
        <ButtonAdmin text="Admin" />
      </Link>

      <Link href={'/sign-in'} asChild>
        <Button text="Sign in" />
      </Link>
      
    </View>
  );
};

export default index;