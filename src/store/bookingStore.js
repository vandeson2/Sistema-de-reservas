import { create } from "zustand";

export const useBookingStore = create((set) => ({
     selectedService: null,
     selectedDate: null,
     selectedTime: null,
     bookingData: null,
     showConfirmation: false,
     searchTerm: "",

     //Métodos para actualizar
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
        })

}))