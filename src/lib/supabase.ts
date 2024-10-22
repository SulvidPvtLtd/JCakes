/*
    This code sets up a Supabase client in this project 
    with secure storage for authentication tokens that uses
    Expo's SecureStore
*/
import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/src/database.types';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://uonumbnwildgsugndtmk.supabase.co';
// This is safe to use because its dependent on wether the user is authenticated or not.
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbnVtYm53aWxkZ3N1Z25kdG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MTQyNTksImV4cCI6MjA0NDM5MDI1OX0.TrT8N5ruLkJvNJUxrqghg76GHjNUeGrB1kjs2mynsnQ';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


/*
    ExpoSecureStoreAdapter is an object that defines methods that 
    interacts with `SecureStore` for securely storing, retrieving, and deleting tokens.
    - getItemAsync: Retrieves a stored item.
    - setItemAsync: Stores an item.
    - deleteItemAsync: Removes a stored item.

    createClient: This function is used to create a Supabase client instance.
    autoRefreshToken: Automatically refreshes tokens when they expire.
    persistSession: Saves the user session (tokens) securely on the device.
    detectSessionInUrl: Disabled for React Native since there's no URL-based session detection. 
*/