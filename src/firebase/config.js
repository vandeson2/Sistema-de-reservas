import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ApiKey", // desabilitado
  authDomain: "reservas-5ccf8.firebaseapp.com",
  projectId: "reservas-5ccf8",
  storageBucket: "reservas-5ccf8.firebasestorage.app",
  messagingSenderId: "626338283168",
  appId: "1:626338283168:web:d36a5b7a087dcd7d1ad3c5"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);