// This will render the order details.
import { View, Text, StyleSheet, FlatList,Pressable, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '../../../../assets/data/orders';
import OrderItemListItem from '@/src//components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import Colors from '@/src/constants/Colors';
import { OrderStatusList } from '@/src/types';
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders';


const OrderDetailScreen = () => {
  
  const { id: idString } = useLocalSearchParams();                              // This is an array of strings. 
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]); // Converting the id in string type to number type.

  const {data: order, error, isLoading} = useOrderDetails(id);
  const {mutate: updateOrder} = useUpdateOrder();
 
  const updateStatus = (status: string) => {
    updateOrder({id: id, updatedFields: {status}});
  };
  
  if (isLoading) {
    return <ActivityIndicator/>;
  }
  if (error || !order) {
    return <Text>Failed to fetch order</Text>;
  }

  //console.log(order);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Detailed List #${order?.id} `, headerTitleStyle:{color:Colors.light.adminBtn, fontSize: 20} }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={() => (<>
          <Text style={{ fontWeight: 'bold' }}>Status</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {OrderStatusList.map((status) => (
              <Pressable
                key={status}
                //onPress={() => console.warn('Update status')}
                onPress={() => updateStatus(status)}
                style={{
                  borderColor: Colors.light.adminBtn,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  backgroundColor:
                    order.status === status
                      ? Colors.light.adminBtn
                      : 'transparent',
                }}
              >
                <Text
                  style={{
                    color:
                      order.status === status ? 'white' : Colors.light.tint,
                  }}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;