import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useServiceStore } from "../../../store/servicesStore";

interface FormValues {
    name: string;
    capacity: number;
}    
//Definición de las reglas de validación
const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    capacity: Yup.number().min(1).required("La capacidad es obligatoria"),
});

interface NewServiceFormProps {
    onClose: () => void;
    onServiceCreated: () => void;
}

//Formulario encargado de la creación de servicios.
export default function NewServiceForm({onClose, onServiceCreated}: NewServiceFormProps) {

    const addService = useServiceStore ((state) => state.addService);

    const handleSubmit = async (values: FormValues, {resetForm, setSubmitting}: FormikHelpers<FormValues>) => {
        try{
            await addService(values);
            alert ("Servicio creado correctamente");
            resetForm();
            onServiceCreated();
            onClose();
        }catch (error){
            console.error(error);
            alert(" Error al crear el servicio");
        }finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <Formik
                    initialValues={{name: "", capacity: 1}}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form className="flex flex-col md:flex-row gap-2">
                            <div className="w-full md:w-2/3">
                                <label className="label-style">Nombre del servicio</label>
                                <Field
                                    name="name"
                                    type="text"
                                    className="input-style w-full"
                                />
                                <ErrorMessage 
                                    name="name"
                                    component="div"
                                />
                            </div>
                            <div className="w-full md:w-1/5">
                                <label className="label-style">Capacidad </label>
                                <Field
                                    name="capacity"
                                    type="number"
                                    min="1"
                                    className="input-style w-full"
                                />
                                <ErrorMessage 
                                    name="capacity"
                                    component="div"
                                />
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                >
                                    {isSubmitting ? "Creando..." : "Crear Servicio"}
                                </button>
                                <button
                                type="button"
                                    onClick={onClose}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>              
        </div>
    );
}