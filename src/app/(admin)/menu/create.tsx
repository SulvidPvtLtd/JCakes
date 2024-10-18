/*
    This component allows users to create or update a
    product. It includes form fields for entering the
    product name and price, a button for selecting 
    an image, and logic for validation and submission. 
    It handles both creating new products and updating 
    existing ones based on the presence of an ID.
*/
import { Alert, View, Text, TextInput, StyleSheet, Image } from 'react-native';
import ButtonAdmin from '@/src/components/ButtonAdmin';
import React, { useState, useCallback } from 'react';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen: React.FC = () => {
    
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);

    const {id} = useLocalSearchParams();
    const isUpdating = !!id; //!!id ensures that isUpdating is explicitly a boolean

    
    // Regular expression patterns
    const namePattern = /^[a-zA-Z\s]+$/;  // Allows only letters and spaces
    const pricePattern = /^\d+(\.\d{1,2})?$/; // Allows numbers with up to two decimal places

    // Memoized function to reset input fields
    const resetFields = useCallback(() => {
        setName('');
        setPrice('');
    }, []);

    // Input sanitization
    const sanitizeInput = (input: string): string => {
        return input.replace(/[<>]/g, '');  // Remove characters like < and >
    };

    // Input validation logic
    const validateInput = useCallback((): boolean => {
        
        const sanitizedName = sanitizeInput(name.trim());
        const sanitizedPrice = sanitizeInput(price.trim());

        if (!sanitizedName) {
            setError('Name is required.');
            return false;
        }

        if (!namePattern.test(sanitizedName)) {
            setError('Name can only contain letters and spaces.');
            return false;
        }

        if (!sanitizedPrice) {
            setError('Price is required.');
            return false;
        }

        if (!pricePattern.test(sanitizedPrice)) {
            setError('Price must be a valid number with up to two decimal places.');
            return false;
        }

        setError(''); // Clear errors if validation passes
        return true;
    }, [name, price]);

    const onDelete = () => {
        console.warn('Delete !!!!!!');
    }

    const confirmDelete = ()=>{
        Alert.alert("Confirm","Are you sure you want to delete this product ?", [
            {
                text:"Cancel"
            },
            {
                text: "Delete",
                style:"destructive",
                onPress: onDelete,
            }
         ])
    }

    const onSubmit = ()=> {

        if(isUpdating){
            onUpdateCreate();
        }
        else{
            onCreate()
        }
    }

    // Handle submition action
    const onUpdateCreate = () => {
        if (!validateInput()) {
            return
        }

        console.log('Updating Product: ', name);
        // saving to a database
        resetFields()

    }

    // Handle create action
    const onCreate = () => {
        if (!validateInput()) {
            return
        }

        console.log('Creating Product: ', name);

        // saving to a database

        resetFields()
    }

    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          //mediaTypes: ImagePicker.MediaTypeOptions.All,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        // console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating ? "Update Product":"Create Product", headerTitleStyle:{color:Colors.light.adminBtn, fontSize: 20}}} />
            <Image source={{uri: image || defaultPizzaImage}} style={styles.image} />
            <Text onPress={pickImage } style={styles.textButton}>Select image</Text>

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

            <ButtonAdmin  onPress={onSubmit} text={isUpdating ? "Updating" : "Create" } />
            {isUpdating && 
                <Text onPress={confirmDelete} style={styles.textButton}>
                    Delete
                </Text>
            }
        </View>
    );
}

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
        color: "black",
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    image:{
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton:{
        alignSelf: 'center',
        fontWeight:'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
})

export default CreateProductScreen