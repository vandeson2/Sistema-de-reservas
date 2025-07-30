import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children}) => {
    const { user } = useAuth();
    
    // Verifica si el usuario está autenticado. Si no, redirige al login
    return user ? children : <Navigate to="/login" />
}

export default PrivateRoute;