import ServiceSelector from "../../components/user/ServiceSelector";
import CalendarPicker from "../../components/user/CalendarPicker";
import TimeSelector from "../../components/user/TimeSelector";
import BookingForm from "../../components/user/BookingForm";
import ConfirmationModal from "../../components/user/ConfirmationModal";
import { useBookingStore } from "../../store/bookingStore";

const BookingPage = () =>{
    const {selectedService, selectedDate, selectedTime, showConfirmation, toggleConfirmation, bookingData } = useBookingStore();
    console.log("servicio seleccionado", selectedService);
    const handleConfirm = (bookingData) => {
        toggleConfirmation(false);
    }
       const handleCancel = () => {
        console.log("Reserva cancelada");
        toggleConfirmation(false); // Cerrar modal
    };
    return (
        <div>
            <h2>Reserva tu sesión</h2>

            <ServiceSelector />
            {selectedService?.name && <CalendarPicker />}
            {selectedService?.name && selectedDate ? (
                [0,6].includes(new Date(selectedDate).getDay()) ? (
                    <p>No hay horarios disponibles los fines de semana.</p>
            ):(
                <TimeSelector/> 
            )
            ):(
                <p>Selecciona una fecha para ver los horarios</p>
            )}
            {selectedService?.name && selectedDate && selectedTime && <BookingForm />}

            {showConfirmation && 
            <ConfirmationModal 
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />}
        </div>
    )
}
export default BookingPage;