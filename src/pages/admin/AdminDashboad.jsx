import { useEffect, useState } from "react";
import { getAllBookings, deleteBookingById } from "../../services/firebase"
import ReservationList from "../../components/admin/ReservationList"
import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/admin/SearchInput";
import { useBookingStore } from "../../store/bookingStore";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Menu, X } from "lucide-react"

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchTerm} = useBookingStore();
    const [sidebarOpen, setSidebarOpen] = useState(false)
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
        <div className="flex min-h-screen bg-gray-200">
            
            <AdminSidebar  isOpen={sidebarOpen} setIsOpen={setSidebarOpen}/>

            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-black text-white"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <main className="flex-1 flex flex-col md:ml-50">
                <h1 className="text-3xl md:text-4xl font-bold text-center p-6 md:p-10">Panel de Administración</h1>

                <section className="p-2 md:p-6 flex flex-col gap-4">
                    <div className=" w-full max-w-7xl bg-white p-4 rounded shadow mb-6">
                        <SearchInput />
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                                <p>Cargando reservas...</p>
                            ) : bookings.length === 0 ?(
                                <p>No hay reservas disponibles.</p>
                            ) : (
                            <ReservationList bookingData={filterData} onDelete={handleDelete} />
                            )
                        }
                    </div>    
                </section>
            </main>    
        </div>
    )
}
export default AdminDashboard;