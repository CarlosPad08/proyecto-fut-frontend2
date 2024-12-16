import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./reserva.css";

const Reserva = ({ cancha, onClose }) => {
    const [error, setError] = useState("");
    const [opciones, setOpciones] = useState([]);
    const [fecha, setFecha] = useState("");

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

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
        console.log('Fecha seleccionada:', event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const opcionSeleccionada = event.target.opcion.value;
        const fecha = event.target.fecha.value;

        const horarioSeleccionado = opciones.find(opcion => opcion === opcionSeleccionada);
        const [horaInicio, horaFin] = horarioSeleccionado.split(' - ').map(hora => {
            const [h, m] = hora.split(':');
            return `${h.padStart(2, '0')}:${m}`;
        });

        try {
            console.log('Enviando solicitud de reserva...');
            const response = await axios.post('http://localhost:3000/api/reserves', {
                usuario_id: 1,
                cancha_id: cancha.split(' ')[1],
                fecha,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                estado: 'pendiente'
            });

            console.log('Respuesta del servidor:', response.data);
            const data = response.data;

            if (!data.success) {
                setError(data.message);
            } else {
                setError("");
                alert("¡Reserva exitosa!");
            }
        } catch (error) {
            console.error('Error al hacer la reserva:', error);
            setError('Error al hacer la reserva. Por favor, inténtelo de nuevo.');
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
                        <label htmlFor="cancha"></label>
                    </div>
                    <div className="reserva-input-box">
                        <span className="reserva-icon"><i className="bi bi-calendar-check-fill"></i></span>
                        <input type="date" id="fecha" name="fecha"  value={fecha}  onChange={handleFechaChange} required/>
                        <label className="reserva-date" htmlFor="opcion"><i className="bi bi-caret-down-fill"></i> Seleccione una fecha</label>
                    </div>
                    <div className="reserva-input-box">
                        <span className="reserva-icon"><i className="bi bi-clock-fill"></i></span>
                        <select id="opcion" name="opcion" required>
                            <option className="reserva-horario" value="" disabled selected>Seleccione un horario</option>
                            {opciones.map((opcion) => (
                                <option key={opcion.id} value={opcion.id}>
                                    {opcion}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="opcion" className='reserva-label'><i className="bi bi-caret-down-fill"></i> Seleccione un horario</label>
                    </div>
                    <div className="reserva-registrar">
                        <p>Una vez hecha la reserva, el tiempo comienza a correr a la hora programada.</p>
                        <p>Si se desea cancelar la reserva, ir a la seccion de reservas o ponerse en contacto con un administrador</p>
                    </div>
                    <button className="reserva-btn" type="submit">Reservar</button>
                </form>
            </div>
        </div>
    );
};

export default Reserva;