import {db} from "../firebase/config";
import { addDoc, collection }  from "firebase/firestore";


export  const saveReservation = async (bookingData) =>{
 try {
    // Formatear la fecha como string 'YYYY-MM-DD'
    const formattedDate = bookingData.date instanceof Date
      ? bookingData.date.toISOString().split("T")[0]
      : bookingData.date;

  

    //  Crear datos limpios para guardar
    const cleanData = {
      fullName: bookingData.fullName,
      email: bookingData.email,
      phone: bookingData.phone,
      date: formattedDate,
      time: bookingData.time,
      serviceId: bookingData.service?.id,
      serviceName:bookingData.service?.name,
    };

    const docRef = await addDoc(collection(db, "reservas"), cleanData);
    console.log("Reserva guardada con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    throw error;
  }
};

