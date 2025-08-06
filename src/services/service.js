
import { db }  from "../firebase/config";
import { collection, getDocs, getDoc, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";


//Obtener todos los servicios
export const  getServices = async () => {
    try {
    const snapshot = await getDocs(collection(db, "services"));
    console.log("Docs en services:", snapshot.docs.length);
    snapshot.docs.forEach(doc => {
      console.log(doc.id, doc.data());
    }) 
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}catch (error){
     console.error("Error obteniendo servicios:", error);
    return [];
}
};

//Agregar nuevos servicios
export const createService = async ({name, capacity}) => {
    const docRef = await addDoc(collection(db, "services"), {name, capacity});
    return { id: docRef.id, name, capacity };
};

//Eliminar servicio por id
export const deleteServiceById = async (id) => {
    await deleteDoc(doc(db, "services", id));
};

//Obtener un servicio por id
export const getServiceById = async (id) => {
    const docRef = doc(db, "services", id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()) {
        return {id: snapshot.id, ...snapshot.data()};
    }else{
        throw new Error("Servicio no encontrado");
    }
};

// Actualizar la capacidad del servicio
export const updateServiceCapacity = async (id, newCapacity) => {
    const docRef = doc(db, "services", id.toString());
    await updateDoc(docRef, {capacity: newCapacity});
}