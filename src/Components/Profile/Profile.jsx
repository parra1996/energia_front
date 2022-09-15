
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { MODIFY_CREDENTIALS } from '../../redux/types';
import axios from 'axios';

import { Button,Image,Text,Card } from '@mantine/core';

import "./Profile.css";

const Perfil = (props) => {

    let navigate = useNavigate();

    const [contrasena, setContrasena] = useState({
        claveAnterior: undefined,
        claveNueva: undefined,
    })

    //Hooks
    const [datosUsuario, setDatosUsuario] = useState({
        userName: '',
        password: ''
    });

    const [pokes, setPokes] = useState([])

    // const rellenarDatos = (e) => {
    //     setDatosUsuario({
    //         ...datosUsuario,
    //         [e.target.name]: e.target.value
    //     })
    // };

    const rellenarDatos2 = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        // mostrar(props.credentials.user._id);
    }, [])

    useEffect(() => {
    }, [props.credentials.user])

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

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        let body = {
            id: props.credentials.user._id,
            userName: datosUsuario.userName,
            password: datosUsuario.password,
        }

        console.log(body)
        try {
            //Hacemos el update en la base de datos
            let res = await axios.put(`http://localhost:5000/users/`, body, config);
            if (res) {
                console.log("datos cambiados")
                //     setTimeout(() => {
                //         window.location.reload();

                //     }, 2000);
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
                        {/* <ListGroup variant="flush"> */}
                        <div variant='success'><b>usuario: </b>{props.credentials.user?.userName}</div>
                        <div variant='success'><b>usuario nuevo:</b><input className='inp' type="text" name="userName" id="userName" title="userName" placeholder="usuario nuevo" autoComplete="off" onChange={(e) => { rellenarDatos2(e) }} /></div>
                        <div variant='success'><b>Contraseña nueva:</b><input className='inp' type="text" name="password" id="password" title="password" placeholder="contraseña nueva" autoComplete="off" onChange={(e) => { rellenarDatos2(e) }} /></div>
                        {/* </ListGroup><br /> */}
                        <Button color="demo" onClick={() => updateUser()}>Actualizar datos</Button>
                    </div>
                </div>
                <div className="">

                    <Button color="teal" onClick={() => mostrar(props.credentials.user._id)}></Button>
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
                                nombre:{results.nombre} <br />
                                elemento:{results.elemento} <br />
                                ataque:{results.ataque} <br />
                                ataque especial:{results.a_especial} <br />
                                vida:{results.vida} <br />
                                velocidad:{results.velocidad} <br />
                                defensa:{results.defensa} <br />
                                </Text>

                                {/* <Button variant="light" color="teal" fullWidth mt="md" radius="md" onClick={()=>()}> */}
                                 {/* atrapar */}
                                {/* </Button> */}
                            </Card>
                            )
                        })
                    }
                </div>

                <div>

                </div>
            </div>
        )
    } else {
        <p>logueate </p>
    }
}

export default connect((state) => ({
    credentials: state.credentials
}))(Perfil);