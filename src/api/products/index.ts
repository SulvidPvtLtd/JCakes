import { supabase } from "@/src/lib/supabase";
import { Product } from "@/src/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

/* useProductList: This hook is for fetching a list of all products from the database.
   The queryKey is ['products'], which identifies that this query is for fetching the list of products. This key helps with caching and refetching logic.
   The queryFn makes a call to the supabase API to retrieve all products (.select('*')). If there's an error during the fetch, the hook throws an error.
   Return Type: The result will be an array of products.
*/
export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Fetch only necessary columns to optimize query performance
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image'); // Select only relevant columns

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache the result for 5 minutes to prevent frequent refetches
    refetchOnWindowFocus: false, // Avoid refetching when the window regains focus (optional)
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

  const QueryClient = useQueryClient();

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

    // This code make the new product rnder immidiately on the page instaed of waiting for the app to reload.
    async onSuccess(){
      await QueryClient.invalidateQueries({queryKey: ['products']});
    },
    // onError(error){
    //   console.log(error);
    // }   

  });
};


// Hook for updating an existing product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient(); // Get the query client for invalidation
  const router = useRouter(); // Router for navigating back

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
        .select('*')    
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    
    // On success, invalidate the product list and navigate back to the previous page
    onSuccess: async (_, {id}) => {  // The underscore is a convention used when a variable is not needed and can be ignored.
      await queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate product list query to refetch the updated data
      await queryClient.invalidateQueries({ queryKey: ['products', id] });
      router.back(); // Navigate back after the update
    },
    
    onError: (error) => {
      console.error("Error updating product:", error.message); // Handle any errors that occur during update
    },
  });
};

// Hook for deleting a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient(); // Get the query client for invalidation

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id); // Specify the product to delete by its ID

      if (error) {
        throw new Error(error.message);
      }
      
      return id; // Return the ID of the deleted product
    },
    
    // On success, invalidate the product list to ensure updated data is fetched
    onSuccess: async (deletedId) => {
      await queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate product list query
      await queryClient.invalidateQueries({ queryKey: ['product', deletedId] }); // Invalidate specific product query if it exists
    },

    onError: (error) => {
      console.error("Error deleting product:", error.message); // Handle any errors that occur during deletion
    },
  });
};
