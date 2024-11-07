import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order, Tables } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';


dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<'orders'>;
};

// displays an individual order's details
const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  const currentSegment = segments[0] === '(admin)' || segments[0] === '(user)' ? segments[0] : '(user)';

  return (
    <Link href={`/${currentSegment}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;