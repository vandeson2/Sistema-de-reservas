import { Routes, Route} from 'react-router-dom'
import AdminHome from '../pages/admin/AdminHome'
import Reservations from '../pages/admin/Reservations'
import PrivateRoute from '../components/PrivateRoute'
import ServiceCapacityManager from '../pages/admin/ServiceCapacityManager'

const AdminHome = () => (
    <Routes>
        <Route path="/admin"
            element={
                <PrivateRoute>
                    <AdminHome />
                </PrivateRoute>
            }
        />
        <Route path="/admin/reservas"
            element={
                <PrivateRoute>
                    <Reservations />
                </PrivateRoute>
            }
        />  
        
    </Routes>
  
);
export default AdminHome;