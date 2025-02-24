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

function UsuarioForm() {
  const [usuario, setUsuario] = useState({
    nombre_usuario: "",
    contraseña: "",
    primer_nombre: "",
    segundo_nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    telefono: "",
    rol: "asesor",
    activo: 1, 
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const formData = new URLSearchParams();
    Object.keys(usuario).forEach((key) => {
      formData.append(key, usuario[key]);
    });

    try {
      const response = await fetch("http://localhost:8080/Usuarios/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje("Usuario guardado exitosamente");
      } else {
        setMensaje(data.error || "Error al guardar usuario");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2>Registrar Usuario</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="nombre_usuario" placeholder="Nombre de Usuario" onChange={handleChange} required />
          <Input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />
          <Input type="text" name="primer_nombre" placeholder="Primer Nombre" onChange={handleChange} required />
          <Input type="text" name="segundo_nombre" placeholder="Segundo Nombre" onChange={handleChange} />
          <Input type="text" name="apellido_paterno" placeholder="Apellido Paterno" onChange={handleChange} required />
          <Input type="text" name="apellido_materno" placeholder="Apellido Materno" onChange={handleChange} required />
          <Input type="email" name="correo" placeholder="Correo Electrónico" onChange={handleChange} required />
          <Input type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
          <div style={{ margin: "10px 0" }}>
            <label>Rol:</label>
            <select name="rol" onChange={handleChange} value={usuario.rol} required>
              <option value="asesor">Asesor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div style={{ margin: "10px 0" }}>
            <label>Activo:</label>
            <input
              type="checkbox"
              name="activo"
              checked={usuario.activo === 1}
              onChange={(e) => setUsuario({ ...usuario, activo: e.target.checked ? 1 : 0 })}
            />
          </div>
          <Button type="submit">Guardar Usuario</Button>
        </form>
        {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}
      </CardContent>
    </Card>
  );
}

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sistema de Gestión de Usuarios</h1>
      <UsuarioForm />
    </>
  );
}

export default App;
