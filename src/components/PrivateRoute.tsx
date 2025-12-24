import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import React, { useContext} from "react"

interface PrivateRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}
//Componente de envoltura para proteger las rutas sensibles.
//verifica la autenticación del usuario como sus permisos antes de permitir el acceso al contenido
export default function PrivateRoute ({ children, allowedRoles}: PrivateRouteProps) {
    //Consuminos el estado de autenticación global
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error("PrivateRoute debe usarse dentro de un AuthProvider");
  }
    const { user, loading } = context;

    //Estado de carga
    if(loading || (user && !user.role)) return <p>Verificando acceso...</p>;

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
    if(allowedRoles && !normalizedAllowed?.includes(userRole)){
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

