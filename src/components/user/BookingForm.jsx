import { useFormik } from "formik";
import * as Yup from "yup";
import { useBookingStore } from "../../store/bookingStore";
import { useAuth} from "../../context/AuthContext"

const validationSchema = Yup.object({
    fullName: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().email('El email no es válido').required("El email es obligatorio"),
    phone: Yup.string()
        .matches(/^[0-9]{9,15}$/, 'Número no válido')
        .required('El teléfono es obligatorio'),
});

export default function BookingForm(){
    const { user } = useAuth();
    const selectedService = useBookingStore ((state) => state.selectedService);
    const selectedDate = useBookingStore ((state) => state.selectedDate);
    const selectedTime = useBookingStore ((state) => state.selectedTime);
    const setBookingData = useBookingStore ((state) => state.setBookingData);
    const toggleConfirmation = useBookingStore((state) => state.toggleConfirmation);


    const formik = useFormik({
        initialValues: {
            fullName: user?.displayName || '',
            email: user?.email || '',
            phone:'',
        },
        enableReinitialize: true,
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
            className="flex flex-col gap-4 w-full max-w-md mx-auto "
        >
            <h2 className="font-semibold text-lg mb-2">
                Tus datos para la reserva
            </h2>

            <div className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">
                    Nombre
                </label>
                <input 
                    type="text" 
                    name="fullName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                    aria-invalid={formik.touched.fullName && !!formik.errors.fullName}
                    className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formik.touched.fullName && formik.errors.fullName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                        {formik.errors.fullName}
                    </p>
                )}
            </div>

            <div className="flex flex-col">
                 <label className="font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    aria-invalid={formik.touched.email && !!formik.errors.email}
                    className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                    </p>
                )}
            </div>

            <div className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">
                    Teléfono</label>
                <input 
                    type="text"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    aria-invalid={formik.touched.phone && !!formik.errors.phone}
                    className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />
                {formik.touched.phone && formik.errors.phone&& (
                    <p className="text-red-500 text-sm mt-1">
                        {formik.errors.phone}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition font-medium"
            >
                Continuar con la reserva
            </button>
        </form>
    );
}