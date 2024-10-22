import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


export const useAdminOrderList = () => {
    return useQuery({
      queryKey: ['orders'],
      queryFn: async (orders) => {
        // Fetch only necessary columns to optimize query performance
        const { data, error } = await supabase
          .from('orders')
          .select('*');  // For admin we have to query all th orders
  
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
