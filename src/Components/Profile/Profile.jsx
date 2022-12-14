
import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { PokeContext } from '../../Containers/Home/Home';
import axios from 'axios';
import { Button,Image,Text,Card, Input } from '@mantine/core';
import "./Profile.css";
import { checkError } from '../../tools';
import { MODIFY_CREDENTIALS } from '../../redux/types';

const Perfil = (props) => {

    const capturados = useContext(PokeContext) 

    const [pokes, setPokes] = useState([])

    const [mensaje, setMensaje] = useState("")

    const [datosUsuario, setDatosUsuario] = useState({
        userName: '',
        password: ''
    });

    useEffect(() => {
        mostrar();
    }, [capturados]);
    
    useEffect(() => {
    }, [pokes])
    
    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    const updateUser = async () => {

        let arrayCampos = Object.entries(datosUsuario);
        let error = "";

        for (let elemento of arrayCampos) {
            error = checkError(elemento[0], elemento[1]);

            if (error !== "ok") {
                setMensaje(error);
                return;
            };
        }  

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        let body = {
            _id: props.credentials.user._id,
            userName: datosUsuario.userName,
            password: datosUsuario.password,
        }

        try {
            let res = await axios.put(`https://jppl-energia.herokuapp.com/users/`, body,config);
            if (res) {
                setMensaje("datos actualizados con exito")
                props.dispatch({ type: MODIFY_CREDENTIALS, payload: datosUsuario });

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
            let res = await axios.post(`https://jppl-energia.herokuapp.com/users/mostrar/${_id}`,);
            setPokes(res.data);
        } catch (error) {
            setMensaje(error)
        }
    }

    if (props.credentials?.token) {
        return (
            <div className="perfil">
                <div className="datos">
                    <div className=''>
                        <div variant='success'><b>usuario viejo: </b>{props.credentials.user.userName}</div>
                        <div variant='success'><b>usuario nuevo:</b><Input className='inp' type="text" name="userName" id="userName" title="userName" placeholder="usuario nuevo" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} /></div>
                        <div variant='success'><b>Contrase??a nueva:</b><Input className='inp' type="text" name="password" id="password" title="password" placeholder="contrase??a nueva" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} /></div>
                        <br/>
                        <Button color="yellow" onClick={() => updateUser()}>Actualizar datos</Button>
                        {mensaje}
                    </div>
                </div>
                <div className="pokes">
                    {
                        pokes?.map(results => {
                            return (
                                <Card shadow="sm" p="lg" key={results.id} radius="md" withBorder className='card'>
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