import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService"


export default function UserHeader () {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        }catch (error){
            console.error("Error al cerrar sesión: ", error);
        }
    };

    return (
        <header className="w-full bg-black shadow-md border-b px-4 sm:px-6 py-3">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-300">
                    Panel de Usuario
                </h1>
                <nav className="hidden sm:flex items-center gap-6 text-gray-50 font-medium">
                <Link to="/home" className="hover:text-blue-600 transition-colors">
                    Inicio
                </Link>
                <Link to="/my-reservation" className="hover:text-blue-600 transition-colors">
                    Mis Reservas
                </Link>
                <Link to="/reservas" className="hover:text-blue-600 transition-colors">
                    Nueva Reserva
                </Link>

                <button 
                    onClick={handleLogout}
                    className=" ml-auto  bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow transition font-semibold"
                >
                    Cerrar sesión
                </button>
                </nav>
            </div>
        
        </header>
    );
}