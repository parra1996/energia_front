import React, { useEffect, useState } from 'react';

import './Home.css';
import axios from 'axios';
import Profile from '../../Components/Profile/Profile';
import { connect } from 'react-redux';
import { Button, Card, Text, Image } from '@mantine/core';


const Home = (props) => {

    const [pokemones, setPokemones] = useState([]);
    const [msj, setMsj] = useState("");
    const [msjerr, setMsjerr] = useState("");

    useEffect(() => {
        traer()
    }, []);

    const traer = () => {

        try {

            axios.get("https://pokeapi.co/api/v2/pokemon?limit=30")
                .then(resp => {
                    let cantidad = resp.data.results.length;
                    for (let i = 0; i < cantidad; i++) {
                        axios.get(resp.data.results[i].url)
                            .then(result => {
                                setPokemones(prevArray => [...prevArray, result.data])
                                console.log(result.data.sprites.other.official_artwork)
                            })
                    }
                })
        } catch (error) {
            setMsjerr(error);
        }

    }
    const adquirir = async (datica) => {

        // disponible = props.credentials.user.pokemons.length;

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

            try {
                let res = await axios.post("http://localhost:5000/users/atrapar", body);
                if (res) {
                    setMsj("POKEMON ATRAPADO")
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                } else {
                    setMsjerr("tienes muchos pokemons")
                }
            } catch (error) {
                setMsjerr(error)
            }
    }

    return (
        <div className='home'>
            <div className="lado_izq">
                {msj}
                {
                    pokemones.map((datica) => {
                        return (
                            <Card shadow="sm" p="lg" key={datica.id} radius="md" withBorder className='card'>
                                <Card.Section>
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datica.id}.png`}
                                        height={160}
                                        alt="poke"
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
                                <Button variant="light" color="yellow" fullWidth mt="md" radius="md" onClick={() => adquirir(datica)}>
                                    atrapar
                                </Button>
                            </Card>
                        )
                    })
                }
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