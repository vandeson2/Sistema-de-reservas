import { getServices } from "../../services/service";
import {useBookingStore} from "../../store/bookingStore"
import { useState, useEffect } from "react";


export default function ServiceSelector(){
    const setSelectedService = useBookingStore ((state) => state.setSelectedService);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
                ¿Qué servicio deseas reservar?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {services.map((service) => (
                    <button
                        key={service.id}
                        value={service.id}
                        onClick={() => setSelectedService(service)}
                        className="bg-white shadow rounded-lg p-4 text-left hover:bg-green-100 transition"
                    >
                        <h3 className="text-lg font-bold">{service.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
}

