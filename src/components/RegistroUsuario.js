import { useRef, useState } from "react";

export default function RegistroUsuario () {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        aceptarTerminos: false
    })
    const [mensaje, setMensaje] = useState('')
    const [mensajeCorrecto, setMensajeCorrecto] = useState('')

    //Referencia para mostrar valores desde el DOM
    const inputRef = useRef(null)

    const manejarCampo = (e) => {
        //Desestructuración de objetos
        const {name, type, value, checked } = e.target;
        setFormData({
            ...formData, [name]: type === 'checkbox' ? checked : value
        });
    }
    const manejarSubmit = (e) => {
        e.preventDefault()
        if(!formData.nombre){
            setMensaje('Por favor, ingrese su nombre')
            return
        }
        if(!formData.correo){
            setMensaje('El correo es un dato obligatorio')
            return
        }
        if(!formData.contrasena){
            setMensaje('La contraseña es un dato obligatorio')
            return
        }
        if(!formData.aceptarTerminos){
            setMensaje('Debes aceptar los términos y condiciones')
            return
        }
        const nombreRefValue = inputRef.current.value
        setMensaje('')
        setMensajeCorrecto('Formulario enviado correctamente, ' + nombreRefValue)

    }
    return (
        <div style={{maxWidth: '400px', margin: 'auto'}}>
            <h2>Formulario de Registro</h2>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Nombre</label><br />
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
                    <label>Correo</label><br />
                    <input 
                        type="text"
                        name="correo"
                        value={formData.correo}
                        onChange={manejarCampo}
                        placeholder="Tu correo"
                    />
                </div>
                <div>
                    <label>Contraseña</label><br />
                    <input 
                        type="text"
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
                            value={formData.aceptarTerminos}
                            onChange={manejarCampo} />
                        Acepto los términos y condiciones
                    </label>
                </div>
                <button type="submit">Registrate</button>
            </form>
            {mensaje && <p style={{color: 'red'}}>{mensaje}</p>}
            {mensajeCorrecto && <p style={{color: 'green'}}>{mensajeCorrecto}</p>}
        </div>
    )
}