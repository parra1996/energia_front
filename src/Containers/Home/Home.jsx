import React, { useEffect, useState } from 'react';

import './Home.css';
import axios from 'axios';

const Home = () => {

    const [pokemon, setPokemon] = useState({
        name: "", img: ""
    });

    useEffect(() => {


        // traer();
    }, []);


    const traer = () => {

        try {

            axios.get("https://pokeapi.co/api/v2/pokemon/charmander").then(
                (response) => {
                    setPokemon({ name: response.data.name, img: response.data.sprites.front_default });

                }
            )

        } catch (error) {
            console.log(error);
        }


    }
    return (
        <div className='home'>

            <div className="lado_der">
                <>
            {
                pokemon.name
            }
                <img src={pokemon.img} />
                
                </>

            <div id="boton" onClick={() => traer()}>traer</div>

            </div>
            
            <div className="lado_izq">

                que fue
            </div>



        </div>
    )
}
export default Home;