import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../componentes/Login/LoginForm";
import RegisterForm from "../../componentes/Registro/RegisterForm";
import "./inicio.css";

function Inicio() {
    const [visibleForm, setVisibleForm] = useState(null);

    const showLoginForm = () => {
        setVisibleForm("login");
    };

    const showRegisterForm = () => {
        setVisibleForm("register");
    };

    const closeForm = () => {
        setVisibleForm(null);
    };

  return (
    <div className="inicio">
        <header>
            <h2 className="inicio-logo">FutNow</h2>
            <nav className="inicio-navbar">
                <a className="inicio-a" href="#">Inicio</a>
                <a className="inicio-a" href="#">Acerca de</a>
                <button className="inicio-btn" onClick={showLoginForm}>Iniciar Sesion</button>
                <button className="inicio-btn" onClick={showRegisterForm}>Registrarse</button>
            </nav>
        </header>
        {visibleForm === "login" && (
            <div id="login-form">
                <LoginForm onClose={closeForm} />
            </div>
        )}
        {visibleForm === "register" && (
            <div id="register-form">
                <RegisterForm onClose={closeForm} />
            </div>
        )}
    </div>
  );
}

export default Inicio;