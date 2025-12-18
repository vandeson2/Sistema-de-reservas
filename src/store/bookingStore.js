import { create } from "zustand";
import { getServices, updateServiceTimes } from "../services/service";
import { getAllBookings,
         deleteBookingById,
         getBookingsForDateAndService,
         getBookingsByEmail
 } from "../services/firebase";

export const useBookingStore = create((set, get) => ({
    //Estado inicial del proceso de reserva
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

     //Estados para reservas 
     bookings: [],
     loadingBookings: false,
     errorBookings: null,

    //Limpia el formulario de reservar para permitir una nueva entrada de datos.     
     resetBooking: () => 
        set({
            selectedService: null,
            selectedDate: null,
            selectedTime: null,
            bookingData: null,
            showConfirmation: false,
        }),


    
        //Métodos para servicios -> obtiene y sincroniza la lista de servicios desde la BBDD
        fetchServices: async () => {
            const data = await getServices();
            set({ services: data});
        },

        //Actualiza los horarios de un servicio y sincroniza el estado local.
        updateServiceTimes: async ( serviceId, schedules) => {
            await updateServiceTimes(serviceId, schedules);
            set((state) => ({
                //Actualiza el servicio dentro del array de servicios
                services: state.services.map((serv) =>
                    serv.id === serviceId ? {...serv, schedules} : serv
                ),
            // Si el servicio editado es el que el usuarui tiene seleccionado, actualiza su horario.    
            selectedService:
                state.selectedService?.id === serviceId
                ? {...state.selectedService, schedules}
                : state.selectedService,    
            }));
        },

        //Gestión de reservas
        fetchAllBookings: async () => {
            try{
                set({loadingBookings:true});
                const data = await getAllBookings();
                set({bookings:data, loadingBookings: false});
            }catch (error){
                console.error("Error fetching bookings:", error);
                set({errorBookings: error, loadingBookings: false});
            }
        },

        deleteBookingById: async (id) => {
            try {
                await deleteBookingById(id);
                set((state) => ({
                    bookings: state.bookings.filter((booking) => booking.id !== id),
                }));
            }catch (error){
                console.error("Error al eliminar la reserva:", error);
            }
        },

        // No actualizan el store directamente sino que actúan como puente hacia los servicios
        fetchBookingsForDateAndService: async (date, serviceId) =>{
            return await getBookingsForDateAndService(date, serviceId);
        },
        fetchBookingsByEmail: async (email) => {
            return await getBookingsByEmail(email);
        },

}));