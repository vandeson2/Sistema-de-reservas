import { useState } from "react";
import { sendConfirmationEmail } from "../../utils/sendEmail";
import {saveReservation} from "../../utils/saveReservation"
import { useBookingStore } from "../../store/bookingStore";


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
                            onClick={async () => {
                                try {
                                    console.log("Enviando email...")
                                    await sendConfirmationEmail(bookingData);
                                    console.log("Email enviado, guardando reserva")
                                    await saveReservation(bookingData);
                                    console.log("Reserva guardada, confirmando...")
                                    handleConfirm();
                                    alert('Reserva confirmada y correo enviado')
                                } catch (error) {
                                    console.error("Error al enviar el email o guardar:", error)
                                    alert(`No se puedo enviar el correo. Error: ${error?.message || JSON.stringfy(error)}`);
                                }
                            }}>
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