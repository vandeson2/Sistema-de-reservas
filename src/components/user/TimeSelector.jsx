import { useBookingStore } from "../../store/bookingStore"; 
import { useState, useEffect } from "react";
import {getBookingsForDateAndService} from "../../services/firebase";


/*Gestiona la disponibilidad de horarios en tiempo real.
Cruza la información de las reservas existentes con la capacidad máxima del servicio 
para deshabilitar horarios agotados*/
export default function TimeSelector(){
  //Acceso a Zustand -> guarda los datos elegidos
    const selectedDate = useBookingStore((state) => state.selectedDate);
    const selectedTime = useBookingStore((state) => state.selectedTime);
    const selectedService = useBookingStore((state) => state.selectedService);
    const setSelectedTime = useBookingStore((state) => state.setSelectedTime);

    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    

    // Carga datos de API al Montar el componente
    useEffect(() => {
        const fetchBookings = async () => {
      if (!selectedDate || !selectedService) return;

      try {
        //Obtener reservas para esa fecha y servicio
        const bookings = await getBookingsForDateAndService(selectedDate, selectedService.id);

        //Contar reservas por hora
        const timeCount = {};
        bookings.forEach((booking) => {
            const hours = booking.time;
          timeCount[hours] = (timeCount[hours] || 0) + 1;
        });

        //horarios de servicios desde firestore
        const serviceTimes = selectedService.schedules || [];

        //Filtrar horas disponibles (máx. 2 reservas por hora)
        const filtered = serviceTimes.filter((time) => (timeCount[time] || 0) < selectedService?.capacity);
        
        setAvailableTimes(filtered);
        setSelectedTime(null); // Reiniciar selección
      } catch (error) {
        console.error("Error al cargar reservas:", error);
        setAvailableTimes(selectedService.schedules || []); // Fallback
      }
      setLoading(false)
    };

    fetchBookings();
  }, [selectedDate, selectedService, setSelectedTime]);

  //Actualiza el estado global con la hora elegida
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  if (!selectedDate || !selectedService) return null;
  if(loading) return <p>Cargando horarios disponibles...</p>



    return (
      <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Selecciona una hora:</h2>
      <div className="grid grid-cols-4 gap-2">
        {selectedService.schedules?.map((time) => {
          const isDisabled = !availableTimes.includes(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              disabled={isDisabled}
              className={`bg-white shadow rounded-lg p-2
                ${isDisabled
                  ? "bg-gray-300 text-gray-500 font-bold cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-white font-bold hover:bg-blue-100 border-blue-300"}`}
            >
              {time}{isDisabled && "(Lleno)"}
            </button>
          );
        })}
      </div>
    </div>
    );
}