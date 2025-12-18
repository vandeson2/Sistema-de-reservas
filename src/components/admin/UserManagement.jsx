import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc} from "firebase/firestore";
import { db} from "../../firebase/config"
import useAuthStore from "../../store/authStore"
import  {deletedUser} from "../../services/authService"
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Menu, X } from "lucide-react"
import CreateUserModal from "./modals/CreateUserModal";

//Componente administrativo para la gestión de usuarios, roles y permiso. Accesible solo para "adim"
export default function UserManagement(){
    //AUTH & ROLES
    const {user} = useAuthStore();
    const role = user?.role;

    const [users, setUsers] = useState([]);
    const [loading, setLoading] =useState(true);
    const [ sidebarOpen, setSidebarOpen ] = useState(false);
    const [ isOpenUserCreatedModal, setIsOpenUserCreatedModal] = useState(false);
    
    //Recupera la lista completa de usuarios desde Firestore
    const fetchUser =  async() => {
        setLoading (true);
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
        }));
        setUsers(usersList);
        setLoading(false);
    };

    //Cambiar rol de usuario
    const changeRole = async (uid, newRole) => {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {role: newRole});
        fetchUser();
    }
    

    // Eliminar usuario
    const handleDelete =  async (uid) => {
        if(!window.confirm("¿Seguro que quieres eleminar este usuario?"));

        try{
            await deletedUser(uid);
            alert ("Usuario eliminado con éxito");
            fetchUser();
        }catch (error){
            console.error("Error eliminando el usuario");
            alert("Error al eliminar el usuario");
        }
    };


useEffect(() => {
  if (role === "admin") {
    fetchUser();
  }
}, [role]);

    
    if (!user) return <p>Cargando usuario</p>;
    if(role !== "admin") return <p>No tiene permiso para gestionar usuarios.</p>;
    if(loading) return <p>Cargando usuarios...</p>;


    return (
        <div className=" flex min-h-screen bg-gray-200">

            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-black text-white"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-1 flex flex-col p-5 md:ml-50 w-full max-w-7xl mx-auto">
                <div className="bg-white min-h-auto p-2 rounded-2xl shadown">
                <h2 className="text-3xl md:text-4xl font-bold text-center p-6 md:p-10">
                    Gestión de Usuarios
                </h2>

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setIsOpenUserCreatedModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Crear Usuario
                    </button>

                </div>
                        <div className="overflow-x-auto w-full  mb-10">
                            <table className="table-auto border-collapse rounded-lg  shadow min-w-full border text-xs sm:text-sm overflow-hidden">
                                <thead className="border-b-2 bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase">
                                    <tr>
                                        <th className="p-2 text-left">Nombre</th>
                                        <th className="p-2 text-left hidden sm:table-cell">Email</th>
                                        <th className="p-2 text-left">Rol</th>
                                        <th className="p-2 text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user.id} className="odd:bg-gray-50 hover:bg-gray-100 transition">
                                            <td className="p-2">{user.displayName || "Sin nombre"}</td>
                                            <td className="p-2 text-left hidden sm:table-cell">{user.email}</td>
                                            <td className="p-2 text-left">
                                                <span className={`px-2 py-1 rounded text-sm text-white
                                                    ${user.role === "admin" ? "bg-green-500" : "bg-gray-500" }`}>
                                                        {user.role}
                                                </span>
                                            </td>
                                            <td className="p-2 text-left flex gap-2">
                                                <button
                                                    onClick={() => changeRole(user.id, user.role === "admin" ? "user" : "admin")}
                                                    className="px-3 py-1 rounded text-sm text-white bg-blue-500 hover:bg-blue-700"
                                                >
                                                        Cambiar a {user.role === "admin" ? "Usuario" : "Admin"}
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => handleDelete(user.id)}
                                                    className="px-3 py-1 rounded text-sm text-white bg-red-500 hover:bg-red-700"
                                                    >
                                                        Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                     </div>   
                
                        <CreateUserModal
                                isOpen={isOpenUserCreatedModal}
                                onClose={() => setIsOpenUserCreatedModal(false)}
                                
                        />
            
            </div>
        </div>
    );
}