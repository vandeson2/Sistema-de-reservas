import { useState } from "react";
import { login } from "../../firebase/auth";
import {useNavigate} from "react-router-dom"; // redirecciona al usuario a otras rutas

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpia errores anteriores
        try {
            await login(email, password);
            navigate("/admin"); // Redirige al panel de administrador
        }catch (error){
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) =>setPassword(e.target.value)} 
                    required
                />
                {error && <p>{error}</p>}

                <button>
                    Entrar
                </button>
            </form>
        </div>
    );
};
export default Login;

