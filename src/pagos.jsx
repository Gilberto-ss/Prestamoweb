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

function PagosForm() {
    const navigate = useNavigate();
    const [pago, setPago] = useState({
      id_prestamo: "",
      id_asesor: "",
      id_cliente: "",
    });
    const [mensajeGuardar, setMensajeGuardar] = useState("");
  
    // Estado para la operación "abonar"
    const [abonoData, setAbonoData] = useState({
      id_prestamo: "",
      abono: "",
    });
    const [mensajeAbonar, setMensajeAbonar] = useState("");
  
    // Manejo de cambios para el formulario de "guardar pago"
    const handleChangeGuardar = (e) => {
      setPago({ ...pago, [e.target.name]: e.target.value });
    };
  
    // Envío del formulario para registrar un pago
    const handleSubmitGuardar = async (e) => {
      e.preventDefault();
      setMensajeGuardar("");
  
      const formData = new URLSearchParams();
      Object.keys(pago).forEach((key) => {
        formData.append(key, pago[key]);
      });
  
      try {
        const response = await fetch(
          "http://localhost:8080/Prestamos/api/Pagos/guardar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
          }
        );
  
        const data = await response.json();
        if (response.ok) {
          setMensajeGuardar(
            "Pago registrado exitosamente. Cuota: " +
              data.cuota +
              ", Monto Restante: " +
              data.monto_restante
          );
        } else {
          setMensajeGuardar(data.error || "Error al guardar pago");
        }
      } catch (error) {
        setMensajeGuardar("Error al conectar con el servidor");
      }
    };
  
    // Manejo de cambios para el formulario de "abonar"
    const handleChangeAbonar = (e) => {
      setAbonoData({ ...abonoData, [e.target.name]: e.target.value });
    };
  
    // Envío del formulario para registrar un abono
    const handleSubmitAbonar = async (e) => {
      e.preventDefault();
      setMensajeAbonar("");
  
      const formData = new URLSearchParams();
      Object.keys(abonoData).forEach((key) => {
        formData.append(key, abonoData[key]);
      });
  
      try {
        const response = await fetch(
          "http://localhost:8080/Prestamos/api/Pagos/abonar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
          }
        );
  
        const data = await response.json();
        if (response.ok) {
          setMensajeAbonar(
            "Abono registrado exitosamente. Nuevo Monto Restante: " +
              data.nuevoMontoRestante
          );
        } else {
          setMensajeAbonar(data.error || "Error al registrar abono");
        }
      } catch (error) {
        setMensajeAbonar("Error al conectar con el servidor");
      }
    };
  
    return (
      <div>
        {/* Formulario para registrar pago */}
        <Card>
          <CardHeader>
            <h2>Registrar Pago</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitGuardar}>
              <Input
                type="number"
                name="id_prestamo"
                placeholder="ID Préstamo"
                onChange={handleChangeGuardar}
                required
              />
              <Input
                type="number"
                name="id_asesor"
                placeholder="ID Asesor"
                onChange={handleChangeGuardar}
                required
              />
              <Input
                type="number"
                name="id_cliente"
                placeholder="ID Cliente"
                onChange={handleChangeGuardar}
                required
              />
              <Button type="submit">Guardar Pago</Button>
            </form>
            {mensajeGuardar && (
              <p style={{ textAlign: "center", color: "red" }}>
                {mensajeGuardar}
              </p>
            )}
          </CardContent>
        </Card>
  
        <br />
  
        {/* Formulario para registrar abono */}
        <Card>
          <CardHeader>
            <h2>Registrar Abono</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitAbonar}>
              <Input
                type="number"
                name="id_prestamo"
                placeholder="ID Préstamo"
                onChange={handleChangeAbonar}
                required
              />
              <Input
                type="number"
                name="abono"
                placeholder="Monto del Abono"
                onChange={handleChangeAbonar}
                required
              />
              <Button type="submit">Registrar Abono</Button>
            </form>
            {mensajeAbonar && (
              <p style={{ textAlign: "center", color: "red" }}>
                {mensajeAbonar}
              </p>
            )}

            {/* Botón para volver al menú */}
        <Button onClick={() => navigate("/menu")} style={{ background: "#28a745" }}>
          Volver al Menú
        </Button>        
          </CardContent>
        </Card>
      </div>
    );
  }
  
  export default PagosForm;