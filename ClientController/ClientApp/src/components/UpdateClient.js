import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const UpdateClient = ({ showClients, client, setUpdateModal }) => {
    console.log(client);

    const initialInput = {
        nombre: client.nombre,
        deuda: client.deuda,
        vencimiento: client.vencimiento,
        descripcion: client.descripcion,
        cbu: client.cbu,
        clave: client.clave,
        fechaCobro: client.fechaCobro,
        fechaPrestamo: client.fechaPrestamo,
        interes: client.interes,
        tarjeta: client.tarjeta,
        cuotas: client.cuotas,
        resto: client.resto,
    }

    const [input, setInput] = useState(initialInput);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const messages = {
        successSavingClient: "Se ha editado el cliente correctamente",
        errorEmpty: "Por favor rellene todos los campos!",
        errorNewClient: "No se ha podido editar el cliente",
        errorDeletingClient: "No se ha podido eliminar el cliente",
    }

    const validator = async (input) => {
        if (
            !input.nombre.length
            || !input.deuda.length
            || !input.vencimiento.length
            || !input.clave.length
            || !input.interes.length
            || !input.tarjeta.length
        ) {
            return false
        };
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

    const handleClose = () => {
        setUpdateModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = await validator(input);
        if (validation) {
            const res = await axios.put("api/clients/Modificar/" + client.idCliente, client);
            console.log(res);
            if (res.status === 200) {
                setMessage(messages.successSavingClient);
                setSuccess(true);
                setInput(initialInput);
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
            <h3 className="text-center mt-2 text-white">Editar Cliente</h3>
            <form>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Nombre</label>
                    <input name="nombre" type="text" className="form-control" value={input.nombre} onChange={(e) => handleChange(e)} placeholder="Nombre" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Deuda</label>
                    <input name="deuda" type="text" className="form-control" value={input.deuda} onChange={(e) => handleChange(e)} placeholder="Deuda" />
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
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Fecha de Cobro</label>
                    <input name="fechaCobro" type="date" className="form-control" value={input.fechaCobro} onChange={(e) => handleChange(e)} placeholder="Fecha de Cobro" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Fecha de Prestamo</label>
                    <input name="fechaPrestamo" type="date" className="form-control" value={input.fechaPrestamo} onChange={(e) => handleChange(e)} placeholder="Fecha de Prestamo" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Interes</label>
                    <input name="interes" type="text" className="form-control" value={input.interes} onChange={(e) => handleChange(e)} placeholder="Interes" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Tarjeta</label>
                    <input name="tarjeta" type="text" className="form-control" value={input.tarjeta} onChange={(e) => handleChange(e)} placeholder="Tarjeta" />
                </div>
                <div className="form-group">
                    <label className="label label-default" style={{ color: "white" }}>Cuotas</label>
                    <input name="cuotas" type="text" className="form-control" value={input.cuotas} onChange={(e) => handleChange(e)} placeholder="Cuotas" />
                </div>
                <div className="d-flex flex-column">
                    <button className="btn btn-success mx-auto mt-2 px-4" onClick={handleSubmit}>Guardar</button>
                    <button className="btn btn-danger mx-auto mt-2 px-4" onClick={handleClose}>Cerrar</button>
                </div>
            </form>
            {error ? <div className="alert alert-danger">{message}</div> : ""}
            {success ? <div className="alert alert-success">{message}</div> : ""}
        </div>
    )
}

export default UpdateClient;