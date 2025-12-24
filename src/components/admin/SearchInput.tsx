import { useBookingStore } from "../../store/bookingStore";


//Barra de busqueda -> permite filtra reservas o usuarios en tiempo real
const SearchInput: React.FC= () => {
    const searchTerm = useBookingStore((state) => state.searchTerm);
    const setSearchTerm = useBookingStore((state) => state.setSearchTerm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Buscar por nombre, email...."
            value={searchTerm}
            onChange={handleChange}
        />
    );
};

export default SearchInput;