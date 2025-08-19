import { useEffect, useState } from "react";
import { useBookingStore } from "../../store/bookingStore";

export default function AdminTimes () {
    const { 
        services, 
        selectedService,
        setSelectedService,
        fetchServices,
        updateServiceTimes,
    } = useBookingStore();
    const [newSchedules, setNewSchedules] = useState("");

    // Cargar servicios al montar el componente
    useEffect(() => {
        fetchServices();
    }, [fetchServices])

    // Añadir horario
    const handleAddSchedules = async () => {
        if(!newSchedules || !selectedService) return;

        const updateSchedules = [...(selectedService.schedules || []), newSchedules];
        await updateServiceTimes(selectedService.id, updateSchedules);
        setNewSchedules("");
    };

    // Eliminar horarios
    const handleDeleteSchedules = async (schedules) => {
        if (!selectedService) return;

        const updateSchedules = selectedService.schedules.filter((hours) => hours !== schedules);
        await updateServiceTimes(selectedService.id, updateSchedules);
    };
    

    return (
        <div>
            <h2>Gestión de Horarios</h2>

            <select
                value={selectedService?.id || ""}
                onChange={(e) => {
                    const service = services.find((serv) => serv.id === e.target.value);
                    setSelectedService(service);
                }}
            >
                <option value="">-- Selecciona unu servicio --</option>
                {services.map((service) => (
                    <option 
                        key={service.id}
                        value={service.id}
                    >
                        {service.name}
                    </option>
                ))}
            </select>

            {selectedService && (
                <div>
                    <h3>Horarios de {selectedService.name}</h3>
                    <ul>
                      {selectedService.schedules?.map((hours) => (
                         <li key={hours}>
                            {hours}
                            <button
                                onClick={() => handleDeleteSchedules(hours)}
                            >
                                Eliminar
                            </button>
                         </li>
                      ))}  
                    </ul>

                    <div>
                        <input  
                            type="text"
                            value={newSchedules}
                            onChange={(e) => setNewSchedules(e.target.value)} 
                            placeholder="Ej: 15:00"
                        />
                        <button
                            onClick={handleAddSchedules}
                        >
                            Añadir horario
                        </button>
                    </div>
                </div>
            )}   
        </div>
    );
}