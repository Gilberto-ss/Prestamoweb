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

function ClienteForm() {
  const navigate = useNavigate(); 
  const [cliente, setCliente] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",  
    telefono: "",
    correo: "",
    direccion: "",
    activo: 1,
  });
  
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMensaje("");

  let clienteData = { ...cliente };

  
  if (clienteData.fecha_nacimiento) {
    clienteData.fecha_nacimiento = clienteData.fecha_nacimiento.replace(/-/g, "/");
  }

  const formData = new URLSearchParams();
  Object.keys(clienteData).forEach((key) => {
    formData.append(key, clienteData[key]);
  });

  try {
    const response = await fetch("http://localhost:8080/Prestamos/api/Clientes/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setMensaje("Cliente guardado exitosamente");
    } else {
      setMensaje(data.error || "Error al guardar cliente");
    }
  } catch (error) {
    setMensaje("Error al conectar con el servidor");
  }
};

  
  return (
    <Card>
      <CardHeader>
        <h2>Registrar Cliente</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="primer_nombre" placeholder="Primer Nombre" onChange={handleChange} required />
          <Input type="text" name="segundo_nombre" placeholder="Segundo Nombre" onChange={handleChange} />
          <Input type="text" name="apellido_paterno" placeholder="Apellido Paterno" onChange={handleChange} required />
          <Input type="text" name="apellido_materno" placeholder="Apellido Materno" onChange={handleChange} required />
          <Input type="date" name="fecha_nacimiento" placeholder="Fecha de Nacimiento" onChange={handleChange} required />
          <Input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
          <Input type="email" name="correo" placeholder="Correo Electrónico" onChange={handleChange} required />
          <Input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} required />
          <Button type="submit">Guardar Cliente</Button>
        </form>
        {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}

        {/* Botón para volver al menú */}
        <Button onClick={() => navigate("/menu")} style={{ background: "#28a745" }}>
          Volver al Menú
        </Button>        
      </CardContent>
    </Card>
  );
}

  
function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sistema de Gestión</h1>
      <ClienteForm />
    </>
  );
}

export default App;
