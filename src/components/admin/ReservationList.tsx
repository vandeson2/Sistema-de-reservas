import { BookingData} from "../../types/booking";

interface ReservationListProps{
    bookingData: BookingData[];
    onDelete: (id: string) => Promise<void>;
}

//Componente encargado de listar las reservas activas
const ReservationList = ({ bookingData, onDelete}: ReservationListProps) => {
    const formatDate = (timestamp: any) : string =>{
            let dateObj;
            if (timestamp?.seconds) {
                dateObj = new Date(timestamp.seconds * 1000);
            } else if( timestamp instanceof Date){
                dateObj = timestamp
            }else {
                dateObj = new Date(timestamp);
            }
              
            if (isNaN(dateObj.getTime())) return "Fecha inválida";

            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();

            return `${day}/${month}/${year}`;
    }

    return (
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-200">
            <table className="table-auto border-collapse w-full rounded-lg shadow text-sm overflow-hidden">
                <thead className="border-b-2 bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        <th className="p-2 text-left">Nombre</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Servicio</th>
                        <th className="p-2 text-left">Fecha</th>
                        <th className="p-2 text-left">Hora</th>
                        <th className="p-2 text-left">Acciones</th>

                    </tr>
                </thead>
                <tbody className="divide-y  divide-gray-200">
                    {bookingData && bookingData.length > 0 ?(
                      bookingData.map((resultado) => (
                        <tr key={resultado.id} className="odd:bg-gray-50 hover:bg-gray-100 transition">
                            <td className="p-2 text-left">{resultado.fullName}</td>
                            <td className="p-2 text-left">{resultado.email}</td>
                            <td className="p-2 text-left">{resultado.serviceName || "Sin nombre"}</td>
                            <td className="p-2 text-left">{formatDate(resultado.date)}</td>
                            <td className="p-2 text-left">{resultado.time}</td>
                            <td>
                            <button
                                    onClick={() => resultado.id && onDelete(resultado.id)}
                                    className="btn borde bg-red-500 text-white  hover:bg-red-600 w-full md:w-auto"
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                       ))
                    ):(
                        <tr>
                            <td colSpan={6}>
                                No hay reservas registradas
                            </td>
                        </tr>
                    )} 
                </tbody>
            </table>
        </div>
    );
};
export default ReservationList;    