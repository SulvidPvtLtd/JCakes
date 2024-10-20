import { Alert, View, Text, TextInput, StyleSheet, Image } from 'react-native';
import ButtonAdmin from '@/src/components/ButtonAdmin';
import React, { useState, useCallback } from 'react';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useInsertProduct, useUpdateProduct } from '@/src/api/products';

const CreateProductScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Submit');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();

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
      updateProduct(
        { id: Number(id), name, price: parseFloat(price), image },
        {
          onSuccess: () => {
            setSuccessMessage('Product updated successfully!');
            resetFields();
            setButtonText('Create');
            Alert.alert('Success', 'Product updated successfully!', [
              { text: 'OK', onPress: () => console.log('OK Pressed') }, // You can add navigation logic here
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

    try {
      insertProduct(
        { name, price: parseFloat(price), image },
        {
          onSuccess: () => {
            setSuccessMessage('Product created successfully!');
            resetFields();
            setButtonText('Create');
            Alert.alert('Success', 'Product created successfully!', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
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

      <ButtonAdmin onPress={onSubmit} text={loading ? 'Processing...' : buttonText} disabled={loading} />
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
});

export default CreateProductScreen;