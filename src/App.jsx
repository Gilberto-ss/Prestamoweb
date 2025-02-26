import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


// Componentes internos
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

function App() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const formData = new URLSearchParams();
    formData.append("nombre_usuario", nombreUsuario);
    formData.append("password", contrasena);

    try {
      const response = await  fetch("http://localhost:8080/Prestamos/api/Login/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });


      if (response.ok) {
        setMensaje("Login exitoso");
      } else {
        setMensaje(data.error || "Error en la autenticación");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}></h1>
      <Card>
        <CardHeader>
          <h2>Iniciar Sesión</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Usuario:</label>
              <Input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <Input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Ingresar</Button>
          </form>
          {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}
        </CardContent>
      </Card>
      <p className="read-the-docs" style={{ textAlign: "center" }}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;