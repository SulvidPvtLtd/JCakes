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
    return <ActivityIndicator />;
  }

  
  if(!session){                           // if user is not signed in.
    return <Redirect href={'/sign-in'} />
  }

  if(!isAdmin){                          // if user is not an Admin
    return <Redirect href={'/(user)'} />
  }
 
  return (                               // if use is an Admin
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      
      {/* The administrator should have a posibility to choose if he wants to look at the app as a USER or as an ADMIN*/}
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