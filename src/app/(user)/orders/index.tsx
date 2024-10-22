//This will render a list of orders.
// The hader from user layout should be hidden in 
// the / (user)/_layout.tsx so as to avoid dupliaction when rendering.
import { View, Text, FlatList, ActivityIndicator} from 'react-native'
import OrderListItem from '@/src/components/OrderListItem'
import { useMyAdminOrderList } from '@/src/api/orders'

const OrderScreen = () => {

  const {data: orders, isLoading, error} = useMyAdminOrderList()
  if(isLoading){
    return<ActivityIndicator/>
  }
  if(error){
    return <Text>Failed to fetch</Text>
  }

  return (
    <FlatList    
        data={orders}
        renderItem={({item}) => ( <OrderListItem order={item} />  )}
        contentContainerStyle={{gap: 10, padding: 10}} 
    />       
  )
}

export default OrderScreen

