import ServiceSelector from "../../components/user/ServiceSelector";
import CalendarPicker from "../../components/user/CalendarPicker";
import TimeSelector from "../../components/user/TimeSelector";
import BookingForm from "../../components/user/BookingForm";
import ConfirmationModal from "../../components/user/ConfirmationModal";
import { useBookingStore } from "../../store/bookingStore";
import "../../index.css"; 
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";

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

const BookingPage = () =>{
    const {selectedService, selectedDate, selectedTime, showConfirmation, toggleConfirmation, bookingData,
            setSelectedService, setSelectedDate, setSelectedTime
     } = useBookingStore();

     const [direction, setDirection] = useState(1);

     const goNext = () => setDirection(1);
     const goBack = () => setDirection(-1);

    console.log("servicio seleccionado", selectedService);
    const handleConfirm = (bookingData) => {
        toggleConfirmation(false);
    }
       const handleCancel = () => {
        console.log("Reserva cancelada");
        toggleConfirmation(false); // Cerrar modal
    };
    return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 flex flex-col gap-6 relative overflow-hidden">
                
                <h2 className="text-center text-2xl  sm:text-3xl text-gray-800">
                    Reserva tu sesión
                </h2>

                <AnimatePresence custom={direction} mode="wait">
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
                    </motion.div>
                    )}
            </AnimatePresence>
            </div>
        </div>
    )
}
export default BookingPage;