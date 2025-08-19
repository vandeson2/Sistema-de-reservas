import { useState } from "react";
import {useNavigate} from "react-router-dom"; // redirecciona al usuario a otras rutas
import { loginInWithEmail, getUserRole, signInWithGoogle } from "../services/authService";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //Login con email y contraseña
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const user = await loginInWithEmail(email, password);

            //Obtener el rol desde Firestore
            const role = await getUserRole(user.uid);

            //redirigir según el rol
            if(role === "admin"){
                navigate("/admin");
            }else{
                navigate("/home");
            }
        }catch (error){
            setError(error.message);
        }
    };

    //loading con Google

    const handleGoogleLogin = async () => {
        try{
            const user = await signInWithGoogle();
            const role = await getUserRole(user.uid);

            if(role === "admin"){
                navigate("/admin");
            }else{
                navigate("/home");
            }
        }catch (error){
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
    
            <form onSubmit={handleEmailLogin}>
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

                <button type="submit">
                    Iniciar sesión
                </button>
            </form>

            <hr />
            <button onClick={handleGoogleLogin}>
                Iniciar con Google
            </button>
        </div>
    );
};


