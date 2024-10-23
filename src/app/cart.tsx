import { View,  Platform , FlatList, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// consume from the exported CartProvider's CartContext.
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import ButtonUser from '../components/ButtonUser';


const CartScreen = () => {

  // declare an object as a variable that will allow you to get
  // the values from `CartContext.Provider`'s items
  const {items, total, checkout} = useCart();

  return (
    <View style={{padding:10,}}>
      <FlatList 
        data={items}
        renderItem={ ( {item} ) =><CartListItem cartItem={item}/> }
        contentContainerStyle={{ gap: 10}}        
      />

      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500', color:'green' }}>
        Total: ${total.toFixed(2)}
      </Text>

      <ButtonUser onPress={checkout} text="Checkout" />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;