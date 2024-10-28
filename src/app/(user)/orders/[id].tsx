// This will render the order details.
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { useOrderDetails } from '@/src/api/orders';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();                              // This is an array of strings. 
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]); // Converting the id in string type to number type.

  const {data: order, error, isLoading} = useOrderDetails(id);
  if (isLoading) {
    return <ActivityIndicator/>;
  }
  if (error) {
    return <Text>Failed to fetch order</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Detailed List #${order.id} ` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
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