import {Routes, Route} from 'react-router-dom'
import {Home} from '../pages/Home'
import {BookingPage} from '../pages/user/BookingPage'


// Componente encargado de definir el enrutamiento específico para la sección de usuarios mediante react-router-dom.
const UserRoutes = () => {
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<BookingPage />} />
    </Routes>
}
export default UserRoutes;