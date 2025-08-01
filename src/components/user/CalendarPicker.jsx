import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Estilos del calendario
import  {useBookingStore} from "../../store/bookingStore"

export default function CalendarPicker(){
    const selectedDate = useBookingStore((state) => state.selectedDate);
    const setSelectedDate = useBookingStore((state) => state.setSelectedDate);

    const handleDateChange = (date) => {
        setSelectedDate(date); //guarda la fecha en el estado
    };



    return(
        <div className="p-4 bg-hite shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Selecciona una fecha
            </h2>
            <div className="flex justify-center">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()} // No se puede seleccionar fechas pasadas
                    locale="es-ES"
                />
            </div>

            {selectedDate && (
                <p className="mt-4 text-center text-green-700 font-medium">
                    Has seleccionado: {" "}
                    <span className="font-semibold">
                            {selectedDate.getDate().toString().padStart(2, '0')}/
                            {(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/
                            {selectedDate.getFullYear()}
                   </span>
                </p>
            )}

        </div>
    )
}