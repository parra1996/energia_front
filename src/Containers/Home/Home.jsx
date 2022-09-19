import { useState, createContext , useEffect} from "react";
import './Home.css';
import axios from 'axios';
import Profile from '../../Components/Profile/Profile';
import { connect } from 'react-redux';
import { Button, Card, Text, Image } from '@mantine/core';

export const PokeContext = createContext()
const Home = (props) => {
    

    const [pokemones, setPokemones] = useState([]);
    const [msjerr, setMsjerr] = useState("");
    const [capturados,setCapturados] = useState([])

    useEffect(() => {
        traer()
    }, []);

    useEffect(() => {

    }, [pokemones]);

    const mostrar = async () => {

        let _id = props.credentials.user?._id
        try {
            let res = await axios.post(`https://jppl-energia.herokuapp.com/users/mostrar/${_id}`,);
            setCapturados(res.data);
        } catch (error) {
            setMsjerr(error)
        }
    }

    const traer = () => {
        try {
            axios.get("https://pokeapi.co/api/v2/pokemon?limit=30")
                .then(resp => {
                    let cantidad = resp.data.results.length;
                    for (let i = 0; i < cantidad; i++) {
                        axios.get(resp.data.results[i].url)
                            .then(result => {
                                setPokemones(prevArray => [...prevArray, result.data])
                            })
                    }
                })
        } catch (error) {
            setMsjerr(error);
        }
    }
    const adquirir = async (datica) => {
        let body = {
            _id: props.credentials.user._id,
            id_pokemon: datica.id,
            imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datica.id}.png`,
            nombre: datica.name,
            elemento: datica.types[0].type.name,
            vida: datica.stats[0].base_stat,
            ataque: datica.stats[1].base_stat,
            a_especial: datica.stats[3].base_stat,
            velocidad: datica.stats[5].base_stat,
            defensa: datica.stats[2].base_stat
        }

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        try {
            let res = await axios.post(`https://jppl-energia.herokuapp.com/users/atrapar`, body,config);
            if (res) {
                setMsjerr(res.data)
                mostrar()
            } else {
                setMsjerr("tienes muchos pokemons")
            }
        } catch (error) {
            setMsjerr(error)
        }
    }

    if (!props.credentials.user) {
        return (
            <div className='home'>
                <div className="lado_izq">
                    {msjerr} <br />
                    {
                        pokemones.map((datica) => {
                            return (
                                <div key={datica.id}>
                                    <Card shadow="sm" p="lg" radius="md" withBorder className='card'>
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
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="lado_der">
                    <Profile />
                </div>
            </div>
        )
    } else {
        return (
            <div className='home'>
                <div className="lado_izq">
                    {msjerr}
                    {
                        pokemones.map((datica) => {
                            return (
                                <div key={datica.id}>
                                    <Card shadow="sm" p="lg" radius="md" withBorder className='card'>
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
                                </div>
                            )
                        })
                    }
                </div>
                <div className="lado_der">
                    <PokeContext.Provider value={capturados}>
                        <Profile />
                    </PokeContext.Provider>
                </div>
            </div>
        )
    }

}

export default connect((state) => ({
    credentials: state.credentials
}))(Home);