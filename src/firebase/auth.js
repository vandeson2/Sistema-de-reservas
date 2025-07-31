import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};

export {auth};
