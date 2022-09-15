import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { checkError } from '../../tools';

import { Input } from '@mantine/core';
// import { Button } from '@mantine/core';

import './Register.css';

const Register = () => {

    // const notification = useNotifications();

    let navigate = useNavigate();

    //Hooks

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
        let error = "";

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

            let resultado = await axios.post("http://localhost:5000/users/", body);

            if (!resultado.data.error) {

                // setMsgError(resultado.data.error);
                console.log("regustrado")

                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='register'>

            <Input variant="default" style={{ padding: '.5em' }} name="userName" placeholder="userName" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{ padding: '.5em' }} name="password" placeholder="password" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{ padding: '.5em' }} name="password2" placeholder="password2" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <div className='boton' onClick={() => registrame()}>
                registrame
            </div> <br />
            <p> {msgError} </p>
        </div >
    )
}

export default Register;