import { useFormik } from "formik";
import * as Yup from "yup";
import { useBookingStore } from "../../store/bookingStore";

const validationSchema = Yup.object({
    fullName: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().email('El email no es válido').required("El email es obligatorio"),
    phone: Yup.string()
        .matches(/^[0-9]{9,15}$/, 'Número no válido')
        .required('El teléfono es obligatorio'),
});

export default function BookingForm(){
    const selectedService = useBookingStore ((state) => state.selectedService);
    const selectedDate = useBookingStore ((state) => state.selectedDate);
    const selectedTime = useBookingStore ((state) => state.selectedTime);
    const setBookingData = useBookingStore ((state) => state.setBookingData);
    const toggleConfirmation = useBookingStore((state) => state.toggleConfirmation);


    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
        },
        validationSchema,
        onSubmit:(values) => {
        const bookingData = {
            ...values,
            service: selectedService,
            date: selectedDate,
            time: selectedTime
        };
        setBookingData(bookingData);
        toggleConfirmation(true)
    },
    });

    return (
        <form 
            onSubmit={formik.handleSubmit}
        >
            <h2>
                Tus datos para la reserva
            </h2>
            <div>
                <label>Nombre completo</label>
                <input 
                    type="text" 
                    name="fullName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                    <p>{formik.errors.fullName}</p>
                )}
            </div>


            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}    
            </div>

            <div>
                <label>Teléfono</label>
                <input 
                    type="text"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone&& (
                    <p>{formik.errors.phone}</p>
                )}
            </div>

            <button
                type="submit"
            >
                Continuar con la reserva
            </button>
        </form>
    );
}