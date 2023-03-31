import React, { useState } from 'react'
import axios from '../../../../../../../../../node_modules/axios/index';

const SignUp = () => {

    const initialInput = {
        nombre: "",
        nombreUsuario: "",
        password: "",
    }
    const [input, setInput] = useState(initialInput);


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log("INPUT: ", input);
        const res = await axios.post("api/users/SignUp", input);
        console.log(res);
    }

    return (
        <div className="container bg-dark p-4 m-auto align-middle">
            <div className="container m-auto">
                <h2 className="text-center text-white">Registrarse</h2>
                <form>
                    <div className="form-group col-10 col-sm-8 mx-auto">
                        <label className="label label-default text-light">Name</label>
                        <input name="nombre" type="text" className="form-control" value={input.nombre} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group col-10 col-sm-8 mx-auto">
                        <label className="label label-default text-light">User</label>
                        <input name="nombreUsuario" type="text" className="form-control" value={input.nombreUsuario} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group col-10 col-sm-8 mx-auto">
                        <label className="label label-default text-light">Password</label>
                        <input name="password" type="password" className="form-control" value={input.password} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="d-flex">
                        <button className="w-auto mx-auto btn btn-light mt-4" onClick={(e) => handleSignUp(e)}>Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;