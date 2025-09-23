import { div } from "framer-motion/client";
import AdminTimes from "../form/AdminTimes";



const EditTimesModal = ({ onClose, isOpen, service }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg relative">
                    <h2 className="text-3xl md:text-4xl font-bold text-center p-3 md:p-6">Editar Horarios</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-4 right-4 text-2xl font-bold">
                      X
                    </button>
                 <AdminTimes service={service} onClose={onClose} />
            </div>
        </div>
    )
}
export default EditTimesModal;    