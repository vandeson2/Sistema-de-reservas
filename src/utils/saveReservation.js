import {db} from "../firebase/config";
import { addDoc, collection }  from "firebase/firestore";


export  const saveReservation = async (bookingData) =>{

    try {
        const docRef = await addDoc(collection(db, "reservas"), bookingData);
        console.log("Reserva guarda con ID:", docRef.id);
        return docRef.id;
    }catch (error) {
        console.error("Error al guardar la reserva:", error);
        throw error;
    }    
}
