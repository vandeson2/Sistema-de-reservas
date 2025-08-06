import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceStore } from "../../store/servicesStore";


const  ServcieDashboard = () => {

    const {services, fetchServices, updateCapacity, deleteService} = useServiceStore();
    const [loading, setLoading] = useState(true);
    const [editedCapacity, setEditedCapacity] = useState({});
    const navigate = useNavigate();


       const loadServices = async () => {
        console.log("Ejecutando fetchServices...");

        try{
           const data = await fetchServices();
           console.log("Servicios cargados correctamente: ", data) 
        }catch (error){
            console.error("Error al carga los servicios:", error)
        }finally{
            setLoading(false);
        }
       };

    //Eliminar servicio
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quiere eliminar este servicio?")){
            await deleteService(id);
        }
    };  

    //Actualizar capacidad
    const handleCapacityChange = (id, value) => {
        setEditedCapacity(prev => ({...prev, [id]: value}));
    };

    const handleUpdateCapacity = async (id) => {
        const newCapacity = parseInt(editedCapacity[id]);
        if(!isNaN(newCapacity)){
            await updateCapacity(id, newCapacity);
            loadServices();
            setEditedCapacity("");
        }
    };

    useEffect (() => {
        loadServices();
    }, []);

    return (
        <div>
           <h2>Gestión de Servicios</h2>

           <button onClick={() => navigate("/admin")}>Volvel al Panel</button>
           <button onClick={() => navigate("/admin/newService")}>Crear nuevo servicio</button>

           {loading ? (
            <p>Cargando servicios...</p>
           ) : services.length === 0 ?(
            <p>No hay servicios disponibles.</p>
           ) : (
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Cambiar capacidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.capacity}</td>
                            <td>
                                <input 
                                    type="number"
                                    value={editedCapacity[service.id] || ""}
                                    placeholder="Nueva capacidad"
                                    onChange={(e) => handleCapacityChange(service.id, e.target.value)}
                                />
                                <button onClick={() => handleUpdateCapacity(service.id)}>Actualizar</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(service.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           )}
        </div>
    );
};

export default ServcieDashboard;