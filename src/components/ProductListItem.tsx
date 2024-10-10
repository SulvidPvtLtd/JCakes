import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Product;    
}

const ProductListItem = ({product}: ProductListItemProps) =>{

 //  console.log(product);
  const segments = useSegments();

  // define a conditional (ternary) operator that helps ensure that the first segment of 
  // the URL (segments[0]) is either 'admin' or 'user'? (otherwise) return 'user' as default.
  const currentSegment = segments[0] === '(admin)' || segments[0] === '(user)' ? segments[0] : '(user)';
  
  // console.log(segments);

  return(
    //<Link href={`/(user)/menu/${product.id}`} asChild>
    // Uses the first segment dynamically instead of hardcoding "(user)"
    <Link href={`/${currentSegment}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>         
        
        <Image source={{ uri:product.image || defaultPizzaImage }}  style={styles.image} resizeMode='contain'/>

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>$ {product.price}</Text>     

      </Pressable>
    </Link>
    
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
    container:{
      backgroundColor:'gainsboro',
      padding:10, //Space inside the container.
      borderRadius:15,
      flex: 1,
      //margin:5,
      maxWidth: '50%', //meant for odd number list of products.
    },
  
    image:{
      width:"100%",
      //height:100,
      aspectRatio: 2/2,
      alignSelf: 'center',
    },
  
    title: {
      fontSize:18,
      fontWeight: '600',
      marginVertical: 10,
      
    },
   
    price:{
      color:Colors.light.tint,
      fontWeight: 'bold',
      marginVertical: 20,
    },   
    
  });
  
  
  //46:45