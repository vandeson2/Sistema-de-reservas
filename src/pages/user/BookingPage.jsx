import ServiceSelector from "../../components/user/ServiceSelector";
import CalendarPicker from "../../components/user/CalendarPicker";
import TimeSelector from "../../components/user/TimeSelector";
import BookingForm from "../../components/user/BookingForm";
import ConfirmationModal from "../../components/user/ConfirmationModal";
import { useBookingStore } from "../../store/bookingStore";
import "../../index.css"; 
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import { div } from "framer-motion/client";

//Define las animaciones de deslizamiento lateral.
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// Componente del proceso de reservas. Gestiona un formulario multi-paso utilizando un estado global.
const BookingPage = () =>{

    //ESTADO GLOBAL(Zustand)
    //Extraemos los datos de la reserva y la funciones para actualizar el store.
    const {selectedService, selectedDate, selectedTime, showConfirmation, toggleConfirmation, bookingData,
            setSelectedService, setSelectedDate, setSelectedTime
     } = useBookingStore();

     //ESTADO LOCAL --- Controla el sentio de la animación
     const [direction, setDirection] = useState(1);

     //Actualiza la dirección antes de cambiar de paso
     const goNext = () => setDirection(1);
     const goBack = () => setDirection(-1);

    //Gestiona la confirmación de la reserva
    console.log("servicio seleccionado", selectedService);
    const handleConfirm = (bookingData) => {
        toggleConfirmation(false);
    };
    //Gestiona la cancelación de la reserva
    const handleCancel = () => {
    console.log("Reserva cancelada");
        toggleConfirmation(false); // Cerrar modal
    };
    return (

        <div className="w-full min-h-screen bg-gray-50 flex flex-col">

            <UserHeader />

            <div className="flex items-start justify-center px-4 sm:px-6 lg:px-8">

                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 flex flex-col gap-6 relative overflow-hidden mt-10">
                    
                    <h2 className="text-center text-2xl  sm:text-3xl text-gray-800">
                        Reserva tu sesión
                    </h2>

                    <AnimatePresence custom={direction} mode="wait">
                        {/*1. Selección de servicio */}
                        {!selectedService && (
                        <motion.div
                            key="service"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className=" flex flex-col gap-4 lg:flex-row"
                        >
                            <ServiceSelector
                            onSelect={(service) => {
                                setSelectedService(service);
                                goNext();
                            }}
                            />
                        </motion.div>
                        )}

                        {/*2. Selección de fecha mediante Calendario */}
                        {selectedService && !selectedDate && (
                        <motion.div
                            key="calendar"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-4"
                        >
                            <CalendarPicker
                            onSelectDate={(date) => {
                                setSelectedDate(date);
                                goNext();
                            }}
                            />
                            <button
                            className="self-start text-sm sm:text-base text-blue-600 hover:text-blue-800 transition"
                            onClick={() => {
                                setSelectedService(null);
                                goBack();
                            }}
                            >
                                Atrás
                            </button>
                        </motion.div>
                        )}

                        {/*3. Selección de horario */}
                        {selectedService && selectedDate && !selectedTime && (
                        <motion.div
                            key="time"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-4"
                        >
                            {[0, 6].includes(new Date(selectedDate).getDay()) ? (
                            <p className="text-red-500 text-sm sm:text-base">
                                No hay horarios disponibles los fines de semana.
                            </p>
                            ) : (
                            <TimeSelector
                                onSelectTime={(time) => {
                                setSelectedTime(time);
                                goNext();
                                }}
                            />
                            )}
                            <button
                            className="self-start text-sm sm:text-base text-blue-600 hover:text-blue-800 transition"
                            onClick={() => {
                                setSelectedDate(null);
                                goBack();
                            }}
                            >
                            Atrás
                            </button>
                        </motion.div>
                        )}

                        {/*4. Formulario de datos del cliente */}
                        {selectedService && selectedDate && selectedTime && !showConfirmation && (
                        <motion.div
                            key="form"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-4"
                        >
                            <BookingForm
                            selectedService={selectedService}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onSubmit={() => toggleConfirmation(true)}
                            />
                            <button
                            className="self-start text-sm sm:text-base text-blue-600 hover:text-blue-800 transition"
                            onClick={() => {
                                setSelectedTime(null);
                                goBack();
                            }}
                            >
                            Atrás
                            </button>
                        </motion.div>
                        )}

                        {/*5. Confirmación final */}
                        {showConfirmation && (
                        <motion.div
                            key="confirmation"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-4"
                        >
                            <ConfirmationModal
                            onConfirm={() => {}}
                            onCancel={() => toggleConfirmation(false)}
                            />
                            <button
                                className="self-start text-sm sm:text-base text-blue-600 hover:text-blue-800 transition"
                                onClick={() => {
                                    toggleConfirmation(false);
                                    goBack();
                                }}
                                
                            >
                                Atrás
                            </button>
                        </motion.div>
                        
                        )}
                    
                </AnimatePresence>
                </div>
            </div>
        </div>    
    )
}
export default BookingPage;