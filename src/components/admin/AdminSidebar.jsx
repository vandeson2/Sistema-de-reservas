import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../services/authService"
import { header } from "framer-motion/client";

export default function AdminSidebar (){
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <aside className="w-40 flex flex-col fixed justify-between top-0 left-0 h-full bg-black">
            <div>
                <div className="mb-10 border px-5  shadow">
                    <h2 className="text-4xl font-bold text-center text-white">Logo </h2>
                </div>

                <nav className="flex flex-col">
                    <Link
                        className="text-center text-lg font-semibold mb-2  text-gray-200 hover:bg-blue-600 w-full"
                        onClick={() => window.location.reload(false)}
                    >
                        Actualizar
                    </Link>
                    <Link
                        to="/admin/userManagement"
                        className="text-center text-lg font-semibold mb-2  text-gray-200 hover:bg-blue-600 w-full"
                    >
                    Gestión de usuarios
                    </Link>

                    <Link
                        to="service"
                        className="text-center text-lg font-semibold mb-2  text-gray-200 hover:bg-blue-600 w-full"
                    >
                        Gestión de servicios
                    </Link>
                    
                </nav>
            </div>    

                <button 
                        onClick={handleLogout}
                        className="text-center text-lg font-semibold mb-6 border shadow text-gray-200 hover:bg-blue-600 w-full"
                    >
                        Cerrar sesión 
                </button>
        </aside>
    )
}