import { use } from "react";
import { useBookingStore } from "../../store/bookingStore"; 
import { useState, useEffect } from "react";
import {getBookingsForDateAndService} from "../../services/firebase";



// Lista de horarios disponibles
const defaultTimeSlot = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
];

const maxReservationsPerSlot = 2;

export default function TimeSelector(){
    const selectedDate = useBookingStore((state) => state.selectedDate);
    const selectedTime = useBookingStore((state) => state.selectedTime);
    const selectedService = useBookingStore((state) => state.selectedService);
    const setSelectedTime = useBookingStore((state) => state.setSelectedTime);

    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchBookings = async () => {
      if (!selectedDate || !selectedService) return;

      try {
        // 1. Obtener reservas para esa fecha y servicio
        const bookings = await getBookingsForDateAndService(selectedDate, selectedService.id);

        // 2. Contar reservas por hora
        const timeCount = {};
        bookings.forEach((booking) => {
            const hours = booking.time;
          timeCount[hours] = (timeCount[hours] || 0) + 1;
        });

        // 3. Filtrar horas disponibles (máx. 2 reservas por hora)
        const filtered = defaultTimeSlot.filter((time) => (timeCount[time] || 0) < 2);
        
        setAvailableTimes(filtered);
        setSelectedTime(null); // Reiniciar selección
      } catch (error) {
        console.error("Error al cargar reservas:", error);
        setAvailableTimes(defaultTimeSlot); // Fallback
      }
      setLoading(false)
    };

    fetchBookings();
  }, [selectedDate, selectedService, setSelectedTime]);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  if (!selectedDate || !selectedService) return null;
  if(loading) return <p>Cargando horarios disponibles...</p>



    return (
        <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">Selecciona una hora:</h3>
      <div className="grid grid-cols-4 gap-3">
        {defaultTimeSlot.map((time) => {
          const isDisabled = !availableTimes.includes(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              disabled={isDisabled}
              className={`px-4 py-2 rounded border
                ${isDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-100 border-blue-300"}`}
            >
              {time}{isDisabled && "(Lleno)"}
            </button>
          );
        })}
      </div>
    </div>
    );
}