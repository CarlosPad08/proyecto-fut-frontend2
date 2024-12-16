import React, { useState } from "react";
import Reserva from "../../componentes/Reserva/Reserva";
import "./home.css";

function Home() {
    const [selectedCancha, setSelectedCancha] = useState(null);

    const handleCanchaClick = (cancha) => {
        setSelectedCancha(cancha);
    };

    const closeReserva = () => {
        setSelectedCancha(null);
    };

    return (
    <div className="home">
        <header>
            <h2 className="home-logo">FutNow</h2>
            <nav className="home-navbar">
                <button className="home-btn">Reservas</button>
                <button className="home-btn">Mi equipo</button>
                <button className="home-btn">Usuario</button>
            </nav>
        </header>
        <main>
            <div className="home-contenedor-canchas">
                <div className="home-cancha home-cancha1" onClick={() => handleCanchaClick('Cancha 1')}>
                    <h2>Cancha 1</h2>
                </div>
                <div className="home-cancha home-cancha2" onClick={() => handleCanchaClick('Cancha 2')}>
                    <h2>Cancha 2</h2>
                </div>
                <div className="home-cancha home-cancha3" onClick={() => handleCanchaClick('Cancha 3')}>
                    <h2>Cancha 3</h2>
                </div>
            </div>
            {selectedCancha && (
                <div id="reserva">
                    <Reserva cancha={selectedCancha} onClose={closeReserva} />
                </div>
            )}
            <div className="home-contenedor-estadisticas">
            </div>
        </main>
    </div>
  );
}

export default Home;