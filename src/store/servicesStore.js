import { create } from "zustand";
import { createService, getServices, updateServiceCapacity} from"../services/service"

export const useServiceStore = create((set) => ({
    services: [],
    //Cargando servicios desde firebase
    fetchServices: async ()=> {
        const data = await getServices();
        set ({services: data});
        return data
    },

    updateCapacity: async ( id, newCapacity) => {
        await updateServiceCapacity(id, newCapacity);
        set ((state) => ({
            services: state.services.map((s) =>
            s.id === id? {...s, capacity:newCapacity} : s),
        }));
    },
    addService: async (service) => {
        const newService = await createService(service);
        set ((state) => ({services: [...state.services, newService]}));
    },
}));