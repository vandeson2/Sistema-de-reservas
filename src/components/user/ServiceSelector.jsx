import {useBookingStore} from "../../store/bookingStore"

const services = [
    {id: 1, name: 'Body Pump'},
    {id: 2, name: 'HIIT'},
    {id: 3, name: 'Yoga'},
    {id: 4, name: 'Pilates'},
    {id: 5, name: 'Spinning'},
    {id: 6, name: 'Zumba'}, 
    {id: 7, name: 'CrossFit'},
]

export default function ServiceSelector(){
    const setSelectedService = useBookingStore ((state) => state.setSelectedService);
    return(
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
                ¿Qué servicio deseas reservar?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className="bg-white shadow rounded-lg p-4 text-left hover:bg-green-100 transition"
                    >
                        <h3 className="text-lg font-bold">{service.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
}

