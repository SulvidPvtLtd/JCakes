import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { InsertTables } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useAdminOrderList = ({archived = false}) => {
   
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

  return useQuery({
      queryKey: ['orders', {archived}],
      queryFn: async (orders) => {
        // Fetch only necessary columns to optimize query performance
        const { data, error } = await supabase
          .from('orders')
          .select('*').in(
            'status', statuses
          );  // For admin we have to query all th orders
  
        if (error) {
          throw new Error(error.message);
        }
  
        return data;
      },
      staleTime: 1000 * 60 * 5, // Cache the result for 5 minutes to prevent frequent refetches
      refetchOnWindowFocus: false, // Avoid refetching when the window regains focus (optional)
    });
  };


  export const useMyAdminOrderList = () => {

    const {session} = useAuth();
    const id = session?.user?.id;

    return useQuery({
      queryKey: ['orders', {userId: id}],  // 2nd parameter added to differentiate from one above, so that the data won't be confuded with in cache storage.
      queryFn: async (orders) => {

        if(!id) return null;

        // Fetch only necessary columns to optimize query performance
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', id);  // For admin we have to query all th orders
  
        if (error) {
          throw new Error(error.message);
        }
  
        return data;
      },
      staleTime: 1000 * 60 * 5, // Cache the result for 5 minutes to prevent frequent refetches
      refetchOnWindowFocus: false, // Avoid refetching when the window regains focus (optional)
    });
  };


  // Hook for creating a Order
export const useInsertOrder = () => {

  const QueryClient = useQueryClient();
  const {session} = useAuth();
  const userId = session?.user?.id;

  return useMutation({
    async mutationFn(data: InsertTables<'orders'>){
      //receive `data` and do something with it.
     const {data: newProduct, error} = await supabase
     .from('orders')
     .insert({...data, user_id: userId})
     .select()
     .single(); 

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