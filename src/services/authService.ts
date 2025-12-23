import { 
        createUserWithEmailAndPassword,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signInWithPopup,
        signOut,
        User
} from "firebase/auth";
import { CustomUser } from "../types/CustomUser";
import { doc, setDoc, getDoc, serverTimestamp, deleteDoc } from "firebase/firestore"
import { db, auth, googleProvider } from "../firebase/config";

//-----Registrar usuarios con  correo y contraseña y crear su doc en firestore
export async function signInWithEmail (email: string, password: string, displayName: string | null = null
): Promise<User>{
    const credential = await createUserWithEmailAndPassword (auth, email, password);
    const user = credential.user;
    const userRef = doc(db, "users", user.uid);

    //Guardar los datos en fireStore
    await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName,
        role: "user",
        createdAt: serverTimestamp()
    });
    return user;
}

//------ Login con email
 export async function loginInWithEmail(email: string, password: string): Promise<User>{
    const credential =  await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
 }



// ------Login con google 
export async function signInWithGoogle(): Promise<User>{
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    // si es nuevo, se crea un doc en user
    if (!snap.exists()){
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || null,
            role: "user",
            createdAt: serverTimestamp()
        });
    }
    return user;
}


//------ Cerrar sesión
export async function logout (): Promise<void>{
    await signOut(auth);
}

//------Eliminar usuario
export async function deletedUser (uid: string): Promise<void>{
 try{
    await deleteDoc(doc(db, "users", uid));
 }catch (error){
    throw error;
 }
}


// ------Obtener rol de Firebase
export async function getUserRole(uid: string): Promise<"admin" | "user" | null>{
    if(!uid) return null;
    const snap = await getDoc(doc(db, "users", uid));
    if(!snap.exists()) return null;
    return (snap.data().role as "admin" | "user" ) || null;

}

//-------Listener de cambios de sesión
export function onAuthChange(callback: (user: CustomUser | null)  => void){
    return onAuthStateChanged(auth, async (user) => {
        if(!user){
            callback(null);
            return;
        }
        const role = await getUserRole(user.uid);
        callback({
            ...user,
            role: role || "user",
        } as CustomUser);
    });
}