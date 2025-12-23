import { create } from "zustand";
import { BookingData, Service } from "../types/booking";
import { getServices, updateServiceTimes } from "../services/service";
import { getAllBookings,
         deleteBookingById,
         getBookingsForDateAndService,
         getBookingsByEmail
 } from "../services/firebase"


//Interfaz para el estado y métodos del store de reservas
interface BookingState {
    //Estado del proceso de reserva
    selectedService: Service | null;
    selectedDate: Date | string | null;
    selectedTime: string | null;
    bookingData: BookingData | null;
    showConfirmation: boolean;
    searchTerm: string;
    services: Service[];
    bookings: any[];
    loadingBookings: boolean;
    errorBookings: any | null;

    // Métodos para actualizar el estado
    setSelectedService: (service: Service | null ) => void;
    setSelectedDate: (date: Date | string | null) => void;
    setSelectedTime: (time: string | null) => void;
    setBookingData: (bookingData: BookingData | null) => void;
    toggleConfirmation: (value: boolean) => void;
    setSearchTerm: ( term: string) => void;

    //Resetea el formulario de reservas
    resetBooking: () => void;

    //Métodos para servicios
    fetchServices: () => Promise<void>;
    updateServiceTimes: ( serviceId: string, schedules: any) => Promise<void>;

    //Métodos para gestión de reservas
    fetchAllBookings: () => Promise<void>;
    deleteBookingById: (id: string) => Promise<void>;
    fetchBookingsForDateAndService: ( date: string, serviceId: string) => Promise<any>;
    fetchBookingsByEmail: ( email:string) => Promise<any>;


 
} 
export const useBookingStore = create<BookingState>((set, get) => ({
    //Estado inicial del proceso de reserva
     selectedService: null,
     selectedDate: null,
     selectedTime: null,
     bookingData: null,
     showConfirmation: false,
     searchTerm: "",
     services: [],
     bookings: [],
     loadingBookings: false,
     errorBookings: null,

     //Métodos para actualizar estado
     setSelectedService: (service) => set({selectedService: service}),
     setSelectedDate: (date) => set ({selectedDate: date}),
     setSelectedTime: (time) => set ({selectedTime: time}),
     setBookingData: (bookingData) => set({bookingData}),
     toggleConfirmation: (value) => set({ showConfirmation: value}),
     setSearchTerm: (term) => set({searchTerm: term}),

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
        updateServiceTimes: async ( serviceId: string, schedules: any) => {
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
                set({loadingBookings: true});
                const data = await getAllBookings();
                set({bookings:data, loadingBookings: false});
            }catch (error){
                console.error("Error fetching bookings:", error);
                set({errorBookings: error, loadingBookings: false});
            }
        },

        deleteBookingById: async (id: string) => {
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
        fetchBookingsForDateAndService: async (date: string, serviceId: string) =>{
            return await getBookingsForDateAndService(date, serviceId);
        },
        fetchBookingsByEmail: async (email: string) => {
            return await getBookingsByEmail(email);
        },

}));