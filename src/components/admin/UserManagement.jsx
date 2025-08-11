import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAuthStore from "../../store/authStore"
import  {deletedUser} from "../../services/authService"
import { useNavigate } from "react-router-dom";

export default function UserManagement(){
    const {user} = useAuthStore();
    const role = user?.role;

    const [users, setUsers] = useState([]);
    const [loading, setLoading] =useState(true);

    const navigate = useNavigate();

    // campos para nuevos usuarios

    const [newEmail, setNewEMail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("user");

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

    //Crear usuario nuevo
    const createUser = async (e) => {
        e.preventDefault();
        if(!newEmail || !newPassword || !newName){
            return alert("Rellena todos los campos");
        }

        try{
            const credential = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
            
            //Guarda el nombre en el perfil del nuevo usuario
            await updateProfile(credential.user, {displayName: newName});

            await setDoc(doc(db, "users", credential.user.uid), {
                displayName: newName,
                email: newEmail,
                password: newPassword,
                role: newRole,
                createdAt: serverTimestamp()

            });

            alert("Usuario creado correctamente");
            setNewEMail("");
            setNewPassword("");
            setNewName("");
            setNewRole("user");
            fetchUser();
        } catch (error){
            console.log(error);
            alert("Error al crear usuario");
        }
    };

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

    
    if (!user) return <p>Cargando usuario</p>
    if(role !== "admin"){
        return <p>No tiene permiso para gestionar usuarios.</p>
    }
    if(loading) return <p>Cargando usuarios...</p>


    return (
        <div>
            <h2>Gestión de Usuarios</h2>

            <form onSubmit={createUser}>
                <input 
                    type="text" 
                    placeholder="Nombre"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder="Correo"
                    value={newEmail}
                    onChange={(e) => setNewEMail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                </select>

                    <button type="submit">Crear Usuario</button>
            </form>
            <button onClick={() => navigate("/admin")}>
                Volver
            </button>

            {loading ? (
                <p>Cargando usuarios...</p>
            ):(
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Cambiar Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.displayName || "Sin nombre"}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        onClick={() => changeRole(user.id, user.role === "admin" ? "user" : "admin")}>
                                            Cambiar a {user.role === "admin" ? "Usuario" : "Admin"}
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        type="button"
                                        onClick={() => handleDelete(user.id)}
                                        >
                                            Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
        </div>
    );
}