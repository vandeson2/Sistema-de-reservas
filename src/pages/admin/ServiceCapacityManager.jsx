import {  useEffect, useState } from "react";
import { useServiceStore } from "../../store/servicesStore";
import { useNavigate } from "react-router-dom";

const ServiceCapacityManager = () => {
    const {services, fetchServices, updateCapacity} = useServiceStore();
    const [loading, setLoading] =  useState(true);
    const navigate = useNavigate();

    useEffect (() => {
        console.log("Ejecutando fetchServices..")
        fetchServices().then((data) => {
            console.log("servicios cargados correctamente", data);
        setLoading(false);

    })
    .catch ((error) => {
    console.log("Error al cargar el servicio", error);
    setLoading(false);
    });
    }, []);

    const handleChange = (id, newCapacity)  => {
        if (!isNaN(newCapacity) && Number(newCapacity) >=1){
            updateCapacity(id, Number(newCapacity));
        }
    };

    if (loading) return <p>Cargando servicios...</p>
    if (services.length === 0) return <p>No hay servicios disponibles.</p>
        
    

    return (
        <div>
            <h2>Gestión de Capacidad por Servicios</h2>
            <div>
            {services.map((service) => (
                <div key={service.id}> 
                    <div>
                        <p><strong>{service.name}</strong></p>
                    </div>
                    <div>
                        <input 
                            type="number"
                            value={service.capacity || 2}
                            onChange={(e) => handleChange(service.id, e.target.value)}
                            min={1}
                        />
                    </div>
                </div>
            ))}
            </div>
            <div>
                <button onClick={() => navigate("/admin")}>
                    Volver
                </button>
            </div>
        </div>
    );
};

export default ServiceCapacityManager;