import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session : Session | null;
    loading : boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    
    const [session, setSession] = useState<Session | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        // Load user data or token from storage
        //console.log("Auth provider is mounted");
        const fetchSession = async () => {
            // const result = await supabase.auth.getSession();
            // console.log(result);
            const {data } = await supabase.auth.getSession();            
            // console.log(data);
            setSession(data.session);
            setLoading(false);
        };
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
          });
    }, []);

  return (
    <AuthContext.Provider value={{session, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);