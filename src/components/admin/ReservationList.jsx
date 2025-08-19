
const ReservationList = ({ bookingData, onDelete}) => {
    const formatDate = (timestamp) =>{
            let dateObj;
            if (timestamp?.seconds) {
                dateObj = new Date(timestamp.seconds * 1000);
            } else {
                dateObj = new Date(timestamp);
            }
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Servicio</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {bookingData && bookingData.length > 0 ?(
                      bookingData.map((resultado) => (
                        <tr key={resultado.id}>
                            <td>{resultado.fullName}</td>
                            <td>{resultado.email}</td>
                            <td>{resultado.serviceName || "Sin nombre"}</td>
                            <td>{formatDate(resultado.date)}</td>
                            <td>{resultado.time}</td>
                            <td>
                            <button
                                    onClick={() => onDelete(resultado.id)}
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                       ))
                    ):(
                        <tr>
                            <td colSpan="6">
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