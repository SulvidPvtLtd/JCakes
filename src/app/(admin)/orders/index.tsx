//This will render a list of orders.
// The hader from user layout should be hidden in 
// the / (user)/_layout.tsx so as to avoid dupliaction when rendering.
import {FlatList} from 'react-native'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'

const OrderScreen = () => {
  return (
    <FlatList    
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} /> }   
        contentContainerStyle={{gap: 10, padding: 10}} 
    />   
    
  )
}

export default OrderScreen

