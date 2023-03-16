import axios from "../../../../../../../../../node_modules/axios/index";

export const saldarMonto = async (client, monto) => {
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
    }
}

export const saldarInteres = async (client) => {
    const newDate = new Date(client.vencimiento);
    newDate.setMonth(newDate.getMonth() + 1);
    client.vencimiento = newDate;
    await axios.put("api/clients/Modificar/" + client.idCliente, client);
    showClients();
}

export const showClients = async () => {
    const res = await axios("api/clients/Lista");
    return res;
}

export const formatDate = (string) => {
    //let options = { year: 'numeric', month: 'long', day: 'numeric' };
    //let fecha = new Date(string).toLocaleDateString("es-AR", options);
    let fecha = string.split("T");
    return fecha[0];
}

export const deleteClient = async (id) => {
    await axios.delete("api/clients/Eliminar/" + id);
    //if (res.status === 200);
    //Mostrar snackbar personalizado diciendo que se eliminó el cliente correctamente.
    showClients();
}