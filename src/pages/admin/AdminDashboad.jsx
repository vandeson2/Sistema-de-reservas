import { useEffect, useState } from "react";
import { getAllBookings, deleteBookingById } from "../../services/firebase"
import ReservationList from "../../components/admin/ReservationList"
import { logout } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/admin/SearchInput";
import { useBookingStore } from "../../store/bookingStore";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchTerm} = useBookingStore();

    const navigate = useNavigate();

    //Cargar reservas 
    const loadingBooking = async () => {
        try{
            const data = await getAllBookings();
            setBookings(data);
        }catch (error){
            console.log("Error al cargar las reservas:", error );
        }finally{
            setLoading(false);
        }
    }
    //función para eliminar reservas
    const handleDelete = async (id) =>{
        try{
            await deleteBookingById(id);
            setBookings((prev) => prev.filter((booking) => booking.id !== id));
        }catch (error){
            console.error("Error al eliminar la reserva:", error)
        }
    };

    useEffect(() => {
        loadingBooking();
    }, []);

    //Filtrar reservas con SeachInput
    const filterData = bookings.filter((reserva) => {
        const term = searchTerm.toLowerCase();
        const campos = ['fullName', 'email', 'date', 'service'];
        return campos.some((campo) =>
            reserva[campo]?.toLowerCase().includes(term) 
            //reserva.email?.toLowerCase().includes(term) ||
           
           // reserva.date?.toLowerCase().includes(term)  ||
        

        );
    });




    return (
        <div>
            <h1>Panel de Administración</h1>
            <button onClick={logout}>
                Cerrar sesión
            </button>

            <button onClick={() => navigate("/admin/newService")}>
                    Añadir nuevo servicio
            </button>

             <button onClick={() => navigate("/admin/capacity")}>
                    Cambiar capacidad
             </button>
             <button onClick={() => window.location.reload(false)}>
                Actualizar
             </button>
             <br />
             <div>
                <SearchInput />
             </div>

            
          

            {loading ? (
                <p>Cargando reservas...</p>
            ) : bookings.length === 0 ?(
                <p>No hay reservas disponibles.</p>
            ) : (
               <ReservationList bookingData={filterData} onDelete={handleDelete} />
            )
        }
        </div>
    )
}
export default AdminDashboard;