import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Menú Principal</h2>
      <button onClick={() => navigate("/asesor-form")} style={styles.button}>Registrar Asesor</button>
      <button onClick={() => navigate("/cliente-form")} style={styles.button}>Registrar Cliente</button>
      <button onClick={() => navigate("/prestamo-form")} style={styles.button}>Registrar Préstamo</button>
      <button onClick={() => navigate("/pagos-form")} style={styles.button}>Registrar Pago</button>
      <button onClick={() => navigate("/usuario-form")} style={styles.button}>Registrar Usuario</button> {/* ✅ Nuevo botón */}
    </div>
  );
}

const styles = {
  button: {
    padding: "10px",
    margin: "10px",
    width: "200px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Menu;
