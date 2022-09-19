import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { checkError } from '../../tools';

import { Input } from '@mantine/core';
import { Button } from '@mantine/core';

import './Register.css';

const Register = () => {

    let navigate = useNavigate();

    const [datosUsuario, setDatosUsuario] = useState({
        userName: "", password: "", password2: ""
    });

    const [msgError, setMsgError] = useState("");

    useEffect(() => {
    }, []);

    useEffect(() => {

    })

    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    const registrame = async () => {

        setMsgError("");

        // let arrayCampos = Object.entries(datosUsuario);

        if (datosUsuario.password !== datosUsuario.password2) {

            return (setMsgError("Los dos contraseñas deben de coincidir"));

        } else {
            setMsgError("");
        }

        let body = {
            userName: datosUsuario.userName,
            password: datosUsuario.password
        }
        try {

            let resultado = await axios.post("https://jppl-energia.herokuapp.com/users/", body);

            if (!resultado.data.error) {

                // setMsgError(resultado.data.error);
                setMsgError("Registrado")

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }


        } catch (error) {
            setMsgError(error);
        }
    }

    return (
        <div className='register'>

            <Input variant="default" className='input' name="userName" placeholder="userName" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" className='input' name="password" placeholder="password" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" className='input' name="password2" placeholder="password2" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Button  onClick={() => registrame()}>
                registrame
            </Button> <br />
            <p> {msgError} </p>
        </div >
    )
}

export default Register;