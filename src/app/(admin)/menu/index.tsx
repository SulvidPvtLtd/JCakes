/*
  This file defines the MenuScreen component, 
  which displays a list of products using a FlatList. 
  Each product is rendered by the ProductListItem 
  component, and the layout is set to show two columns.
*/
import { FlatList } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

export default function MenuScreen() {
  return (
    <FlatList 
      data={products}         
      renderItem={ ({ item  }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{gap:10, padding: 10}} 
      columnWrapperStyle={{gap:10}} 
    />
  );
};

