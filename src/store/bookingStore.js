import { create } from "zustand";
import { getServices, updateServiceTimes } from "../services/service";

export const useBookingStore = create((set) => ({
     selectedService: null,
     selectedDate: null,
     selectedTime: null,
     bookingData: null,
     showConfirmation: false,
     searchTerm: "",
     services: [],

     //Métodos para actualizar estado
     setSelectedService: (service) => set({selectedService: service}),
     setSelectedDate: (date) => set ({selectedDate: date}),
     setSelectedTime: (time) => set ({selectedTime: time}),
     setBookingData: (bookingData) => set({bookingData}),
     toggleConfirmation: (value) => set({ showConfirmation: value}),
     setSearchTerm: (term) => set({searchTerm: term}),

     resetBooking: () => 
        set({
            selectedService: null,
            selectedDate: null,
            selectedTime: null,
            bookingData: null,
            showConfirmation: false,
        }),
    
        //Métodos para manejar horarios
        fetchServices: async () => {
            const data = await getServices();
            set({ services: data});
        },

        updateServiceTimes: async ( serviceId, schedules) => {
            await updateServiceTimes(serviceId, schedules);
            set((state) => ({
                services: state.services.map((serv) =>
                    serv.id === serviceId ? {...serv, schedules} : serv
                ),
            selectedService:
                state.selectedService?.id === serviceId
                ? {...state.selectedService, schedules}
                : state.selectedService,    
            }));
        },
}));