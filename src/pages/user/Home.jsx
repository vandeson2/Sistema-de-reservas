import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    return (
        <div>
            <h1>Bienvenido a Estudios Vitalis</h1>
            <p>
                Conecta con tu bienestar a través del yoga, el masaje terapéutico y la energía del reiki.
                Reserva tu sesión fácilmente desde aquí.
            </p>
            <button onClick={() => navigate("/reservas")}>
                Reservar ahora
            </button>
            <button onClick={() => navigate("/my-reservation")}>
                Mis Reservas
            </button>    
        </div>
    );
};