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

const useAuthStore = create((set) => ({
    user: null,
    loading: true,
    error: null,

    setUser: (user) => set({user}),
    
    logoutUser: async () => {
        try{
            await logout();
            set({user: null, error: null});
        }catch (error){
            set({error: error.message});
        }
    },

    loginUser: async (email, password) => {
        set ({loading: true, error: null});
        try {
            const user = await loginInWithEmail(email, password);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            const role = docSnap.exists() ? docSnap.data(). role : "user";
            set({user: {...user, role}, loading: false});
        }catch (error){
            set ({ error: error.message, loading: false});
        }
    },

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
    initAuth: () => {
       set({loading: true});
       const unsubscribe = onAuthChange( async (authUser) => {
        if (authUser){
            const docRef = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(docRef)
            const role = docSnap.exists() ? docSnap.data(). role : "user";
            set ({user: {...authUser, role}, loading: false});
        }else{
            set({user: null, loading: false});
        }
       });
       return unsubscribe;
},
}));

export default useAuthStore;