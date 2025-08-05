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
            <div>
                {!confirmed ? (
                    <>
                    <h2>Confirma la reserva</h2>
                    <div>
                        <p><strong>Servicio:</strong>{bookingData.service.name}</p>
                        <p><strong>Fecha:</strong>{formatDate(bookingData.date)}</p>    
                        <p><strong>Hora:</strong>{bookingData.time}</p>
                        <p><strong>Nombre:</strong>{bookingData.fullName}</p>
                        <p><strong>Email:</strong>{bookingData.email}</p>
                        <p><strong>Teléfono:</strong>{bookingData.phone}</p>
                    </div>
                    <div>
                        <button onClick={onCancel}>
                            Volver
                        </button>

                        <button
                            onClick={handleReservation}
                        >
                            Confirmar reserva
                        </button> 
                    </div>
                    </>
                ) : (
                    <div>
                        <h2>¡Reserva confirmada!</h2>
                        <p>Te llegará un correo con los detalles</p>

                        <button onClick={onCancel}>
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}