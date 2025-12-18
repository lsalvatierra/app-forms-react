import { useRef, useState } from "react";

export default function RegistroUsuario() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    aceptarTerminos: false,
  });

  const [mensaje, setMensaje] = useState("");
  const [mensajeCorrecto, setMensajeCorrecto] = useState("");

  // Referencia para mostrar valores desde el DOM
  const inputRef = useRef(null);

  // ✅ REGEX
  const regex = {
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/, // solo letras y espacios, 2 a 50
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // email simple y efectivo
    // min 8, 1 mayus, 1 minus, 1 numero, 1 simbolo
    contrasena: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#\-_=+])[A-Za-z\d@$!%*?&.#\-_=+]{8,}$/,
  };

  const manejarCampo = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    setMensajeCorrecto("");

    // ✅ VALIDACIONES CON REGEX

    // Nombre
    if (!formData.nombre.trim()) {
      setMensaje("Por favor, ingrese su nombre");
      return;
    }
    if (!regex.nombre.test(formData.nombre.trim())) {
      setMensaje("Nombre inválido: solo letras y espacios (mín. 2 caracteres).");
      return;
    }

    // Correo
    if (!formData.correo.trim()) {
      setMensaje("El correo es un dato obligatorio");
      return;
    }
    if (!regex.correo.test(formData.correo.trim())) {
      setMensaje("Correo inválido. Ej: usuario@dominio.com");
      return;
    }

    // Contraseña
    if (!formData.contrasena) {
      setMensaje("La contraseña es un dato obligatorio");
      return;
    }
    if (!regex.contrasena.test(formData.contrasena)) {
      setMensaje(
        "Contraseña inválida: mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo."
      );
      return;
    }

    // Términos
    if (!formData.aceptarTerminos) {
      setMensaje("Debes aceptar los términos y condiciones");
      return;
    }

    // OK
    const nombreRefValue = inputRef.current?.value || formData.nombre;
    setMensaje("");
    setMensajeCorrecto("Formulario enviado correctamente, " + nombreRefValue);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Formulario de Registro</h2>

      <form onSubmit={manejarSubmit}>
        <div>
          <label>Nombre</label>
          <br />
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={manejarCampo}
            placeholder="Tu nombre"
            ref={inputRef}
          />
        </div>

        <div>
          <label>Correo</label>
          <br />
          <input
            type="text"
            name="correo"
            value={formData.correo}
            onChange={manejarCampo}
            placeholder="Tu correo"
          />
        </div>

        <div>
          <label>Contraseña</label>
          <br />
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={manejarCampo}
            placeholder="*******"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="aceptarTerminos"
              checked={formData.aceptarTerminos}   
              onChange={manejarCampo}
            />
            Acepto los términos y condiciones
          </label>
        </div>

        <button type="submit">Regístrate</button>
      </form>

      {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
      {mensajeCorrecto && <p style={{ color: "green" }}>{mensajeCorrecto}</p>}
    </div>
  );
}
