import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Profile } from "../types";

type AuthData = {
    session : Session | null;
    profile: any;
    loading : boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
    isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        // Load user data or token from storage
        //console.log("Auth provider is mounted");
        const fetchSession = async () => {
            // const result = await supabase.auth.getSession();
            // console.log(result);
            const { data:{session} } = await supabase.auth.getSession();            
            // console.log(data);
            setSession(session);
            
            if (session) {
              // fetch profile
              const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              setProfile(data || null);
            }

            setLoading(false);

        };
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
          });      

    }, []);

   console.log(profile); 

  return (
    <AuthContext.Provider value={{session, loading, profile, isAdmin:profile?.group == 'ADMIN'}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 