
import { db }  from "../firebase/config";
import { Service } from "../types/booking";
import { collection, getDocs, getDoc, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

//Obtener todos los servicios
export const  getServices = async (): Promise<Service[]> => {
    try {
    const snapshot = await getDocs(collection(db, "services"));
    console.log("Docs en services:", snapshot.docs.length); 
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Service, "id">)
    })) as Service[];
}catch (error){
     console.error("Error obteniendo servicios:", error);
    return [];
}
};

//Agregar nuevos servicios
export const createService = async (ServiceData: Omit<Service, "id">): Promise<Service> => {
    const docRef = await addDoc(collection(db, "services"), ServiceData);
    return { id: docRef.id, ...ServiceData } as Service;
};

//Eliminar servicio por id
export const deleteServiceById = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "services", id));
};

//Obtener un servicio por id
export const getServiceById = async (id: string): Promise<Service> => {
    const docRef = doc(db, "services", id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()) {
        return {id: snapshot.id, ...(snapshot.data() as Omit<Service, "id">)} as Service;
    }else{
        throw new Error("Servicio no encontrado");
    }
};

// Actualizar la capacidad del servicio
export const updateServiceCapacity = async (id: string, newCapacity: number): Promise<void> => {
    const docRef = doc(db, "services", id);
    await updateDoc(docRef, {capacity: newCapacity});
}

// Actualizar horarios en un servicio
export const updateServiceTimes = async (id: string, schedules: string[]): Promise<void> => {
    const docRef = doc (db, "services", id);
    await updateDoc(docRef, {schedules});
}