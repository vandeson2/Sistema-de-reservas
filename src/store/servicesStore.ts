import { create } from "zustand";
import { Service } from "../types/booking";
import { createService, getServices, updateServiceCapacity, deleteServiceById} from"../services/service"

interface ServiceState {
    services: Service[];
    fetchServices: () => Promise<Service[]>;
    updateCapacity: (id: string, newCapacity: number) => Promise<void>;
    addService: (service : Omit<Service, "id">) => Promise<void>;
    deleteService: (id: string) => Promise<void>;
}

//Gestión del catálogo de servicios
export const useServiceStore = create<ServiceState>((set) => ({
    // Estado inicial
    services: [],

    //Cargando servicios desde firebase
    fetchServices: async ()=> {
        const data = await getServices();
        set ({services: data});
        return data
    },

    // Actualiza la capacidad de un servicio en específico
    updateCapacity: async ( id, newCapacity) => {
        await updateServiceCapacity(id, newCapacity);
        set ((state) => ({
            services: state.services.map((s) =>
            s.id === id? {...s, capacity:newCapacity} : s),
        }));
    },

    //Crea un nuevo servicio y lo añade a la lista actual.
    addService: async (service) => {
        const newService = await createService(service);
        set ((state) => ({services: [...state.services, newService]}));
    },

    //Elimina un servicio por ID
    deleteService:  async (id)  => {
        try{
            await deleteServiceById(id);
            set ((state) => ({
                services: state.services.filter((s) => s.id !== id), 
            }));
        }catch (error) {
            console.log("Error al eliminar el servicio:",  error)
        }
    },
}));