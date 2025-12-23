import {db} from "../firebase/config";
import { addDoc, collection }  from "firebase/firestore";
import { BookingData } from "../types/booking.ts";


export  const saveReservation = async (bookingData: BookingData): Promise<string> =>{
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
      serviceId: bookingData.service?.id || "no-Id",
      serviceName:bookingData.service?.name || "no-name",
    };

    const docRef = await addDoc(collection(db, "reservas"), cleanData);
    console.log("Reserva guardada con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    throw error;
  }
};

