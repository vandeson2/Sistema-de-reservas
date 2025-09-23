import { useState, useEffect } from "react";
import { useServiceStore } from "../../store/servicesStore";
import { Menu, X} from "lucide-react"
import AdminSidebar from "./AdminSidebar";
import NewServiceModal from "./modals/NewServiceModal";
import EditTimesModal from "./modals/EditTimesModal";



const  ServcieDashboard = () => {

    const {services, fetchServices, updateCapacity, deleteService} = useServiceStore();
    const [loading, setLoading] = useState(true);
    const [editedCapacity, setEditedCapacity] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const [selectedService, setSelectedService] = useState(null);
    const [isTimesModalOpen, setIsTimesModalOpen] = useState(false);
    const [isOpenNewServiceModal, setIsOpenNewServiceModal] = useState(false);
    //Cargar servicios
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
            try{
                await deleteService(id);
                loadServices();
            }catch (error){
               console.error("Error al eliminar servicio: ", error);
               alert("Hubo un error al eliminar el servicio");
            }
        }
    };  

    //Cambiar  capacidad
    const handleCapacityChange = (id, value) => {
        setEditedCapacity(prev => ({...prev, [id]: value}));
    };

    //Actualizar capacidad
    const handleUpdateCapacity = async (id) => {
        const newCapacity = parseInt(editedCapacity[id]);
        if(!isNaN(newCapacity)){
            try {
                await updateCapacity(id, newCapacity);
                setEditedCapacity(prev => ({...prev, [id] : ""}))
                loadServices();
            }catch (error){
                console.error("Error al actualizar la capacidad: ", error );
                alert("Hubo un error al actualizar la capacidad");
            }    
        }
    };

    useEffect (() => {
        loadServices();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-200">

            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-black text-white"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-1 flex flex-col p-4 md:p-6 md:ml-50 w-full max-w-7xl mx-auto">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-center p-6 md:p-10">
                        Gestión de Servicios
                    </h2>
                    <div className="flex justify-end mb-6 gap-2">
                        <button
                            onClick={() => 
                            setIsOpenNewServiceModal(true)}
                            className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Nuevo Servicio
                        </button>
                        <button
                            onClick={() => {
                            setSelectedService(null)
                            setIsTimesModalOpen(true)
                            }}
                              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
                        >
                            Editar Horarios
                        </button>

                       
                    </div>
                    {loading ? (
                        <p>Cargando servicios...</p>
                    ) : services.length === 0 ?(
                        <p>No hay servicios disponibles.</p>
                    ) : (
                        <div className="overflow-x-auto w-full mb-10">
                            <table className="table-auto border-collapse rounded-lg shadow min-w-full border text-xs sm:text-sm overflow-hidden">
                                <thead className="border-b-2 bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase">
                                    <tr>
                                        <th className="p-2 text-left">Nombre</th>
                                        <th className="p-2 text-left">Capacidad</th>
                                        <th className="p-2 text-left">Cambiar capacidad</th>
                                        <th className="p-2 text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {services.map(service => (
                                        <tr key={service.id} className="odd:bg-gray-50 hover:bg-gray-100 transition">
                                            <td className="p-2 text-left">{service.name}</td>
                                            <td className="p-2 text-left">{service.capacity}</td>
                                            <td className="p-2 text-left">
                                                <div className="flex flex-col sm:flex-row gap-2">
                                                    <input 
                                                        type="number"
                                                        value={editedCapacity[service.id] || ""}
                                                        placeholder="Nueva capacidad"
                                                        onChange={(e) => handleCapacityChange(service.id, e.target.value)}
                                                        className="w-full md:w-24 border border-gray-500 rounded-md p-1 sm:p-2 mr-2"
                                                    />
                                                    <button 
                                                        onClick={() => handleUpdateCapacity(service.id)}
                                                        className="px-3 py-1 rounded text-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        Actualizar
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="flex flex-col sm:flex-row gap-2 p-2">
                                                <button 
                                                    onClick={() => handleDelete(service.id)}
                                                    className="px-3 py-1 rounded text-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    Eliminar
                                                </button>
                                                <button
                                                    onClick={() =>{
                                                        setSelectedService(service);
                                                        setIsTimesModalOpen(true);
                                                    }}
                                                    className="px-3 py-1 rounded text-sm text-white bg-indigo-500 hover:bg-indigo-700"
                                                >
                                                    Horarios
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>    
                    )}
                </div>    
            </div>
                <NewServiceModal
                    isOpen={isOpenNewServiceModal}
                    onClose={() => {
                    setIsOpenNewServiceModal(false)
                    loadServices()
                    }}
                />
            
            <EditTimesModal
                isOpen={isTimesModalOpen}
                onClose={() => setIsTimesModalOpen(false)}
                service={selectedService}
            />
        </div>
    );
};

export default ServcieDashboard;