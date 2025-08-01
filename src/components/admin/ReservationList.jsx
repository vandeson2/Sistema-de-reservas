
const ReservationList = ({ bookingData, onDelete}) => {

    const formtDate = (timestamp) =>{
        if (timestamp?.seconds){
            return new Date(timestamp.seconds * 1000).toLocaleDateString();
        }
        return timestamp;
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
                            <td>{resultado.serviceId}</td>
                            <td>{formtDate(resultado.date)}</td>
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