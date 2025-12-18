import { create } from "zustand";
import { 
            onAuthChange, 
            logout,
            loginInWithEmail,
            signInWithEmail,
            signInWithGoogle 
        } from "../services/authService";

import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase/config";       

//Maneja el estado del usuario, roles de Firestore y persistencias de la sesión.
const useAuthStore = create((set) => ({
    user: null,
    loading: true,
    error: null,

    //Actualizador manual del usuario
    setUser: (user) => set({user}),
    
    //Cierr la sesión activa
    logoutUser: async () => {
        try{
            await logout();
            set({user: null, error: null});
        }catch (error){
            set({error: error.message});
        }
    },
    //Inicio de sesión con email y contraseña.
    // tras el login, recupera el rol del usuario desda users en Firestore.
    loginUser: async (email, password) => {
        set ({loading: true, error: null});
        try {
            const user = await loginInWithEmail(email, password);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)

            // Si el documento no existe en Firestore, se asugna un user.
            const role = docSnap.exists() ? docSnap.data(). role : "user";
            set({user: {...user, role}, loading: false});
        }catch (error){
            set ({ error: error.message, loading: false});
        }
    },


    //Inicio de sesión mediante Google .
    //consulta el rol de usuario en firestore tras el login.
    loginWithGoogle: async () => {
        set({loading: true, error: null});
        try {
            const user = await signInWithGoogle();
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            const role = docSnap.exists() ? docSnap.data(). role : "user";
            set({user: {...user, role}, loading: false});
        }catch (error){
            set({error: error.message, loading: false});
        }
    },
    
    //Registro de nuevos usuarios
    //mediante el  el servicio de creación en Auth
    registerUser: async (email, password, displayName) => {
        set({loading: true, error: null});
        try{
            const user = await signInWithEmail(email, password, displayName);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            const role = docSnap.exists() ? docSnap.data(). role : "user";
            set({user: {...user, role}, loading: false});
        }catch ( error){
            set({error: error.message, loading: false});
        }
    }, 
    
    //Inicializador de la escucha de autenticación
    //Detecta si el usuario ya estabaya logueado al recargar la página
    initAuth: () => {
       set({loading: true});

       //Escucha cambios en el token de Firebase como login, logout, etc.
       const unsubscribe = onAuthChange( async (authUser) => {
        if (authUser){
            //Si hay sesión activa, recupera el rol de Firestore 
            const docRef = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(docRef)
            const role = docSnap.exists() ? docSnap.data(). role : "user";
            set ({user: {...authUser, role}, loading: false});
        }else{
            //Si no hay sesión, se limpia el estado
            set({user: null, loading: false});
        }
       });
       return unsubscribe;
},
}));

export default useAuthStore;