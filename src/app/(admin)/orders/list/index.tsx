//This will render a list of orders.
// The hader from user layout should be hidden in 
// the / (user)/_layout.tsx so as to avoid dupliaction when rendering.
import { View, Text, FlatList, ActivityIndicator} from 'react-native'
import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrderList } from '@/src/api/orders';

const OrderScreen = () => {

  const {data: orders, isLoading, error} = useAdminOrderList();

  if (isLoading) return <ActivityIndicator/>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <FlatList    
        data={orders}
        renderItem={({item}) => ( <OrderListItem order={item} />  )}
        contentContainerStyle={{gap: 10, padding: 10}} 
    />       
  )
}

export default OrderScreen

