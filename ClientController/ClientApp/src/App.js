import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

    const [clients, setClients] = useState([]);
    const [input, setInput] = useState({
        nombre: "",
        deuda: "",
        vencimiento: "",
        descripcion: "",
        cbu: "",
        clave: "",
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log(input);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("api/clients/Guardar", input);
        if (res.status === 200) {
            showClients();
        } else {
            console.log("Status code: "+res.status);
        }
    };

    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-AR", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + " | " + hora;
    }

    const showClients = async () => {
        const res = await axios("api/clients/Lista");

        if (res.status === 200) setClients(res.data);
        console.log(clients);
    }

    useEffect(() => {
        showClients();
    }, [])

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white">Clientes</h2>
            <div className="row">
                <div className="col-sm-12"></div>
            </div>
            <div className="row mt-4">
                <form>
                    <div className="form-group">
                        <label className="label label-default" style={{ color: "white" }}>Nombre</label>
                        <input name="nombre" type="text" className="form-control" value={input.nombre} onChange={(e) => handleChange(e)} placeholder="Nombre"/>
                    </div>
                    <div className="form-group">
                        <label className="label label-default" style={{ color: "white" }}>Deuda</label>
                        <input name="deuda" type="number" className="form-control" value={input.deuda} onChange={(e) => handleChange(e)} placeholder="Deuda" />
                    </div>
                    <div className="form-group">
                        <label className="label label-default" style={{color:"white"}}>Vencimiento</label>
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
                <div className="col-sm-12 pt-4">
                    <div className="list-group">
                        {clients.map((client) => (
                            <div key={ client.idCliente} className="list-group-item list-group-item-action">
                                <h5 className="text-primary">{client.nombre}</h5>
                                <div className="d-flex justify-content-between">
                                    <small className="text-muted">{formatDate(client.vencimiento)}</small>
                                    <h4 className="text-secondary">${client.deuda}</h4>
                                    <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;