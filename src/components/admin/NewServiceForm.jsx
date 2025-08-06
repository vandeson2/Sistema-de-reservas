import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useServiceStore } from "../../store/servicesStore";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    capacity: Yup.number().min(1).required("La capacidad es obligatoria"),
});

export default function NewServiceForm() {

    const addService = useServiceStore ((state) => state.addService);
    const navigate = useNavigate();

    const handleSubmit = async (values, {resetForm, setSubmitting}) => {
        try{
            await addService(values);
            alert ("Servicio creado correctamente");
            resetForm();
        }catch (error){
            console.error(error);
            alert(" Error al crear el servicio");
        }finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h3>Crear nuevo Servicio</h3>

            <Formik
                initialValues={{name: "", capacity: 1}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div>
                            <label>Nombre del servicio</label>
                            <Field
                                name="name"
                                type="text"
                            />
                            <ErrorMessage 
                                name="name"
                                component="div"
                            />
                        </div>
                        <div>
                            <label>Capacidad por hora</label>
                            <Field
                                name="capacity"
                                type="number"
                                min="1"
                            />
                            <ErrorMessage 
                                name="capacity"
                                component="div"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creando..." : "Crear Servicio"}
                            </button>
                            <button
                            type="button"
                                 onClick={() => navigate("/admin")}>
                                Volver
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}