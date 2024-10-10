// This will render the order details.
import { View, Text, FlatList } from 'react-native'
import React from 'react'
import {Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';

const OrderDetailsScreen = () => {
  
    const {id} = useLocalSearchParams();

    const order = orders.find((o) => o.id.toString() === id);

    if(!order){
        return (
        <View>
          <Text>Not found</Text>
        </View>)
    }

    return (
    <View style={{padding:10, gap: 10, flex: 1 }}> 
      <Stack.Screen options={{title: `Order Number: #${id}` }} />
      
      
      <OrderListItem order={order} />
      
        <FlatList 
          data={order.order_items} 
          renderItem={({item}) => 
          <OrderItemListItem item={item}/> }
          contentContainerStyle={{gap: 10}}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={() => <OrderListItem order={order} />}
          // ListFooterComponent={() => <OrderListItem order={order} />}
        />      

    </View>
  )
}

export default OrderDetailsScreen