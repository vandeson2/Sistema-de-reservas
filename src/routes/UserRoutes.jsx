import {Routes, Route} from 'react-router-dom'
import {Home} from '../pages/Home'
import {BookingPage} from '../pages/user/BookingPage'

const UserRoutes = () => {
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<BookingPage />} />
    </Routes>
}
export default UserRoutes;