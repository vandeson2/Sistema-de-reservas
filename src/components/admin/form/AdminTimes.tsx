import { useEffect, useState } from "react";
import { useBookingStore } from "../../../store/bookingStore";
import { useNavigate } from "react-router-dom";
import { label } from "framer-motion/client";
import { Service } from "../../../types/booking";

interface AdminTimesProps {
    service: Service | null;
    onClose: () => void;
}
//Gestriona la disponibilidad horaria de los servicios.
export default function AdminTimes ({service, onClose}: AdminTimesProps) {
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

    // servicios pasados por prop
    useEffect(() => {
        if(service){
        fetchServices();
        setSelectedService(service);
        }
    }, [service, setSelectedService, fetchServices])

    // Añadir horario
    const handleAddSchedules = async () => {
        if(!newSchedules || !selectedService) return;

        const updateSchedules = [...(selectedService.schedules || []), newSchedules];
        await updateServiceTimes(selectedService.id, updateSchedules);
        setNewSchedules("");
    };

    // Eliminar horarios
    const handleDeleteSchedules = async (schedules: string) => {
        if (!selectedService) return;

        const updateSchedules = (selectedService.schedules || []).filter((hours) => hours !== schedules);
        await updateServiceTimes(selectedService.id, updateSchedules);
    };
    

    return (
        <div className="space-y-4">
            <h3 className="text-xl md:text-3xl font-semibold text-center p-2 md:p-4">
                {selectedService? selectedService.name : "seleccionar un servicio"}
            </h3>
            {!service && (
            <div>    
                <label htmlFor="selectedService" className="label-style mb-2">Seleccionar servicio</label>    
                <select
                    id="selectedService"
                    value={selectedService?.id || ""}
                    className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus-ring-blue-500 transition"
                    onChange={(e) => {
                        const found = services.find((serv) => serv.id === e.target.value);
                        setSelectedService(found || null);
                    }}
                >
                    <option value="">--Seleccionar--</option>
                    {services.map((service) => (
                        <option 
                            key={service.id}
                            value={service.id}
                        >
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>
            )}

            {selectedService && (
                <div> 
                    {selectedService.schedules && selectedService.schedules.length > 0 ? (
                    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200  bg-whit shandow-sm max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-2 md:mb-4 ">
                      {selectedService.schedules?.map((hours) => (
                         <li key={hours} className="flex justify-between items-center border p-2 rounded px-4 py-3 bg-gray-50 transition-colors">
                            <span className="text-gray-700 font-semibold">{hours}</span>

                            <button
                                type="button"
                                onClick={() => handleDeleteSchedules(hours)}
                                className="px-3 py-1 rounded text-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Eliminar
                            </button>
                         </li>
                      ))}  
                    </ul>
                    ):(
                    <p>No hay horarios disponibles</p>
                    )}
                    <div className="flex gap-2">
                        <input  
                            type="text"
                            value={newSchedules}
                            onChange={(e) => setNewSchedules(e.target.value)} 
                            placeholder="Ej: 15:00"
                            className="input-style"
                        />
                        <button
                            onClick={handleAddSchedules}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                        >
                            Añadir
                        </button>
                    </div>
                </div>
            )}   
            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Cerrar
                </button>
                 
            </div>
        </div>
    );
}