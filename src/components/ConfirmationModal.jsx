import { useState } from "react";

export default function ConfirmationModal({bookingData, onConfirm, onCancel}){
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirm = () => {
        setConfirmed(true);
        onConfirm(bookingData)
    }

    if (!bookingData){
        return null; // No hay datos de reserva para mostrar
    }

    return (
        <div>
            <div>
                {!confirmed ? (
                    <>
                    <h2>Confirma la reserva</h2>
                    <div>
                        <p><strong>Servicio:</strong>{bookingData.service.name}</p>
                        <p><strong>Fecha:</strong>{bookingData.date instanceof Date
                            ?`${bookingData.date.getDate().toString().padStart(2, '0')}/` +
                             `${(bookingData.date.getMonth() + 1).toString().padStart(2, '0')}/` + 
                             `${bookingData.date.getFullYear()}`
                            : bookingData.date}</p>
                        <p><strong>Hora:</strong>{bookingData.time}</p>
                        <p><strong>Nombre:</strong>{bookingData.fullName}</p>
                        <p><strong>Email:</strong>{bookingData.email}</p>
                        <p><strong>Teléfono:</strong>{bookingData.phone}</p>
                    </div>
                    <div>
                        <button onClick={onCancel}>
                            Volver
                        </button>

                        <button onClick={handleConfirm}>
                            Confirmar
                        </button>
                    </div>
                    </>
                ) : (
                    <div>
                        <h2>¡Reserva confirmada!</h2>
                        <p>Te llegará un correo con los detalles</p>

                        <button conClick={onCancel}>
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}