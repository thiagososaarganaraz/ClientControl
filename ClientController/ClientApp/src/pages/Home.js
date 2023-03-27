import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewClient from "../components/NewClient";
import UpdateClient from "../components/UpdateClient";

const Home = () => {
    const [clients, setClients] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [currentClient, setCurrentClient] = useState(null);
    const [monto, setMonto] = useState(0);
    //Sort TRUE means it will be sorted by expiring date. FALSE is by name.
    const [sort, setSort] = useState(true);
    const [search, setSearch] = useState("");
    const [found, setFound] = useState([]);

    const renderClients = (clients) => {
        return clients?.map((client, index) => (
            <div key={client.idCliente} id="list-container" className={client.vencimiento <= todayDate ? "list-group-item list-group-item-action p-2 border-3 border-danger m-1" : "list-group-item list-group-item-action p-2 m-1"}>
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
                            <h6 className="text-secondary my-auto text-wrap">Interes:</h6>
                            <h6 className="text-dark my-2 flex-md-1 mx-1 my-auto">{client.interes}%</h6>
                        </div>
                        <div className="d-flex flex-column text-center">
                            <h6 className="text-secondary my-auto text-wrap">Saldo:</h6>
                            <h6 className="text-dark my-2 flex-md-1 mx-1 my-auto">${client.resto}</h6>
                        </div>
                        <div className="d-flex flex-column text-center">
                            <h6 className="text-secondary my-auto text-wrap">Total:</h6>
                            <h6 className="text-dark my-2 flex-md-1 mx-1 my-auto">${client.deuda + ((client.interes / 100) * client.deuda) + client.resto}</h6>
                        </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between mt-2">
                        <input key={index} name="monto" value={client.value} onChange={(e) => handleChange(e)} className="form-control form-control-sm mr-2 mb-2 mb-md-0" placeholder="Monto a saldar" />
                        <button className="btn btn-sm btn-outline-dark mb-2 mb-md-0" onClick={() => saldarMonto(client)}>Saldar</button>
                        <button className="btn btn-sm btn-outline-success ml-md-auto mb-2 mb-md-0" onClick={() => saldarInteres(client)}>Renovar</button>
                        <button type="button" className="btn btn-sm btn-outline-info ml-md-auto mb-2 mb-md-0" onClick={(e) => handleUpdate(client, e)}>Editar</button>
                        <button type="button" className="btn btn-sm btn-outline-danger mb-2 mb-md-0" onClick={() => deleteClient(client.idCliente)}>X</button>
                    </div>
                </div>
            </div>
        ));
    }

    const todayDate = new Date().toISOString().split('T')[0];

    const handleOpen = () => {
        setModal(!modal);
    }

    const formatDate = (string) => {
        //let options = { year: 'numeric', month: 'long', day: 'numeric' };
        //let fecha = new Date(string).toLocaleDateString("es-AR", options);
        let fecha = string.split("T");
        return fecha[0];
    }

    const saldarInteres = async (client) => {
        const newDate = new Date(client.vencimiento);
        console.log("FECHA ACTUAL: " + client.vencimiento);
        newDate.setMonth(newDate.getMonth() + 1);
        client.vencimiento = newDate;
        await axios.put("api/clients/Modificar/" + client.idCliente, client);
        showClients();
    }

    const saldarMonto = async (client) => {
        const total = ((client.interes / 100) * client.deuda) + client.deuda;
        const totalInteres = (client.interes / 100) * client.deuda;
        if (monto > total) {
            console.log("El monto a saldar es mayor a la deuda");
            return;
        }
        if (monto < totalInteres) {
            client.resto = totalInteres - monto;
        } else {
            client.deuda = (client.deuda + ((client.interes / 100) * client.deuda)) - monto;
        }
        const newDate = new Date(client.vencimiento);
        newDate.setMonth(newDate.getMonth() + 1);
        client.vencimiento = newDate;
        const res = await axios.put("api/clients/Modificar/" + client.idCliente, client);
        if (res.status === 200) {
            console.log("Se edito con exito.", res.data);
        }
        showClients();
    }

    const showClients = async () => {
        const res = await axios("api/clients/Lista");
        if (res.status === 200) {
            if (sort) {
                //Cuando sort es true solo guardamos la lista que trajimos, la cual por defecto está ordenada por la clave vencimiento
                setClients(res.data);
            } else {
                //Ordenamos utilizando sort comparando las claves "nombre" del array de objetos
                const sorted = res.data.sort((a, b) => a.nombre.toLowerCase() < b.nombre.toLowerCase() ? -1 : ((b.nombre.toLowerCase() > a.nombre.toLowerCase()) ? 1 : 0));
                setClients(sorted);
            }
        };

    }

    const deleteClient = async (id) => {
        const res = await axios.delete("api/clients/Eliminar/" + id);
        //if (res.status === 200);
        //Mostrar snackbar personalizado diciendo que se eliminó el cliente correctamente.
        showClients();
    }

    const handleUpdate = (client, e) => {
        e.preventDefault();
        setCurrentClient(client);
        setUpdateModal(true);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setMonto(e.target.value);
    }

    const handleSort = () => {
        setSort(!sort);
    }


    //Muestra todos los clientes al primer renderizado
    useEffect(() => {
        showClients();
        console.log(clients);
    }, []);

    //Muestra los clientes segun cambie el sort (por vencimiento o por nombre)
    useEffect(() => {
        showClients();
    }, [sort]);

    //Muestra los clientes encontrados al usar el buscador
    useEffect(() => {
        const coincidences = [];
        if (search) {
            clients.map((e) => {
                if (e.nombre.toLowerCase().includes(search.toLowerCase())) coincidences.push(e);
            })
            setFound(coincidences);
            console.log(found);
        }
    }, [search]);

    return (
        <div className="container bg-dark p-4 vw-100">
            <div className="bg-light text-center rounded-pill p-2 mb-4">
                <h2 className="text-dark">Prestamos</h2>
            </div>
            <h3 className="text-light">Clientes</h3>
            <div className="d-flex">
                <button className="btn btn-light mx-auto p-3 px-4" onClick={handleOpen}>{!modal ? "Nuevo Cliente" : "Cerrar"}</button>
            </div>
            <div className="row mt-4">
                {updateModal && currentClient ? <UpdateClient
                    client={currentClient}
                    showClients={showClients}
                    modal={setUpdateModal}
                    onClose={() => setCurrentClient(null)}
                /> : ""}
                {modal ? <NewClient showClients={showClients} /> : ""}
                <div className="col-12 pt-4">
                    <input className="form-control mb-2" placeholder="Buscar por nombre..." onChange={(e) => setSearch(e.target.value)} value={search} />
                    <nav className="d-flex justify-content-center">
                        <button type="button" className="btn border text-light mb-2" onClick={handleSort}>Ordenar por: <b>{sort ? "vencimiento" : "nombre"}</b></button>
                    </nav>
                    <div className="list-group">
                        {clients?.length ? (found.length ? renderClients(found) : (search.length ? <h5 className="text-secondary text-center py-4">No se encontraron coincidencias.</h5> : renderClients(clients)))
                            :
                            <div>
                                <h5 className="text-secondary text-center py-4">No hay ningun cliente todavia.</h5>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;