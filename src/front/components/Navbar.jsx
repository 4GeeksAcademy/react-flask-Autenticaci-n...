import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		dispatch({ type: "clear_token" });
		navigate("/login");

	};

	return (
		<nav className="navbar navbar-dark bg-dark border-bottom border-secondary">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Area Personal 🏚️</span>
				</Link>

				<div className="ml-auto">
					{!store.token ? (
						<>




							<Link to="/login">
								<button className="btn btn-primary me-2">Entrar</button>
							</Link>

							<Link to="/signup">
								<button className="btn btn-outline-primary ms-2">Registrarse</button>
							</Link>
						</>
					) : (
						<button className="btn btn-danger" onClick={handleLogout}>
							Cerrar Sesión 🔐
						</button>
					)}

				</div>
			</div>
		</nav>
	);
};

