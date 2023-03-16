import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "../../../../../../../../node_modules/axios/index";
import NewClient from "./components/NewClient";

const App = () => {

    const [modal, setModal] = useState(false);
    const [monto, setMonto] = useState(0);
    const [clients, setClients] = useState([]);

    const handleOpen = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setMonto(e.target.value);
        console.log(monto);
    }

    const saldarMonto = async (client, monto) => {
        const total = (client.deuda + ((client.interes / 100) * client.deuda));
        if (monto > total) {
            console.log("El monto ingresado es mayor a la deuda.");
            return;
        }
        client.deuda = total - monto;
        const newDate = new Date(client.vencimiento);
        newDate.setMonth(newDate.getMonth() + 1);
        client.vencimiento = newDate;
        const res = await axios.put("api/clients/Modificar/" + client.idCliente, client);
        if (res.status === 200) {
            console.log("Se edito con exito.", res.data);
            showClients();
        }
    }

    const saldarInteres = async (client) => {
        const newDate = new Date(client.vencimiento);
        newDate.setMonth(newDate.getMonth() + 1);
        client.vencimiento = newDate;
        await axios.put("api/clients/Modificar/" + client.idCliente, client);
        showClients();
    }

    const showClients = async () => {
        const res = await axios("api/clients/Lista");
        setClients(res.data);
    }

    const formatDate = (string) => {
        //let options = { year: 'numeric', month: 'long', day: 'numeric' };
        //let fecha = new Date(string).toLocaleDateString("es-AR", options);
        let fecha = string.split("T");
        return fecha[0];
    }

    const deleteClient = async (id) => {
        await axios.delete("api/clients/Eliminar/" + id);
        //if (res.status === 200);
        //Mostrar snackbar personalizado diciendo que se eliminó el cliente correctamente.
        showClients();
    }

    useEffect(() => {
        showClients(setClients);
    }, [])

    return (
        <div className="container bg-dark p-4 vw-100">
            <div className="bg-light text-center rounded-pill p-2 mb-4">
                <h2 className="text-dark">RV Prestamos</h2>
            </div>
            <h3 className="text-light">{modal ? "Nuevo Cliente" : "Clientes"}</h3>
            <div className="row mt-4">
                {modal ? <NewClient showClients={showClients} /> : ""}
                <div className="d-flex">
                    <button className="btn btn-light mx-auto p-3 px-4" onClick={handleOpen}>{!modal ? "Nuevo Cliente" : "Cerrar"}</button>
                </div>
                <div className="col-12 pt-4">
                    <div className="list-group">
                        {clients.length ? clients?.map((client) => (
                            <div key={client.idCliente} id="list-container" className="list-group-item list-group-item-action p-1">
                                <div className="d-flex flex-column flex-md-row mx-auto">
                                    <div className="d-flex w-100 justify-content-around">
                                        <div className="d-flex flex-column text-center">
                                            <h6 className="text-secondary my-auto text-wrap">Vencimiento:</h6>
                                            <h6 className="text-danger my-2 flex-md-1 my-auto">{formatDate(client.vencimiento)}</h6>
                                        </div>
                                        <div className="d-flex flex-column text-center">
                                            <h6 className="text-secondary my-auto text-wrap">Nombre:</h6>
                                            <h5 className="text-primary my-2 flex-md-1 mx-2 my-auto">{client.nombre}</h5>
                                        </div>
                                        <div className="d-flex flex-column text-center">
                                            <h6 className="text-secondary my-auto text-wrap">Monto:</h6>
                                            <h6 className="text-dark my-2 flex-md-1 mx-2 my-auto">${client.deuda}</h6>
                                        </div>
                                        <div className="d-flex flex-column text-center">
                                            <h6 className="text-secondary my-auto text-wrap">Total:</h6>
                                            <h6 className="text-dark my-2 flex-md-1 mx-1 my-auto">${client.deuda + ((client.interes / 100) * client.deuda)}</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex w-100 justify-content-between mt-2">
                                        <input name="monto" value={monto} onChange={(e)=> handleChange(e)} className="form-control form-control-sm mr-2 mb-2 mb-md-0" placeholder="Monto a saldar" />
                                        <button className="btn btn-sm btn-outline-dark mb-2 mb-md-0" onClick={()=> saldarMonto(client,monto)}>Saldar</button>
                                        <button className="btn btn-sm btn-outline-success ml-md-auto mb-2 mb-md-0" onClick={() => saldarInteres(client)}>Saldar Interes</button>
                                        <button type="button" className="btn btn-sm btn-outline-danger mb-2 mb-md-0" onClick={() => deleteClient(client.idCliente)}>X</button>
                                    </div>
                                </div>
                            </div>
                        )) :
                        <div>
                            <h5 className="text-secondary text-center py-4">No hay ningun cliente todavia.</h5>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;