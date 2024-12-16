import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./reserva.css";

const Reserva = ({ cancha, onClose }) => {
    const [error, setError] = useState("");
    const [opciones, setOpciones] = useState([]);

    useEffect(() => {
        const fetchOpciones = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/horarios');
                setOpciones(response.data);
                console.log('Opciones:', response.data);
            } catch (error) {
                console.error('Error al obtener las opciones:', error);
            }
        };

        fetchOpciones();
    }, []);

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
        <div className="reserva-contenedor">
            <span className="reserva-icon-close" onClick={onClose}>
                <i className="bi bi-x"></i>
            </span>
            <div className="reserva-form">
                <h2>Reserva para {cancha}</h2>
                <form id="forma" name="forma" method="post" onSubmit={handleSubmit}>
                    <div className="reserva-input-box">
                        <span className="reserva-icon"><i className="bi bi-check-circle-fill"></i></span>
                        <input type="text" id="cancha" name="cancha" value={cancha} disabled/>
                        <label className="reserva-black" htmlFor="cancha"></label>
                    </div>
                    <div className="reserva-input-box">
                            <label htmlFor="opcion"><i className="bi bi-caret-down-fill"></i> Seleccione una fecha</label>
                            <select id="opcion" name="opcion" required>
                                // Escoger una fecha en el mes correspondiente
                                
                            </select>
                    </div>
                    <div className="reserva-input-box">
                            <label htmlFor="opcion"><i className="bi bi-caret-down-fill"></i> Seleccione un horario</label>
                            <select id="opcion" name="opcion" required>
                                {opciones.map((opcion) => (
                                    <option key={opcion.id} value={opcion.id}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                    </div>
                    <button className="reserva-btn" type="submit">Reservar</button>
                </form>
            </div>
        </div>
    );
};

export default Reserva;