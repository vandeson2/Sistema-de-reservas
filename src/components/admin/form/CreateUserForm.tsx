import React, { useState } from "react";
import { 
    createUserWithEmailAndPassword,
    updateProfile 
} from "firebase/auth";
import { db, auth } from"../../../firebase/config"
import { doc, serverTimestamp, setDoc } from"firebase/firestore"

interface CreateUserProps {
    onClose: () => void;
    onUserCreated: () => void;
}

//Formulario encargado de gestionar el registro de nuevos usuarios
export default function CreateUser({onClose, onUserCreated}: CreateUserProps){
    const [newEmail, setNewEMail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("user");
    const [loading, setLoading] = useState(false);

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!newEmail || !newPassword || !newName){
            return alert("Rellena todos los campos");
        }

        try{
            setLoading(true);
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
            onClose();
            onUserCreated();
        } catch (error){
            console.log(error);
            alert("Error al crear usuario");
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="">
                <div  className="border p-6 gap-3 mb-5 bg-white">
                    <form onSubmit={createUser}
                    className="flex flex-col gap-2">

                        <div>
                            <label htmlFor="name" className="label-style">Nombre</label>
                            <input 
                                id="name"
                                type="text" 
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="input-style"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="label-style">Correo Electrónico</label>
                            <input
                                id="email" 
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEMail(e.target.value)} 
                                className="input-style"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="label-style">Contraseña</label>
                            <input 
                                id="password"
                                type="password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input-style"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="label-style">Rol</label>
                            <select value={newRole} onChange={(e) => setNewRole(e.target.value)} id="role" className="input-style">
                                <option value="user">Usuario</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                            >
                                {loading ? "Creando..." : "Crear"}
                            </button> 
                        </div>
                    </form>
                </div>    
            </div>
        </div>
    )
}