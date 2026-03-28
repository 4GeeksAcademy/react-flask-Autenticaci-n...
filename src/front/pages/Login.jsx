import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // llamo a mi api de python
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {

            //aqui guardo mi token 
            sessionStorage.setItem("token", data.token);
            dispatch({ type: "set_token", payload: data.token });   //aqui guardo mi token Store global
            navigate("/private");       //aqui envio mi usuario a una "zona privada"
        } else {
            alert(data.msg || "Tus credenciales son incorrectas ⛔️ ");
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="auth-container w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Iniciar Sesión 👩🏿‍💻 </h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">
                        <label className="form-label">Email 📩 </label>
                        <input type="email" placeholder="Introduce tu Mail " className="form-control" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Contraseña 🔓 </label>
                        <input type="password" placeholder="Introduce tu Contraseña" className="form-control" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success w-100 mt-3">Entrar</button>
                    </div>
                </form>
            </div>
        </div>


    );
};











