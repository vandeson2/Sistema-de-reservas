import {  useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReservationList from "./ReservationList";
import { logout } from "../../firebase/auth";


const Dashboard = () => {
    const [reservation, setReservation] = useState([]);

    useEffect(() => {   
        const fechReservations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db,"reservas"));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReservation(data);
            }catch (error){
                console.error("Error al obtener las reservas:", error);
                throw error;
            }
        }
        fechReservations();
    }, []);    
    
    return (
        <div>
            <h2>Panel de administrador</h2>
            <ReservationList reservation={reservation} />

            <button onClick={logout}>
                Cerrar sesión
            </button>
        </div>
    )
    
}    

export default Dashboard;