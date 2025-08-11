import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/user/Home"
import BookingPage from "./pages/user/BookingPage"
//import Login from "./pages/admin/login"
import AdminDashboard from "./pages/admin/AdminDashboad"
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"
import NewServiceForm from "./components/admin/NewServiceForm"
import ServiceDashboard from "./pages/admin/ServiceDashboard"
import Login from "./pages/login"
import UserManagement from "./components/admin/UserManagement"
import useAuthStore from "./store/authStore"
import { useEffect } from "react"


function App() {
   const initAuth = useAuthStore(state => state.initAuth);

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => unsubscribe && unsubscribe();
  }, [initAuth]);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas "usuarios" */}
          <Route path="/" element={<Login/>} />
          <Route path="/reservas" element={<BookingPage />} /> 

          {/* Ruta para administrador (solo es accesible si hay sesión iniciada)*/}
          <Route 
            path="/admin" 
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                </PrivateRoute>
              }
          /> 
          <Route 
          path="/admin/service"
            element={
                <PrivateRoute allowedRoles={["admin"]}>
                    <ServiceDashboard />
                </ PrivateRoute>    
            }
        /> 
        <Route 
        path="/admin/newService"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <NewServiceForm />
              </PrivateRoute>  
            }

        />
        <Route
          path="/admin/userManagement"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <UserManagement />
              </PrivateRoute>
            }
        />
        </Routes>
      </Router>
    </AuthProvider>
  )
};

export default App
