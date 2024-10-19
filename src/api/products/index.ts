import { supabase } from "@/src/lib/supabase";
import { Product } from "@/src/types";
import { useQuery } from "@tanstack/react-query";


export const useProductList = () => {
    return useQuery({
        queryKey: ['products'], // The key is for caching the query.
        queryFn: async () => {
          const { data, error } = await supabase.from('products').select('*');
          if (error) {
            throw new Error(error.message);
          }
          return data;
        }
      });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single(); // This makes sure it takes 1 item as an object an no as an array.
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};