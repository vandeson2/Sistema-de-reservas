import { useBookingStore } from "../../store/bookingStore";

const SearchInput = () => {
    const searchTerm = useBookingStore((state) => state.searchTerm);
    const setSearchTerm = useBookingStore((state) => state.setSearchTerm);

    const handleChange = (e) => {
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