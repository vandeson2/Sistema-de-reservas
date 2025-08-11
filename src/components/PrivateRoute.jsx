import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext} from "react"

export default function PrivateRoute ({ children, allowedRoles}){
    const { user, loading } = useContext(AuthContext);

    if(loading || (user && !user.role)) return <p>Cargando...</p>;

    if(!user){
        console.log("No hay usuarios, redirigiendo a login")
        return <Navigate to="/login" replace />
    }
    const userRole = user.role.toLowerCase().trim();
    const normalizedAllowed = allowedRoles?.map((r) => r.toLowerCase().trim());

  console.log("Comparando roles:", {
    userRole,
    allowedRoles,
    normalizedAllowed,
    coincide: normalizedAllowed?.includes(userRole),
  });

    console.log("PrivateRoute:", {user, allowedRoles});

    if(allowedRoles && !normalizedAllowed.includes(userRole)){
        console.warn(`Acceso denegado por rol: ${user.role}`);
        //Redirigir según el rol
        if(user.role === "admin"){
            return <Navigate to="/admin" replace />
        }
        return <Navigate to="/reservas" replace />
    }
    
    return children;
}

