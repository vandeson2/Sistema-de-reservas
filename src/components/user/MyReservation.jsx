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
        <div className="flex  justify-center min-h-screen  p-2 md:p-10 bg-gray-200">
            <div className="flex flex-col p-5 md:p-10 md:max-w-7xl w-full md:h-auto bg-white mx-auto
                            mt-1 md:mt-10 rounded-lg shadow-lg">
                <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">Mis Reservas</h2>

                <div className=" flex flex-col md:flex-row md: justify-between">
                    <button onClick={() => navigate("/home")}
                        className="btn border mb-4">
                         Volver
                    </button>

                    <button
                        onClick={() => navigate("/reservas")}
                        className="btn border mb-4"
                    >
                        Reservar
                    </button>

                </div>

                {reservation.length === 0 ? (
                    <p>No tienes reservas registradas</p>
                ): (
                    <table className="table-auto w-full border-collapse rounded-lg overflow-hidden shadow">
                        <thead className="border-b-2 bg-gray-100 trext-gray-700 text-sm uppercase">
                            <tr>
                                <th className="p-3 text-left">Servicio</th>
                                <th className="p-3 text-center">Fecha</th>
                                <th className="p-3 text-center">Hora</th>
                                <th className="p-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reservation.map((res) => (
                                <tr key={res.id} className="odd:bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="p-3 ">{res.serviceName}</td>
                                    <td className="p-3 text-center">{new Date(res.date).toLocaleDateString()}</td>
                                    <td className="p-3 text-center">{res.time}</td>
                                    <td className="p-3 text-center">
                                        <button className="btn border bg-red-500 text-white hover:bg-red-600">
                                            Cancelar
                                        </button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};    

export default MyReservation;