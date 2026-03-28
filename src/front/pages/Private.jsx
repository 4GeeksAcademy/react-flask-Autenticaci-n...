import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();


    //validación

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token && !store.token) {
            alert("Tu no tienes permiso para estar aqui. 🤔 Inicia Sesión ");
            navigate("/login");
        }
    }, [store.token, navigate]);


    return (
        <div className="container mt-5 text-center">
            <div className="card p-5 shadow-lg bg-dark text-white border-success">
                <h1 className="display-4">🔓 Àrea Privada</h1>
                <p className="lead mt-3">
                    Te has Autenticado correctamente
                </p>

                <div className="my-4">
                    <img
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXF4eXF4eXF4eXF4eXF4eXF4eXF4eXF4eXF4eXF4eXF4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxxcaBQIY6A/giphy.gif"
                        alt="Acceso concedido"
                        className="img-fluid rounded border border-success"
                        style={{ maxWidth: "400px" }} />
                </div>
                <p>Todo esta correcto, estas en un sitio seguro.</p>


            </div>

        </div>
    );

};

