import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children}) => {
    const { user, loading } = useAuth();

    if(loading) return <p>Cargando...</p>;
    
    // Verifica si el usuario está autenticado. Si no, redirige al login
    return user ? children : <Navigate to="/login" replace/>
}

export default PrivateRoute;