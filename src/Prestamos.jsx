import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Card({ children }) {
  return <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", maxWidth: "300px", margin: "auto" }}>{children}</div>;
}

function CardHeader({ children }) {
  return <div style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>{children}</div>;
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

function Input(props) {
  return <input {...props} style={{ padding: "10px", margin: "5px 0", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }} />;
}

function Button({ children, ...props }) {
  return <button {...props} style={{ padding: "10px", marginTop: "10px", width: "100%", background: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>{children}</button>;
}

function PrestamoForm() {
  const [prestamo, setPrestamo] = useState({
    id_cliente: "",
    id_asesor: "",
    monto_prestado: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setPrestamo({ ...prestamo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const formData = new URLSearchParams();
    Object.keys(prestamo).forEach((key) => {
      formData.append(key, prestamo[key]);
    });

    try {
      const response = await fetch("http://localhost:8080/Prestamos/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje("Préstamo guardado exitosamente");
      } else {
        setMensaje(data.error || "Error al guardar préstamo");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2>Registrar Préstamo</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input type="number" name="id_cliente" placeholder="ID Cliente" onChange={handleChange} required />
          <Input type="number" name="id_asesor" placeholder="ID Asesor" onChange={handleChange} required />
          <Input type="number" name="monto_prestado" placeholder="Monto Prestado" onChange={handleChange} required />
          <Button type="submit">Guardar Préstamo</Button>
        </form>
        {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}
      </CardContent>
    </Card>
  );
}

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sistema de Gestión de Préstamos</h1>
      <PrestamoForm />
    </>
  );
}

export default App;
