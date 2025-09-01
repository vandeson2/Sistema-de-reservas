import { useEffect, useState } from "react";
import { getBookingsByEmail } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";


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

        <div className="w-full min-h-screen bg-gray-50 flex flex-col">

            <UserHeader />

            <div className="flex items-start justify-center px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col p-4 sm:p-8  max-w-lg md:max-w-4xl w-full md:h-auto bg-white mx-auto
                                mt-1 md:mt-10 rounded-lg shadow-lg">
                    <h2 className="text-center text-3xl md:text-5xl font-bold mb-4">Mis Reservas</h2>

                    <div className=" flex flex-col md:flex-row md:justify-between gap-2 mb-4">
                        <button onClick={() => navigate("/home")}
                            className="btn border  w-full md:w-auto">
                            Volver
                        </button>

                        <button
                            onClick={() => navigate("/reservas")}
                            className="btn border w-full md:w-auto"
                        >
                            Reservar
                        </button>

                    </div>

                    {reservation.length === 0 ? (
                        <p>No tienes reservas registradas</p>
                    ): (
                        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden shadow text-sm">
                            <thead className="border-b-2 bg-gray-100 trext-gray-700 text-sm uppercase">
                                <tr>
                                    <th className="p-2 text-left">Servicio</th>
                                    <th className="p-2 text-center">Fecha</th>
                                    <th className="p-2 text-center">Hora</th>
                                    <th className="p-2 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reservation.map((res) => (
                                    <tr key={res.id} className="odd:bg-gray-50 hover:bg-gray-100 transition">
                                        <td className="p-2 ">{res.serviceName}</td>
                                        <td className="p-2 text-center">{new Date(res.date).toLocaleDateString()}</td>
                                        <td className="p-2 text-center">{res.time}</td>
                                        <td className="p-2 text-center">
                                            <button className="btn border bg-red-500 text-white hover:bg-red-600 w-full md:w-auto">
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
        </div>
       
    );
};    

export default MyReservation;