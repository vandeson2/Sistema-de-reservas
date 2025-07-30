import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/user/Home"
import BookingPage from "./pages/user/BookingPage"
import Login from "./pages/admin/login"
import AdminDashboard from "./pages/admin/AdminDashboad"


function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas "usuarios" */}
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<BookingPage />} /> 

        {/* Ruta de login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta para administrador */}
        <Route path="/admin" element={<AdminDashboard />} />
    
      </Routes>
    </Router>
  )
};

export default App
