import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Registro = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleRegistro = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert("¡Tu usuario ha sido creado con exito! 😏 ");
            navigate("/login");
        } else {
            const data = await response.json();
            alert(data.msg || "Error al registrarte");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="auth-container w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Registro 📝 </h2>
                <form onSubmit={handleRegistro}>
                    <label className="form-label">Email 📩 </label>
                    <input type="email" placeholder="Email " className="form-control mb-3" onChange={e => setEmail(e.target.value)} required />
                    <label className="form-label"> Contraseña 🔓 </label>
                    <input type="password" placeholder="Contraseña" className="form-control mb-3" onChange={e => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-success w-100 mt-3">Crear Cuenta</button>
                </form>
            </div>
        </div>

    );

};