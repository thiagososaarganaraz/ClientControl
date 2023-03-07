import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

    const [clients, setClients] = useState([]);

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
                <div className="col-sm-12">
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