import React, { useState } from 'react';
import axios from 'axios';
import "./register.css";

const RegisterForm = ({ onClose }) => {
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
    event.preventDefault();

    const nombre = event.target.nombre.value;
    const telefono = event.target.telefono.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      console.log('Enviando solicitud de registro...');
      const response = await axios.post('http://localhost:3000/api/register', {
        nombre,
        telefono,
        email,
        password
      });

      console.log('Respuesta del servidor:', response.data);
      const data = response.data;

      if (!data.success) {
        setError(data.message);
      } else {
        setError("");
        alert("¡Registro exitoso!");
        // Guarda el token en el almacenamiento local o en el estado de la aplicación
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error en la solicitud:', error.response.data);
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        setError('No se recibió respuesta del servidor.');
      } else {
        console.error('Error al configurar la solicitud:', error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
        <div className="register-contenedor">
            <span className="register-icon-close" onClick={onClose}>
                <i class="bi bi-x"></i>
            </span>
            <div className="register-form">
                <h2>Registrate</h2>
                <form id="forma" name="forma" method="post" onSubmit={handleSubmit}>
                    <div className="register-input-box">
                        <span className="register-icon"><i className="bi bi-person-circle"></i></span>
                        <input type="text" id="nombre" name="nombre" required />
                        <label className="register-black" htmlFor="nombre">Nombre</label>
                    </div>
                    <div className="register-input-box">
                        <span className="register-icon"><i class="bi bi-telephone-fill"></i></span>
                        <input type="text" id="telefono" name="telefono" required />
                        <label className="register-black" htmlFor="telefono">Telefono</label>
                    </div>
                    <div className="register-input-box">
                        <span className="register-icon"><i class="bi bi-envelope-fill"></i></span>
                        <input type="text" id="email" name="correo" required />
                        <label htmlFor="email">Correo electronico</label>
                    </div>
                    <div className="register-input-box">
                        <span className="register-icon"><i class="bi bi-lock-fill"></i></span>
                        <input type="password" id="password" name="contraseña" required />
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    <button className="register-btn" type="submit">Registrarse</button>
                    <div className="register-registrar">
                        <p>¿Ya tienes una cuenta? <a href="#" className="register-registrate">Inicia sesion</a> </p>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    </>
    );
};

export default RegisterForm;