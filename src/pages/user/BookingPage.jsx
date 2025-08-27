import ServiceSelector from "../../components/user/ServiceSelector";
import CalendarPicker from "../../components/user/CalendarPicker";
import TimeSelector from "../../components/user/TimeSelector";
import BookingForm from "../../components/user/BookingForm";
import ConfirmationModal from "../../components/user/ConfirmationModal";
import { useBookingStore } from "../../store/bookingStore";
import "../../index.css";


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
        <div className="max-w-3xl mx-auto p-2 sm:p-4 border rounded-lg bg-gray-50 shadow-md  flex flex-col 
                        gap-2 min-h-screen">
            <h2 className="text-center text-2xl text-gray-800">Reserva tu sesión</h2>

            <div
                className="animate-fadeIn delay-0" >
                <ServiceSelector />
            </div>

            
            {selectedService?.name && (
                <div className="animate-slideUp delay-200 ">
                    <CalendarPicker />
                </div>
                )}
            {selectedService?.name && selectedDate && (
                <div className="animate-slideUp delay-400  ">
                {[0,6].includes(new Date(selectedDate).getDay()) ? (
                    <p className="text-red-500 text-sm">
                        No hay horarios disponibles los fines de semana.
                    </p>
            ):(
                <TimeSelector/> 

            )}
            </div>    
            )}
            {selectedService?.name && selectedDate && selectedTime && 
            <div className="animate-fadeInScale delay-600">
                <BookingForm />
            </div>
        }

            {showConfirmation && (
            <div className="animate-fadeInScale delay-200">
                    <ConfirmationModal 
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
            </div>
        )}
        </div>
    )
}
export default BookingPage;