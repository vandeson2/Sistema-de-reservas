import { useEffect, useState } from "react";
import { getAllBookings, deleteBookingById } from "../../services/firebase"
import ReservationList from "../../components/admin/ReservationList"
import { logout } from "../../firebase/auth";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

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




    return (
        <div>
            <h1>Panel de Administración</h1>
            <button onClick={logout}>
                Cerrar sesión
            </button>

            {loading ? (
                <p>Cargando reservas...</p>
            ) : bookings.length === 0 ?(
                <p>No hay reservas disponibles.</p>
            ) : (
               <ReservationList bookingData={bookings} onDelete={handleDelete} />
            )
        }
        </div>
    )
}
export default AdminDashboard;