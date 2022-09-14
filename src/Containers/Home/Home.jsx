import React from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {

    const [datos, setDatos] = "";

    const traer = async () => {

        let res = await axios.get("http://localhost:5000/users/que");

        console.log(res.data)

        setDatos(res);

    }
    return (
        <div className=''>

            <div id="boton" onClick={() => traer()}>traer</div>

            {datos}
        </div>
    )
}
export default Home;