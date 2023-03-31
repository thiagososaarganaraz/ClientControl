import React, { useEffect, useState } from "react"
import axios from "../../../../../../../../../node_modules/axios/index";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {

    const initialInput = {
        nombreUsuario: "",
        password: "",
    }

    const initialSnackbar = {
        status: false,
        message: "",
        error: false
    }

    const [input, setInput] = useState(initialInput);
    const [users, setUsers] = useState([]);
    const [snackbar, setSnackbar] = useState(initialSnackbar);


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("INPUT: ", input);
        try {
            const res = await axios(`api/users/Login/${input.nombreUsuario}/${input.password}`);
            if (res.status == 200) {
                localStorage.setItem("jwt", res.data);
                setSnackbar({
                    status: true,
                    message: "Bienvenido.",
                    error: false,
                })
                setTimeout(() => {
                    setSnackbar(initialSnackbar);
                }, 3000)
            }
        } catch (e) {
            setSnackbar({
                status: true,
                message: "No se pudo iniciar sesion.",
                error: true,
            })
            setTimeout(() => {
                setSnackbar(initialSnackbar);
            }, 3000)
        }
    }

    /*const getUsers = async () => {
        const res = await axios.get("api/users/GetUsers");
        console.log(res);
        setUsers(res.data);
        console.log(users);
    }

    useEffect(() => {
        getUsers();
    }, [])
    */

    return (
        <div className="container bg-dark p-4 m-auto align-middle">
                <div className="container m-auto">
                    <h2 className="text-center text-white">Login</h2>
                    <form>
                        <div className="form-group col-10 col-sm-8 mx-auto">
                            <label className="label label-default text-light">User</label>
                            <input name="nombreUsuario" type="text" className="form-control" value={input.nombreUsuario} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="form-group col-10 col-sm-8 mx-auto">
                            <label className="label label-default text-light">Password</label>
                            <input name="password" type="password" className="form-control" value={input.password} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="d-flex">
                            <button className="w-auto mx-auto btn btn-light mt-4" onClick={(e) => handleLogin(e)}>Iniciar Sesion</button>
                        </div>
                    </form>
                </div>
                {snackbar.status ? <div className={snackbar.error ? "alert alert-danger" : "alert alert-success"}>{snackbar.message}</div> : ""}
        </div>
    )
}

export default Login;