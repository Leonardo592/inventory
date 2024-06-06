import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase.config";
import { useUsuariosStore } from "../store/UsuariosStore";
import { InsertarUsuarios } from "../supabase/crudUsuarios";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("No se encontró contexto de Auth");
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [user, setUser] = useState([]);

    const {insertarUsuarioAdminGoogle} = useUsuariosStore()

    useEffect(() => {

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(event, session);
            if (session?.user == null) {
                console.log('nulo')
                setUser(null);
                setIsAuthenticated(false)
            } else {
                console.log('nonulo')
                setUser(session?.user);
                setIsAuthenticated(true)
            }

        });

        // Limpieza para desuscribir del listener al desmontar el componente
        return () => {
            authListener.subscription;
        };

    }, []);

    const signInWithFacebook = async () => {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
        });
        if (error) {
            console.error("Error signing in with Facebook:", error.message);
        } else {
            setUser(user);
            setIsAuthenticated(true);
        }
    };

    const signInWithGoogle = async () => {

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })  

            if(error) throw new Error('A ocurrido un error durante la autenticacion')

            await insertarUsuarioAdminGoogle({correo: session?.user.email, fecharegistro: new Date(), tipouser: 'admin'})
                
            console.log(response)
            return data
        
        } catch (error) {
            console.log(error)
        }

        
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signInWithFacebook,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    );
}
