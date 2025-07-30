import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Bienvenido a Estudios Vitalis</h1>
            <p>
                Conecta con tu bienestar a través del yoga, el masaje terapéutico y la energía del reiki.
                Reserva tu sesión fácilmente desde aquí.
            </p>
            <Link to="/reservas">
                <button>Reservar ahora</button>
            </Link>
        </div>
    );
};
export default Home;