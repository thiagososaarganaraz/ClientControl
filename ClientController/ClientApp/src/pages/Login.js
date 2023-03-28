import React, { useEffect, useState } from "react"
import axios from "../../../../../../../../../node_modules/axios/index";

const Login = () => {

    const initialInput = {
        nombreUsuario: "",
        password : "",
    }
    const [input, setInput] = useState(initialInput);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        //console.log("INPUT: ", input);
        //const res = await axios.post("api/users/Login", input);
        //console.log(res);
        const users = await axios("api/users/GetAllUsers");
        console.log(users);
    }

    return (
        <div className="container bg-dark p-4 m-auto align-middle">
            <h2 className="text-center text-white">Login</h2>
            <form>
                <div className="form-group col-10 col-sm-8 mx-auto">
                    <label className="label label-default text-light">User</label>
                    <input name="nombreUsuario" type="text" className="form-control" value={input.nombreUsuario} onChange={(e)=> handleChange(e)} />
                </div>
                <div className="form-group col-10 col-sm-8 mx-auto">
                    <label className="label label-default text-light">Password</label>
                    <input name="password" type="password" className="form-control" value={input.password} onChange={(e) => handleChange(e)} />
                </div>
                <div className="d-flex">
                    <button className="w-auto mx-auto btn btn-light mt-4" onClick={(e)=> handleLogin(e)}>Iniciar Sesion</button>
                </div>
            </form>
        </div>
    )
}

export default Login;