
import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { PokeContext } from '../../Containers/Home/Home';
import axios from 'axios';
import { Button,Image,Text,Card, Input } from '@mantine/core';
import "./Profile.css";

const Perfil = (props) => {

    const capturados = useContext(PokeContext) 

    const [pokes, setPokes] = useState([])

    const [mensaje, setMensaje] = useState("")

    const [datosUsuario, setDatosUsuario] = useState({
        userName: '',
        password: ''
    });

    useEffect(() => {
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        mostrar();
    }, [capturados]);
    
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

    const updateUser = async () => {

        let body = {
            _id: props.credentials.user._id,
            userName: datosUsuario.userName,
            password: datosUsuario.password,
        }

        try {
            //Hacemos el update en la base de datos
            let res = await axios.put(`https://jppl-energia.herokuapp.com/users/`, body);
            if (res) {
                setDatosUsuario(body.userName,body.password)
                setMensaje("datos actualizados con exito")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }else {
                setMensaje("hubo un problema")
            }
        } catch (error) {
            setMensaje(error)
        }

    }

  const mostrar = async () => {


        let _id = props.credentials.user?._id

        try {
            let res = await axios.post(`http://localhost:5000/users/mostrar/${_id}`,);
            setPokes(res.data);
            console.log(res.data, "ESTOS SON TUS POKES")
        } catch (error) {
            setMensaje(error)
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
                                <Card shadow="sm" p="lg" key={results._id} radius="md" withBorder className='card'>
                                <Card.Section>
                                    <Image
                                        src={results.imagen}
                                        height={160}
                                        alt="pokemon"
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