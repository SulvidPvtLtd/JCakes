import { View, Text, Image,StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products' ;
import { defaultPizzaImage } from '@/src/components/ProductListItem'; //link to the default images.
import { useState } from 'react'; // it should be used in the top body of the component. 
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';

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
      <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>

      {/* <Stack.Screen options={{ title:'Details: '+ id}} /> */}
      <Stack.Screen options={{ title:product?.name}} />
      <Image source={{uri: product?.image || defaultPizzaImage }} style={styles.image}/>

      <Text style={{color:'black'}}>Select Size</Text>
      
      <View style={styles.sizes}>
        { 
          sizes.map( (size)=> 
            <Pressable
                onPress={()=> { setSelectedSize(size); } }
                style={[ styles.viewSizes,{ backgroundColor:selectedSize === size? '#FFA500' : '#800060' } ]} key={size}>
                <Text style={[styles.textSize, { color:selectedSize === size? 'maroon' : 'white' } ]}>{size}</Text>
            </Pressable> ) 
        }
      </View>

      <Text style={styles.price}>${product?.price}</Text>

        <Button onPress={addToCart} text='Add to Cart' />

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
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
    color:Colors.light.tint,
    marginTop:'auto',
  },
  sizes:{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginVertical:15
  },
  viewSizes:{
    backgroundColor:'gainsboro',
    width:50,
    aspectRatio: 1,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
  },
  textSize:{
    fontSize: 20,
    fontWeight: '500',
  }
});

export default ProductDetailsScreen;


