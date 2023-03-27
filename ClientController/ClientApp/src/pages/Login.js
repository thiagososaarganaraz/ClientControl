import React from "react"

const Login = () => {
    return (
        <div className="container bg-dark p-4 m-auto align-middle">
            <h2 className="text-center text-white">Login</h2>
            <form>
                <div className="form-group col-10 col-sm-8 mx-auto">
                    <label className="label label-default text-light">User</label>
                    <input name="user" type="text" className="form-control"/>
                </div>
                <div className="form-group col-10 col-sm-8 mx-auto">
                    <label className="label label-default text-light">Password</label>
                    <input name="password" type="password" className="form-control" />
                </div>
                <div className="d-flex">
                    <button className="w-auto mx-auto btn btn-light mt-4">Iniciar Sesion</button>
                </div>
            </form>
        </div>
    )
}

export default Login;