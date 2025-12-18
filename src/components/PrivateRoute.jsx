import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext} from "react"


//Componente de envoltura para proteger las rutas sensibles.
//verifica la autenticación del usuario como sus permisos antes de permitir el acceso al contenido
export default function PrivateRoute ({ children, allowedRoles}){
    //Consuminos el estado de autenticación global
    const { user, loading } = useContext(AuthContext);

    //Estado de carga
    if(loading || (user && !user.role)) return <p>Cargando...</p>;

    //1. Usuario  no autenticado
    if(!user){
        console.log("No hay usuarios, redirigiendo a login")
        return <Navigate to="/login" replace />
    }

    //Aseguramos que la comparación de roles sea insensible a mayúsculas o espaciado
    const userRole = user.role.toLowerCase().trim();
    const normalizedAllowed = allowedRoles?.map((r) => r.toLowerCase().trim());

  console.log("Comparando roles:", {
    userRole,
    allowedRoles,
    normalizedAllowed,
    coincide: normalizedAllowed?.includes(userRole),
  });

    console.log("PrivateRoute:", {user, allowedRoles});
  //2. usuarios autenticados pero sin rol autorizado
    if(allowedRoles && !normalizedAllowed.includes(userRole)){
        console.warn(`Acceso denegado por rol: ${user.role}`);
        //Redirigir según el rol
        if(user.role === "admin"){
            return <Navigate to="/admin" replace />
        }
        return <Navigate to="/reservas" replace />
    }
    
    //3. caso de Acceso autorizado
    return children;
}

