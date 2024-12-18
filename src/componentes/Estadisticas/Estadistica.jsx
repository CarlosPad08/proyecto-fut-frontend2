import React from "react";
import "./estadistica.css";

const Estadistica = () => {
  return (
    <div className="estadisticas-container">
      <div className="estadisticas-titulo">
        <h2>Estadísticas</h2>
      </div>
      <ul className="estadisticas-lista">
        <li>
          <span>Partidos Jugados:</span> 25
        </li>
        <li>
          <span>Victorias:</span> 18
        </li>
        <li>
          <span>Empates:</span> 2
        </li>
        <li>
          <span>Derrotas:</span> 5
        </li>
        <li>
          <span>Goles a Favor:</span> 45
        </li>
        <li>
          <span>Goles en Contra:</span> 20
        </li>
        <li>
          <span>Tarjetas amarillas:</span> 33
        </li>
        <li>
          <span>Tarjetas rojas:</span> 6
        </li>
        <li>
          <span>Titulos:</span> 7
        </li>
        <li>
          <span># de veces en el podio:</span> 4
        </li>
      </ul>
    </div>
  );
};

export default Estadistica;
