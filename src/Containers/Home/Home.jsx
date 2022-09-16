import React, { useEffect, useState } from 'react';

import './Home.css';
import axios from 'axios';
import Profile from '../../Components/Profile/Profile';
import { connect } from 'react-redux';
import { Button, Card, Text, Image } from '@mantine/core';


const Home = (props) => {

    const [pokemones, setPokemones] = useState([]);
    const [msjerror, setMsjerror] = useState("");

    useEffect(() => {

        traer();
    }, []);

    const traer = () => {

        try {

            axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
                .then(resp => {
                    for (let i = 0; i < resp.data.results.length; i++) {
                        axios.get(resp.data.results[i].url)
                            .then(result => {
                                setPokemones(prevArray => [...prevArray, result.data])
                                console.log(result.data)
                            })
                    }
                })
        } catch (error) {
            console.log(error);
        }

    }

    const adquirir = async (datica) => {
        
    let disponible = props.credentials.user.pokemons.length;
    let numero = Math.random();

        let body = {
            _id: props.credentials.user._id,
            id_pokemon: datica.id,
            imagen: datica.sprites.front_default,
            nombre: datica.name,
            elemento: datica.types[0].type.name,
            vida: datica.stats[0].base_stat,
            ataque: datica.stats[1].base_stat,
            a_especial: datica.stats[3].base_stat,
            velocidad: datica.stats[5].base_stat,
            defensa: datica.stats[2].base_stat
        }

        console.log(numero, "NUMERO", disponible, "dispo")
        if(disponible < 5){

            try {
                console.log("entrmos")
    
                let res = await axios.post("http://localhost:5000/users/atrapar", body);
    
                if (res) {
                    console.log("lo atrape perro")
                } else {
                    console.log("huno un peo")
                }
    
            } catch (error) {
                console.log(error)
    
            }
        }else {
            console.log("tienes muchos pokes")
        }
    }


    return (
        <div className='home'>

            <div className="lado_izq">
                {
                    pokemones.map((datica) => {
                        return (

                            <Card shadow="sm" p="lg" radius="md" withBorder className='card'>
                                <Card.Section>
                                    <Image
                                        src={datica.sprites.front_default}
                                        height={160}
                                        alt="Norway"
                                    />
                                </Card.Section>
                                <Text size="sm" color="dimmed">
                                    nombre:{datica.name} <br />
                                    elemento:{datica.types[0].type.name} <br />
                                    ataque:{datica.stats[1].base_stat} <br />
                                    ataque especial:{datica.stats[3].base_stat} <br />
                                    vida:{datica.stats[0].base_stat} <br />
                                    velocidad:{datica.stats[5].base_stat} <br />
                                    defensa:{datica.stats[2].base_stat} <br />
                                </Text>

                                <Button variant="light" color="teal" fullWidth mt="md" radius="md" onClick={() => adquirir(datica)}>
                                    atrapar
                                </Button>
                            </Card>
                        )
                    })

                }
                {/* <div id="boton" onClick={() => traer()}>traer pokes</div> */}
            </div>

            <div className="lado_der">
                <Profile />
            </div>



        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Home);