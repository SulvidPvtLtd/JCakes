// This will render the order details.
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { useOrderDetails } from '@/src/api/products';

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const {data: order, isLoading, error} = useOrderDetails(id);
  // const order = orders.find((o) => o.id.toString() === id);

  // if (!order) {
  //   return <Text>Order not found!</Text>;
  // }

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