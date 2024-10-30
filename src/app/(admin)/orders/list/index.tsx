//This will render a list of orders.
// The hader from user layout should be hidden in 
// the / (user)/_layout.tsx so as to avoid dupliaction when rendering.
import { Text, FlatList, ActivityIndicator} from 'react-native'
import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrderList } from '@/src/api/orders';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';

//This function will read the list of orders.
export default function OrderScreen(){

  const {
    data: orders, 
    isLoading, 
    error
  } = useAdminOrderList({archived: false});

  useInsertOrderSubscription();

  if (isLoading) return <ActivityIndicator/>
  if (error) return <Text>FAILED | {error.message}. </Text>

  return (
    <FlatList    
        data={orders}
        renderItem={({item}) => ( <OrderListItem order={item} />  )}
        contentContainerStyle={{gap: 10, padding: 10}} 
    />
  )
}



