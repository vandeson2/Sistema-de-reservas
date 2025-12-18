import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../services/authService"
import { useState } from "react";

import { button, div } from "framer-motion/client";


//Componente de navegación lateral para el panel de adiministración
export default function AdminSidebar ({isOpen, setIsOpen}){
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
        <>
    
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`w-40 flex flex-col fixed justify-between top-0 left-0 h-full bg-black transform transition-transform duration-300 z-50
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                    >
                <div>
                    <div className="mb-10 border px-5  shadow">
                        <h2 className="text-4xl font-bold text-center text-white">Logo </h2>
                    </div>

                    <nav className="flex flex-col">
                        <Link
                            to="/admin"
                            className="text-center text-lg font-semibold mb-2  text-gray-200 hover:bg-blue-600 w-full"
                        >
                        Inicio
                        </Link>
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
                        to="/admin/service"
                        className="text-center text-lg font-semibold mb-2  text-gray-200 hover:bg-blue-600 w-full"
                        >
                            Servicios
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
        </>
    )
}