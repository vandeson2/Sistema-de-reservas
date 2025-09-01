import { useState } from "react";
import { sendConfirmationEmail } from "../../utils/sendEmail";
import {saveReservation} from "../../utils/saveReservation"
import { useBookingStore } from "../../store/bookingStore";
import { getBookingsForDateAndService } from "../../services/firebase";

export default function ConfirmationModal({onConfirm, onCancel}){
    const [confirmed, setConfirmed] = useState(false);
    const bookingData = useBookingStore((state) => state.bookingData);

    const handleConfirm = () => {
        setConfirmed(true);
        onConfirm(bookingData)
    }

    if (!bookingData){
        return null; // No hay datos de reserva para mostrar
    }
    const formatDate = (date) => {
        if (date instanceof Date){
            return (
                `${bookingData.date.getDate().toString().padStart(2, '0')}/` +
                `${(bookingData.date.getMonth() + 1).toString().padStart(2, '0')}/` + 
                `${bookingData.date.getFullYear()}`
            );
        }
        return date;
    }

    const handleReservation = async () => {
        try{
            console.log("Verificando disponibilidad...");

            const existingBookings = await getBookingsForDateAndService(
                bookingData.date,
                bookingData.service.id
            );

            const bookingsForThisTime = existingBookings.filter(
                (b) => b.time === bookingData.time
            );

            
            if (bookingsForThisTime.length >= bookingData.service?.capacity) {
                alert("Este horario ya está completo. Por favor elige otro.");
                return;
            }

            console.log("Enviando email...");
            await sendConfirmationEmail(bookingData);

            console.log("Guardando reserva...");
            await saveReservation(bookingData);

            console.log("Confirmando reserva...");
            handleConfirm();
            alert("Reserva confirmada y correo enviado");

            //Recarga la página
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }catch (error) {
        console.error("Error al enviar el email o guardar reserva:", error);
        alert(
            `No se pudo completar la reserva. Error: ${
            error?.message || JSON.stringify(error)
            }`
        );
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-6 p-4 sm:p-6  w-full max-w-md mx-auto">
                {!confirmed ? (
                    <>
                    <h2 className="text-lg font-semibold">
                        Confirma la reserva
                    </h2>

                    <div className="space-y-3 text-gray-700">
                        <p>
                            <span className="font-medium text-gray-900">Servicio: </span>
                            {bookingData.service.name}
                        </p>
                    
                        <p>
                            <span className="font-medium text-gray-900">Fecha: </span>
                            {formatDate(bookingData.date)}
                        </p>    
                        <p>
                            <span className="font-medium text-gray-900">Hora: </span>
                            {bookingData.time}
                        </p>
                        <p>
                            <span className="font-medium text-gray-900">Nombre: </span>
                            {bookingData.fullName}
                        </p>
                        <p>
                            <span className="font-medium text-gray-900">Email: </span>
                            {bookingData.email}
                        </p>
                        <p>
                            <span className="font-medium text-gray-900">Teléfono: </span>
                            {bookingData.phone}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={handleReservation}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition font-medium"
                        >
                            Confirmar reserva
                        </button>
                    </div>
                    </>
                ) : (
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-semibold text-green-600">
                            ¡Reserva confirmada!
                        </h2>
                        <p className="text-gray-700">
                            Te llegará un correo con los detalles.
                        </p>

                        <button 
                            onClick={onCancel}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition font-medium"
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}