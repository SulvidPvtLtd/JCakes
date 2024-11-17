import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';

import Colors from '@/src/constants/Colors';
import ButtonAdmin from '@/src/components/ButtonAdmin';
import { supabase } from '@/src/lib/supabase';
import {
  useInsertProduct,
  useUpdateProduct,
  useProduct,
  useDeleteProduct,
} from '@/src/api/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';

// Main Component
const CreateProductScreen: React.FC = () => {
  // Local state variables to manage form inputs and app behavior
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Navigation hooks and product-specific variables
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
  const isUpdating = !!id;
  const router = useRouter();

  // API hooks to handle CRUD operations
  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: updatingProduct } = useProduct(id);

  // Load product details for editing
  useEffect(() => {
    if (isUpdating && updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [isUpdating, updatingProduct]);

  // Helper function to reset input fields
  const resetFields = useCallback(() => {
    setName('');
    setPrice('');
    setImage(null);
  }, []);

  // Validate form inputs
  const validateInput = useCallback((): boolean => {
    if (!name.trim()) {
      setError('Name is required.');
      return false;
    }
    if (!price.trim() || isNaN(parseFloat(price))) {
      setError('Price must be a valid number.');
      return false;
    }
    setError('');
    return true;
  }, [name, price]);

  // Handle image upload (local file to Supabase)
  const uploadImage = async (): Promise<string | null> => {
    if ( !image?.startsWith('file://')) {
      return image; // Return existing URL as is
    }
    try {
      // Read image file as base64
      const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });

      // Upload to Supabase storage
      const filePath = `${randomUUID()}.png`;
      const { data, error } = await supabase.storage
        .from('products-images')
        .upload(filePath, decode(base64), { contentType: 'image/png' });

      if (error) throw new Error(error.message);
      return data?.path || null;
    } catch (err) {
      console.error('Image upload error:', err);
      return null;
    }
  };

  // Handle image selection using ImagePicker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle product creation
  const onCreate = async () => {
    if (!validateInput()) return;
    setLoading(true);

    try {
      const imagePath = await uploadImage();
      insertProduct(
        { name, price: parseFloat(price), image: imagePath },
        {
          onSuccess: () => {
            Alert.alert('Success', 'Product created successfully!');
            resetFields();
            router.back();
          },
          onError: (err: any) => setError(err.message),
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle product update
  const onUpdate = async () => {
    if (!validateInput()) return;
    setLoading(true);

    try {
      const imagePath = await uploadImage();
      updateProduct(
        { id: id!, name, price: parseFloat(price), image: imagePath },
        {
          onSuccess: () => {
            Alert.alert('Success', 'Product updated successfully!');
            router.back();
          },
          onError: (err: any) => setError(err.message),
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = () => {
    if (!id) return;
    Alert.alert('Delete Product', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          setDeleting(true);
          deleteProduct(id, {
            onSuccess: () => {
              Alert.alert('Success', 'Product deleted successfully!');
              router.replace('/(admin)');
            },
            onError: (err: any) => setError(err.message),
          });
        },
      },
    ]);
  };

  // Determine the correct action for the form submission
  const onSubmit = async () => (isUpdating ? await onUpdate() : await onCreate());

  // Render UI
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? 'Update Product' : 'Create Product',
          headerTitleStyle: { fontSize: 20, color: Colors.light.tint },
        }}
      />

      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.selectImageText}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Product Name" />

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        placeholder="e.g., 99.99"
        keyboardType="numeric"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <ButtonAdmin onPress={onSubmit} text={loading ? 'Processing...' : isUpdating ? 'Update' : 'Create'} />

      {isUpdating && (
        <ButtonAdmin
          onPress={handleDeleteProduct}
          text="Delete Product"
          style={{ backgroundColor: 'red' }}
          disabled={deleting}
        />
      )}

      {deleting && <ActivityIndicator style={styles.loader} />}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: 'white' },
  input: { backgroundColor: 'lightgray', padding: 10, marginVertical: 10 },
  label: { fontWeight: 'bold', marginTop: 10 },
  error: { color: 'red', marginTop: 5 },
  image: { width: 200, height: 200, alignSelf: 'center', marginVertical: 10 },
  selectImageText: { color: Colors.light.tint, alignSelf: 'center', marginVertical: 10 },
  loader: { marginTop: 10, alignSelf: 'center' },
});

export default CreateProductScreen;