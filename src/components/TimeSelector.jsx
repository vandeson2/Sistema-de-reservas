import { useState, useEffect } from "react";

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

export default function TimeSelector({selectedDate, onTimeSelect}){
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            setAvailableTimes(defaultTimeSlot);
            setSelectedTime(null);
        }
    }, [selectedDate]);

    const handleTimeClick = (time) =>{
        setSelectedTime(time); //marca,mos como seleccionado
        onTimeSelect(time); // Enviar la hora seleccionada al componente padre
    }

    return (
        <div>
            <h2>
                Elige un horario
            </h2>
            <div>
                {availableTimes.map((time) => (
                    <button
                        key={time}
                        onClick={() => handleTimeClick(time)}
                        className={`py-2 px-3 rounded-lg border
                        ${selectedTime === time
                            ? 'bg-green-500 text-white font-bold'
                            : 'bg-gray-100 hover:bg-green-100'
                        }`}
                    >
                        {time}
                    </button>    
                ))}
            </div>

            {selectedTime && (
                <p>
                    Has seleccionado: <strong>{selectedTime}</strong>
                </p>
            )}
        </div>
    );
}