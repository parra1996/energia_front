import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

import { Input } from '@mantine/core';
import { Button } from '@mantine/core';

import './Login.css';

const Login = (props) => {

    let navigate = useNavigate();

    const [datosUsuario, setDatosUsuario] = useState({ userName: "", password: "" });
    const [msgError2, setMsgError2] = useState("");

    //Funciones handlers
    const rellenarDatos = (e) => {
        setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value })
    };

    //Funciones locales

    const login = async () => {

        try {

            let body = {
                userName: datosUsuario.userName,
                password: datosUsuario.password
            }
            let resultado = await axios.post("http://localhost:5000/users/login", body);

            if (resultado.data === "Usuario o contraseña inválido") {
                setMsgError2("Usuario o contraseña inválido")
            } else {
                console.log("logueado")
                props.dispatch({ type: LOGIN, payload: resultado.data });
                navigate("/");
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (

        <div className='login'>
            <div className="designFormulario">
                <div className="form">
                    <Input type="email" name="userName" id="userName" placeholder="userName" onChange={(e) => { rellenarDatos(e) }} /> <br />
                    <Input type="password" name="password" id="password" title="password" placeholder="password" autoComplete="off" onChange={(e) => { rellenarDatos(e); }} />
                    {/* {msgError} */}
                    {msgError2}
                </div><br />
                <div className="bott">
                    <Button color="demo" onClick={() => { login() }} >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );

};


export default connect()(Login);