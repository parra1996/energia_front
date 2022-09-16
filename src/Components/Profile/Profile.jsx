
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { Button,Image,Text,Card, Input } from '@mantine/core';

import "./Profile.css";

const Perfil = (props) => {

    let navigate = useNavigate();

    const [pokes, setPokes] = useState([])

    const [mensaje, setMensaje] = useState("")

    const [datosUsuario, setDatosUsuario] = useState({
        userName: '',
        password: ''
    });

    useEffect(() => {

        mostrar();
    }, []);

    
    useEffect(() => {
    }, [pokes])
    
    useEffect(() => {
    }, [datosUsuario])
    
    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };
    // const liberarPoke = async (id) => {

    //     try {
    //         let config = {
    //             headers: { Authorization: `Bearer ${props.credentials.token}` }
    //         };

    //         let res = axios.delete(`http://localhost:5000/users/`, config)
    //         if (res) {
    //         console.log("poke eliminado con exito")

    //             setTimeout(() => {
    //                 window.location.reload();

    //             }, 2000);
    //         }
    //     } catch (error) {
    //         console.log("error");
    //     }
    // }

    const updateUser = async () => {

        let body = {
            _id: props.credentials.user._id,
            userName: datosUsuario.userName,
            password: datosUsuario.password,
        }

        console.log(body)
        try {
            //Hacemos el update en la base de datos
            let res = await axios.put(`http://localhost:5000/users/`, body);
            if (res) {
                console.log(res, "esto es res")
                setDatosUsuario(body.userName,body.password)
                setMensaje("datos actualizados con exito")
                //     setTimeout(() => {
                //         window.location.reload();

                //     }, 2000);
            }else {
                console.log("hubo un problema")
            }
        } catch (error) {
            console.log(error)
        }

    }

    const mostrar = async () => {

        let _id = props.credentials.user._id

        try {

            let res = await axios.post(`http://localhost:5000/users/mostrar/${_id}`,);
            setPokes(res.data);
            console.log(res, "ESTO ES POKW")
            console.log(_id, "ESTO ES ODY")
        } catch (error) {
            console.log(error)
        }

    }

    if (props.credentials.token) {
        return (
            <div className="perfil">
                <div className="datos">
                    <div className=''>
                        <div variant='success'><b>usuario: </b>{props.credentials.user?.userName}</div>
                        <div variant='success'><b>usuario nuevo:</b><Input className='inp' type="text" name="userName" id="userName" title="userName" placeholder="usuario nuevo" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} /></div>
                        <div variant='success'><b>Contraseña nueva:</b><Input className='inp' type="text" name="password" id="password" title="password" placeholder="contraseña nueva" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} /></div>
                        <br/>
                        <Button color="yellow" onClick={() => updateUser()}>Actualizar datos</Button>
                        {mensaje}
                    </div>
                </div>
                <div className="pokes">
                    {
                        pokes.map(results => {
                            return (
                                <Card shadow="sm" p="lg" radius="md" withBorder className='card'>
                                <Card.Section>
                                    <Image
                                        src={results.imagen}
                                        height={160}
                                        alt=""
                                    />
                                </Card.Section>
                                <Text size="sm" color="dimmed">
                                nombre :{results.nombre} <br />
                                elemento: {results.elemento} <br />
                                ataque: {results.ataque} <br />
                                ataque especial: {results.a_especial} <br />
                                vida: {results.vida} <br />
                                velocidad: {results.velocidad} <br />
                                defensa: {results.defensa} <br />
                                </Text>
                            </Card>
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        <p>logueate</p>
    }
}

export default connect((state) => ({
    credentials: state.credentials
}))(Perfil);