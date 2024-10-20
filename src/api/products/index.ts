import { supabase } from "@/src/lib/supabase";
import { Product } from "@/src/types";
import { useQuery, useMutation } from "@tanstack/react-query";

/* useProductList: This hook is for fetching a list of all products from the database.
   The queryKey is ['products'], which identifies that this query is for fetching the list of products. This key helps with caching and refetching logic.
   The queryFn makes a call to the supabase API to retrieve all products (.select('*')). If there's an error during the fetch, the hook throws an error.
   Return Type: The result will be an array of products.
*/
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

/*
  This hook is for fetching a single product by its id.
  Query Key: The queryKey is ['product', id], where id is a specific product's identifier. This key helps React Query know that this query is fetching one product with a particular id, allowing for more specific caching and updating.
  The queryFn makes a call to supabase to retrieve a product based on its id. The .eq('id', id) filters the query for the product with the specified id, and .single() ensures the result is returned as a single object (not as an array).
*/ 
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

// Hook for creating a product
export const useInsertProduct = () => {

  return useMutation({
    async mutationFn(data: any){
      //receive `data` and do something with it.
     const {data: newProduct, error} = await supabase.from('products').insert({
        name: data.name,
        image: data.image,
        price: data.price,
      }).single(); 

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
  });
};


// Hook for updating an existing product
export const useUpdateProduct = () => {
  return useMutation({
    async mutationFn(data: { id: number; name: string; image: string | null; price: number }) {
      const { data: updatedProduct, error } = await supabase
        .from('products')
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq('id', data.id) // Filter by product ID to update the correct product
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
  });
};