import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App"; 
import Menu from "./Menu"; 
import AsesorForm from "./Asesores";
import ClienteForm from "./Cliente";
import PrestamoForm from "./Prestamos";
import PagosForm from "./pagos";
import UsuarioForm from "./Usuarios";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/asesor-form" element={<AsesorForm />} />
        <Route path="/cliente-form" element={<ClienteForm />} />
        <Route path="/prestamo-form" element={<PrestamoForm />} />
        <Route path="/pagos-form" element={<PagosForm />} />
        <Route path="/usuario-form" element={<UsuarioForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
