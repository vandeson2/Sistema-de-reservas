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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
            <div className="flex flex-col items-center p-6 sm:p-10 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="font-bold text-2xl mb-5 text-center">Iniciar Sesión</h2>
        
                <form 
                    onSubmit={handleEmailLogin} 
                    className="flex flex-col w-full gap-4"
                >
                    <label htmlFor="email">Correo</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)} 
                        required
                        className="input-field"
                    />
                    {error && <p>{error}</p>}

                    <button type="submit" className="btn w-full bg-blue-500 text-white  hover:bg-blue-600 transition-colors">
                        Iniciar sesión
                    </button>
                </form>

                <hr className="w-full my-6 border-t-2  border-gray-400"/>

                <button 
                    onClick={handleGoogleLogin}
                    className="btn border w-full"
                >
                    Iniciar con Google
                </button>
            </div>
        </div>
    );
};


