import React, { useEffect, useState } from 'react';

import './Home.css';
import axios from 'axios';

const Home = () => {

    const [pokemones, setPokemones] = useState([]);

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
    return (
        <div className='home'>

            <div className="lado_izq">
                {
                    pokemones.map((datica) => {
                        return (
                            <div className='cartas' key={datica.id}>
                                nombre:{datica.name} <br />
                                elemento:{datica.types[0].type.name} <br />
                                ataque:{datica.stats[1].base_stat} <br />
                                ataque especial:{datica.stats[3].base_stat} <br />
                                vida:{datica.stats[0].base_stat} <br />
                                velocidad:{datica.stats[5].base_stat} <br />
                                defensa:{datica.stats[2].base_stat} <br />
                                <img src={datica.sprites.front_default}></img>
                            </div>
                        )
                    })
                }
            </div>

            <div className="lado_der">

                que fue
            </div>



        </div>
    )
}
export default Home;