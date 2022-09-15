
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { MODIFY_CREDENTIALS } from '../../redux/types';
import axios from 'axios';

import { Button } from '@mantine/core';

import "./Profile.css";

const Perfil = (props) => {

    let navigate = useNavigate();

    // const [recetas_adquiridas, setRecetas_adquiridas] = useState([]);

    const [contrasena, setContrasena] = useState({
        claveAnterior: undefined,
        claveNueva: undefined,
    })

    //Hooks
    const [datosUsuario, setDatosUsuario] = useState({
        userName: '',
        password : '' 
    });

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

    // useEffect(() => {
    //     if (props.credentials.token === '') {
    //         navigate("/");
    //     }

    //     // mostrarPedido();
    // }, [])

    useEffect(() => {
    }, [props.credentials.user])

    // const borrar_pedido = async (id) => {

    //     try {
    //         let config = {
    //             headers: { Authorization: `Bearer ${props.credentials.token}` }
    //         };

    //         let res = axios.delete(`https://jppl-hbc-back.herokuapp.com/receta_adquirida/${id}`, config)
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

    // const mostrarPedido = async () => {

    //     let config = {
    //         headers: { Authorization: `Bearer ${props.credentials.token}` }
    //     };

    //     let id = props.credentials.usuario.id;

    //     let res = await axios.get(`https://jppl-hbc-back.herokuapp.com/receta_adquirida/${id}`, config);

    //     setRecetas_adquiridas(res.data);
    // }

    // const updateUser = async () => {

    //     let config = {
    //         headers: { Authorization: `Bearer ${props.credentials.token}` }
    //     };

    //     let body = {
    //         id: props.credentials.usuario.id,
    //         userName: props.credentials.usuario.contrasena,
    //         newPassword: datosUsuario.newPassword,
    //     }
    //     try {
    //         //Hacemos el update en la base de datos
    //         let res = await axios.put(`http://localhost:5000/users/`, body, config);
    //         if (res) {
    //            console.log("usuario actualizado")
    //             setTimeout(() => {
    //                 window.location.reload();

    //             }, 2000);
    //         }
    //     } catch (error) {
    //         console.log(error)
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
                        <Button variant="outline-success" onClick={() => updateUser()}>Actualizar datos</Button>
                    </div>
                </div>
                <div className="recetas_fav">

                    {/* <Accordion defaultActiveKey="0" >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Lista de tus recetas favorita {props.credentials.usuario.nombre}</Accordion.Header>
                            <Accordion.Body className='acordeon' >
                                {
                                    recetas_adquiridas.map(results => {
                                        return (
                                            <div className="pedidos2" key={results.id}>
                                                <img className='cartel3' src={results.imagen} alt=''></img>
                                                <p>
                                                    Nombre: {results.nombre}.
                                                </p>
                                                <Button variant="danger" onClick={() => borrar_pedido(results.id)}>borrar receta</Button>
                                                <br /><br />
                                            </div>
                                        )
                                    })
                                }
    
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> */}
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