import {db} from "../firebase/config"
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore"
import { BookingData } from "../types/booking";

// Permite obtener las reservas
export const getAllBookings = async (): Promise<BookingData[]>=> {
    const snapshot = await getDocs(collection(db, "reservas"));
    return snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data() as BookingData,
    }));
};

//Eliminar reservas
export const deleteBookingById = async (id: string) : Promise<void>=>{
    const docRef = doc(db, "reservas", id);
    await deleteDoc(docRef);
};

//Consultas de reservas por fecha y servicio
export const getBookingsForDateAndService = async (date: Date | string, serviceId: string): Promise<BookingData[]> =>{
    const formattedDate = date instanceof Date
            ? date.toISOString().split("T")[0]
            : date;
    const q = query (
        collection(db, "reservas"),
        where("date", "==" , formattedDate),
        where("serviceId", "==", serviceId),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as BookingData);
};

// Consulta de reservas por email
export const getBookingsByEmail = async (email: string): Promise<BookingData[]> => {
    try {
        const q = query(
            collection(db, "reservas"),
            where("email", "==", email)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id, ...(doc.data() as BookingData),
        }));
    }catch (error) {
        console.error("Error al obtener reservas por email:", error);
        throw error;
    }
}