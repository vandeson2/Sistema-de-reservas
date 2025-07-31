import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/user/Home"
import BookingPage from "./pages/user/BookingPage"
import Login from "./pages/admin/login"
import AdminDashboard from "./pages/admin/AdminDashboad"
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas "usuarios" */}
          <Route path="/" element={<Home />} />
          <Route path="/reservas" element={<BookingPage />} /> 

          {/* Ruta de login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta para administrador (solo es accesible si hay sesión iniciada)*/}
          <Route 
            path="/admin" 
              element={
                <PrivateRoute>
                    <AdminDashboard />
                </PrivateRoute>
              }
          />    
        </Routes>
      </Router>
    </AuthProvider>
  )
};

export default App
