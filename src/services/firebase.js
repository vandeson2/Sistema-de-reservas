import {db} from "../firebase/config"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"

// Permite obtener las reservas
export const getAllBookings = async () => {
    const snapshot = await getDocs(collection(db, "reservas"));
    return snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data()
    }));
};

export const deleteBookingById = async (id) =>{
    const docRef = doc(db, "reservas", id);
    await deleteDoc(docRef);
};