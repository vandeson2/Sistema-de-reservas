import { getServices } from "../../services/service";
import {useBookingStore} from "../../store/bookingStore"
import { useState, useEffect } from "react";

/*
Componente de entrada para el flujo de reservas.
lista las opciones disponibles desde la base de datos y permite al usuario seleccionar el servicio.
 */
export default function ServiceSelector(){
    // Acceso a Zustand -> Guarda el servicio elegindo.
    const setSelectedService = useBookingStore ((state) => state.setSelectedService);
    
    
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

   // Ejecuta la carga inicial de datos al montar el componente. 
    useEffect (() => {

        const fetch = async () => {
            try {
               const data = await getServices();
               setServices(data);
            }catch (error){
                console.log("Error al cargar servicios", error);
            }finally{
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) return <p>Cargando servicios ...</p>

    return(
        <div className="flex flex-col justify-center gap-2 p-2 w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
                ¿Qué servicio deseas reservar?
            </h2>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            value={service.id}
                            onClick={() => setSelectedService(service)} 
                            className="bg-white shadow rounded-lg p-2 hover:bg-green-100 transition"
                        >
                            <h3 className="text-lg font-bold text-center">{service.name}</h3>
                        </button>
                    ))}
                </div>
            </div>    
        </div>
    );
}

