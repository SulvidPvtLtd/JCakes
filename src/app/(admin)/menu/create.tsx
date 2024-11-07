import { Alert, View, Text, TextInput, StyleSheet, Image, ActivityIndicator } from 'react-native';
import ButtonAdmin from '@/src/components/ButtonAdmin';
import React, { useState, useCallback, useEffect } from 'react';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useInsertProduct, useProduct, useUpdateProduct, useDeleteProduct } from '@/src/api/products'; // Import the delete hook
import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/src/lib/supabase';
import { decode } from 'base64-arraybuffer';

const CreateProductScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Submit');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [deleting, setDeleting] = useState(false); // New state for deleting

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]); //the ?. operator is called the optional chaining operator. It allows you to safely access deeply nested properties of an object without causing an error if any part of the chain is null or undefined
  const isUpdating = !!idString;                  //  !!idString is a shorthand way to convert idString to a boolean 

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct(); // Initialize delete hook
  
  const router = useRouter();

  useEffect(() => {
    if (isUpdating && updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [isUpdating, updatingProduct]);

  const resetFields = useCallback(() => {
    setName('');
    setPrice('');
    setImage(null);
  }, []);

  const validateInput = useCallback((): boolean => {
    if (!name.trim()) {
      setError('Name is required.');
      return false;
    }

    if (!price.trim()) {
      setError('Price is required.');
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setError('Price must be a valid number.');
      return false;
    }

    setError('');
    return true;
  }, [name, price]);

  const onUpdate = async () => {
    if (!validateInput()) return;

    setLoading(true);
    setButtonText('Updating...');
    

    try {
      const productId = Array.isArray(id) ? Number(id[0]) : Number(id);

      updateProduct(
        { id: productId, name, price: parseFloat(price), image },
        {
          onSuccess: () => {
            setSuccessMessage('Product updated successfully!');
            resetFields();
            setButtonText('Create');
            Alert.alert('Success', 'Product updated successfully!', [
              { text: 'OK', onPress: () => { router.back(); } }, // Use router.back() to go to the previous page
            ]);
          },
          onError: (err: any) => setError(err.message),
        }
      );
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const onCreate = async () => {
    if (!validateInput()) return;

    setLoading(true);
    setButtonText('Creating...');

    const imagePath = await uploadImage();

    try {
      insertProduct(
        { name, price: parseFloat(price), image: imagePath },  // new object.
        {
          onSuccess: () => {
            setSuccessMessage('Product created successfully!');
            resetFields();
            setButtonText('Create');
            Alert.alert('Success', 'Product created successfully!', [
              { text: 'OK', onPress: () => router.back() }, // Use router.back() to navigate back after creating
            ]);
          },
          onError: (err: any) => setError(err.message),
        }
      );
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (isUpdating) {
      await onUpdate();
    } else {
      await onCreate();
    }
  };

  const handleDeleteProduct = () => {
    if (!id) {
      return; // No product ID to delete if it's a create action
    }

    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setDeleting(true); // Set deleting state to true
            deleteProduct(Number(id), {
              onSuccess: () => {
                setDeleting(false); // Reset deleting state
                Alert.alert('Success', 'Product deleted successfully!', [
                  { text: 'OK', onPress: () => router.replace('/(admin)') }, // Use router.back() to navigate back after deleting
                ]);
              },
              onError: (err: any) => {
                setDeleting(false); // Reset deleting state
                setError(err.message);
              },
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';

    const { data, error } = await supabase.storage
      .from('products-images')
      .upload(filePath, decode(base64), { contentType });
  
    //console.log(error);

    if (data) {
      return data.path;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };



  // Determine whether buttons should be disabled
  const isButtonDisabled = loading || deleting;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? 'Update Product' : 'Create Product',
          headerTitleStyle: { color: Colors.light.adminBtn, fontSize: 20 },
        }}
      />

      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="99.99"
        style={styles.input}
        keyboardType="numeric"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <ButtonAdmin 
        onPress={onSubmit} 
        text={loading ? 'Processing...' : buttonText} 
        disabled={isButtonDisabled} // Disable if loading or deleting
      />
      
      {/* Add delete button for update product page */}
      {isUpdating && (
        <ButtonAdmin 
          onPress={handleDeleteProduct} 
          text="Delete Product" 
          disabled={isButtonDisabled}  // Disable if loading or deleting
          style={{ backgroundColor: 'red' }} // Optional styling for visibility
        />
      )}

      {/* Show Activity Indicator while deleting */}
      {deleting && (
        <ActivityIndicator size="large" color={Colors.light.tint} style={styles.activityIndicator} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'gainsboro',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: 'black',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginBottom: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  activityIndicator: {
    marginTop: 20, // Add some space above the ActivityIndicator
    alignSelf: 'center', // Center the ActivityIndicator
  },
});

export default CreateProductScreen;