/*
  This file defines the MenuScreen component, 
  which displays a list of products using a FlatList. 
  Each product is rendered by the ProductListItem 
  component, and the layout is set to show two columns.
*/
import { ActivityIndicator, FlatList, Text } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import { useProductList } from '@/src/api/products';

export default function MenuScreen() {
  
  const { data:products, error, isLoading} = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  
  if (error) {
    return <Text>Failed to fetch products</Text>
  }
  
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

