import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from "./paginas/inicio/inicio";
import Home from "./paginas/home/home";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/home" element={<Home />} />
        </Routes>
        </Router>
    );
}

export default App;