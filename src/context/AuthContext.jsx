import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"
import firebase from "firebase/compat/app";

export const AuthContext = createContext(); // Crea contexto de autenticación

export const useAuth = () =>useContext(AuthContext); // Hook para acceder al contexto de autenticación

// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

    // Efecto para escuchar cambios en el estado de autenticación
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            //obtener el rol desde firestore
            const docRef = doc(db, "users", firebaseUser.uid);
            const docSnap = await getDoc(docRef);
            let role = "user";
            if(docSnap.exists()){
                role = (docSnap.data().role || "user").toLowerCase().trim();
            }

            const currentUser = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                role,
            };
            
            console.log("Usuario autenticado:", currentUser);
            setUser(currentUser);
        }else {
            setUser(null);
        }
        setLoading(false);
    });
    
    return () => unsubscribe(); // Limpia el listener al desmontar el componente
   }, []);

   return (
    <AuthContext.Provider value={{ user, loading}}>
        {children} 
    </AuthContext.Provider>
   )
}