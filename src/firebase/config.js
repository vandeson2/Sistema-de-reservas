import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

/*Configuración de SDK de Firebase
  Variables (Vite) para proteger la información sensible
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

//Inicialización de los servicios de Firebase
//app: instancia principal de la aplicación
export const app = initializeApp(firebaseConfig);

//db: acceso a la base de datos
export const db = getFirestore(app);

//auth: gestión de autenticación de usuarios
export const auth = getAuth(app);

//googleProvider: configuración específica para el login con Google
export const googleProvider = new GoogleAuthProvider();