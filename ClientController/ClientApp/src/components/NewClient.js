import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";

const NewClient = ({ showClients }) => {
    const [input, setInput] = useState({
        nombre: "",
        deuda: "",
        vencimiento: "",
        descripcion: "",
        cbu: "",
        clave: "",
    });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const messages = {
        successSavingClient: "Se ha guardado el cliente correctamente",
        errorEmpty: "Por favor rellene todos los campos!",
        errorNewClient: "No se ha podido guardar el cliente",
        errorDeletingClient: "No se ha podido eliminar el cliente",
    }

    const validator = async (input) => {
        if (
            !input.nombre.length
            || !input.deuda.length
            || !input.vencimiento.length
            || !input.descripcion.length
            || !input.cbu.length
            || !input.clave.length
        ) return false;
        try {
            const res = await axios("api/clients/Lista");
            const data = res.data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].nombre.toLowerCase() === input.nombre.toLowerCase()) return false;
            }
        } catch (error) {
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = await validator(input);
        if (validation) {
            const res = await axios.post("api/clients/Guardar", input);
            if (res.status === 200) {
                setMessage(messages.successSavingClient);
                setSuccess(true);
                showClients();
                setTimeout(() => {
                    setSuccess(false);
                }, 3000)
            } else {
                setMessage(messages.errorNewClient);
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000)
            }
        } else {
            setMessage(messages.errorNewClient);
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
        }
    };

    return (
        <div>
            <form>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Nombre</label>
                    <input name="nombre" type="text" className="form-control" value={input.nombre} onChange={(e) => handleChange(e)} placeholder="Nombre" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Deuda</label>
                    <input name="deuda" type="number" className="form-control" value={input.deuda} onChange={(e) => handleChange(e)} placeholder="Deuda" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Vencimiento</label>
                    <input name="vencimiento" type="date" className="form-control" value={input.vencimiento} onChange={(e) => handleChange(e)} placeholder="Vencimiento" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Descripcion</label>
                    <input name="descripcion" type="text" className="form-control" value={input.descripcion} onChange={(e) => handleChange(e)} placeholder="Descripcion" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Cbu</label>
                    <input name="cbu" type="text" className="form-control" value={input.cbu} onChange={(e) => handleChange(e)} placeholder="CBU" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Clave</label>
                    <input name="clave" type="text" className="form-control" value={input.clave} onChange={(e) => handleChange(e)} placeholder="Clave" />
                </div>
                <button className="btn btn-primary mx-auto" onClick={handleSubmit}>Guardar</button>
            </form>
            {error ? <div className="alert alert-danger">{message}</div> : ""}
            {success ? <div className="alert alert-success">{message}</div> : ""}
        </div>
    )
}

export default NewClient;