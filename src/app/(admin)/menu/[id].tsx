/*
  This file provides a detailed view of a specific 
  product identified by its ID. It displays the 
  product's image, name, and price. 
  It also allows users to navigate to the creation 
  screen to edit the product and add it to their cart.
  This will display products available to all customers.
*/
import { View, Text, Image,StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products' ;
import { defaultPizzaImage } from '@/src/components/ProductListItem'; //link to the default images.
import { useState } from 'react'; // it should be used in the top body of the component. 
import Colors from '@/src/constants/Colors';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M'); //This whole statement is a hook.

  const { id } = useLocalSearchParams();

  const {addItem} = useCart();
  
  const router = useRouter();

  const product = products.find( (p)=> p.id.toString() === id)

  const addToCart = ()=>{
    //console.warn('Adding to cart, size: ', selectedSize);
    if(!product){
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
    // console.warn('Added to Cart');
  }

  if(!product){
      return(
        <Text>Product not found</Text>
      )
  }

  return (
    <View style={styles.container}>

        <Stack.Screen options={{
            title:'Menu',  
            headerTitleStyle:{color:Colors.light.adminBtn, fontSize: 20},
            headerRight:() => (
              <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                      <FontAwesome
                        name="pencil"
                        size={25}
                        color={Colors.light.adminBtn}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                  )}
                </Pressable>
              </Link>
            ),
        }}/>

      {/* <Stack.Screen options={{ title:'Details: '+ id}} /> */}
      <Stack.Screen options={{ title:product?.name}} />

      <Image source={{uri: product?.image || defaultPizzaImage }} style={styles.image}/>

      <Text style={styles.title}>${product?.name}</Text>

      <Text style={styles.price}>${product?.price}</Text>      

    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'gainsboro',
    flex: 1,
    padding: 20
  },
  image:{
    width:"100%",
    aspectRatio: 1,
  },
  price:{
    fontSize: 18,
    fontWeight:'bold',
    color:Colors.light.tint
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  }

});

export default ProductDetailsScreen;


