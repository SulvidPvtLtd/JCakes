import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import ButtonUser from '@/src/components/ButtonUser';
import ButtonAdmin from '@/src/components/ButtonAdmin';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const index = () => {

  const {session, loading, isAdmin} = useAuth();
  // console.log(session);

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  
  if(!session){
    return <Redirect href={'/(auth)/sign-in'} />
  }

  if(!isAdmin){
    return <Redirect href={'/(user)'} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      
      <Link href={'/(user)'} asChild>
        <ButtonUser text="User" />
      </Link>

      <Link href={'/(admin)'} asChild>
        <ButtonAdmin text="Admin" />
      </Link>     
      
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
      
      
    </View>
  );
};

export default index;