import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.css";

const LoginForm = ({ onClose }) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const email = event.target.usuario.value;
    const password = event.target.password.value;

    try {
      console.log('Enviando solicitud de inicio de sesión...');
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      });

      console.log('Respuesta del servidor:', response.data);
      const data = response.data;

      if (!data.success) {
        setError(data.message);
      } else {
        setError("");
        alert("¡Inicio de sesión exitoso!");
        navigate('/home');
        // Guarda el token en el almacenamiento local o en el estado de la aplicación
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Error en la solicitud:', error.response.data);
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
        setError('No se recibió respuesta del servidor.');
      } else {
        // Algo sucedió al configurar la solicitud
        console.error('Error al configurar la solicitud:', error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

    return (
      <>
        <div className="login-contenedor">
            <span className="login-icon-close" onClick={onClose}>
                <i class="bi bi-x"></i>
            </span>
            <div className="login-form">
                <h2>Inicia Sesion</h2>
                <form id="forma" name="forma" method="post" onSubmit={handleSubmit}>
                    <div className="login-input-box">
                        <span className="login-icon"><i className="bi bi-envelope-fill"></i></span>
                        <input type="text" id="usuario" name="usuario" required />
                        <label htmlFor="usuario">Correo electronico</label>
                    </div>
                    <div className="login-input-box">
                        <span className="login-icon"><i class="bi bi-lock-fill"></i></span>
                        <input type="password" id="password" name="password" required />
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    <div className="login-recordar-contrasena">
                        <input type="checkbox" id="recordar" name="recordar" />
                        <label htmlFor="recordar">Recordar contraseña</label>
                        <a href="#">¿Olvido su contraseña?</a>
                    </div>
                    <button className="login-btn" type="submit">Iniciar Sesion</button>
                    <div className="login-registrar">
                        <p>¿No tienes una cuenta? <a href="#" className="login-registrate">Registrate</a> </p>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
      </>
    );
};

export default LoginForm;