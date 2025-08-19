import { useEffect, useState } from "react";
import { getBookingsByEmail } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const MyReservation = () => {
    const  {user} = useAuth();
    const [reservation, setReservation] =useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            if (!user?.email) return;

            try {
                const data =  await getBookingsByEmail(user.email);
                setReservation(data);
            }catch (error) {
                console.error("Error al obtener reservas:", error);
            }finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [user]);

    if (loading) return <p>Cragando tus reservas....</p>

    return (
        <div>
            <h2>Mis Reservas</h2>

            <button onClick={() => navigate("/home")}>
                Volver a Inicio
            </button>

            {reservation.length === 0 ? (
                <p>No tienes reservas registradas</p>
            ): (
                <table>
                    <thead>
                        <tr>
                            <th>Servicio</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservation.map((res) => (
                            <tr key={res.id}>
                                <td>{res.serviceName}</td>
                                <td>{new Date(res.date).toLocaleDateString()}</td>
                                <td>{res.time}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};    

export default MyReservation;