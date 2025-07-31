import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(); // Crea contexto de autenticación

export const useAuth = () =>useContext(AuthContext); // Hook para acceder al contexto de autenticación

// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

    // Efecto para escuchar cambios en el estado de autenticación
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
    })
    return () => unsubscribe(); // Limpia el listener al desmontar el componente
   }, []);

   return (
    <AuthContext.Provider value={{ user, loading}}>
        {children} 
    </AuthContext.Provider>
   )
}