import {db} from "../firebase/config";
import { addDoc, collection }  from "firebase/firestore";


export  const saveReservation = async (bookingData) =>{
 try {
    // Formatear la fecha como string 'YYYY-MM-DD'
    const formattedDate = bookingData.date instanceof Date
      ? bookingData.date.toISOString().split("T")[0]
      : bookingData.date;

    //Extraer serviceId
    const serviceId = bookingData.service?.id;

    //  Crear datos limpios para guardar
    const cleanData = {
      ...bookingData,
      date: formattedDate,
      serviceId, 
    };

    const docRef = await addDoc(collection(db, "reservas"), cleanData);
    console.log("Reserva guardada con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    throw error;
  }
};

