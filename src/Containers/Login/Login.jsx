import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

import { Button, Input} from '@mantine/core';

import './Login.css';

const Login = (props) => {

    let navigate = useNavigate();

    const [datosUsuario, setDatosUsuario] = useState({ userName: "", password: "" });
    const [msgError2, setMsgError2] = useState("");

    const rellenarDatos = (e) => {
        setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value })
    };

    const login = async () => {

        try {
            let body = {
                userName: datosUsuario.userName,
                password: datosUsuario.password
            }
            let resultado = await axios.post(`https://jppl-energia.herokuapp.com/users/login`, body);
            if (resultado.data === "Usuario o contraseña inválido") {
                setMsgError2("Usuario o contraseña inválido")
            } else {
                setMsgError2("logueado")
                props.dispatch({ type: LOGIN, payload: resultado.data });
                navigate("/");
            }
        } catch (error) {
            setMsgError2(error)
        }
    };

    return (
        <div className='login'>
            <div className="designFormulario">
                <div className="form">
                    <Input type="email" name="userName" id="userName" placeholder="userName" onChange={(e) => { rellenarDatos(e) }} /> <br />
                    <Input type="password" name="password" id="password" title="password" placeholder="password" autoComplete="off" onChange={(e) => { rellenarDatos(e); }} />
                    {msgError2}
                </div><br />
                <div className="bott">
                    <Button color="yellow" onClick={() => { login() }} >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default connect()(Login);