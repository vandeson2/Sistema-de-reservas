import { useNavigate } from "react-router-dom";

//Página principal para usuarios autenticados. Ofrece acceso rápido a las funciones claves de la app.
export default function Home(){
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row-reverse min-h-screen  bg-gray-100">

             <div className="w-full h-32 md:h-auto  bg-yellow-500">

            </div>
            <div className="flex flex-col  p-3 sm:p-10 w-full sm:max-w-lg bg-white mx-auto">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 ">Bienvenido a Estudios Vitalis</h1>
                <p className="text-base sm:text-lg mb-8">
                    Conecta con tu bienestar a través del yoga, el masaje terapéutico y la energía del reiki.
                    Reserva tu sesión fácilmente desde aquí.
                </p>
                <button onClick={() => navigate("/reservas")}
                        className="btn border w-full sm:w-2/3 mb-3"
                >
                    Reservar ahora
                </button>
                <button onClick={() => navigate("/my-reservation")}
                        className="btn border w-full sm:w-2/3 mb-3"
                >
                    Mis Reservas
                </button>   
            </div> 
           
        </div>
    );
};