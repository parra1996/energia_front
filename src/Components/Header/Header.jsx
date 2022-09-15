
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../redux/types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import { Button } from '@mantine/core';

const Header = (props) => {

    let navigate = useNavigate();


    const navegar = (lugar) => {

        setTimeout(() => {
            navigate(lugar);
        }, 200);

    }


    const [nombre, setNombre] = useState("");

    useEffect(() => {
    },[])
    

    const logOut = () => {
        props.dispatch({ type: LOGOUT });

    }

    const manejador = (ev) => {
        setNombre(ev.target.value);
    }

    
    if (!props.credentials?.token) {
        return (
            <div className='header' onClick={()=>navigate('/')}>
                <div className="headercitos">
                    POKEAPI
                </div>
                <div className="headercitos">
                <Button color='teal' style={{pointer:'cursor'}} onClick={() => navegar("/login")}>Login</Button>&nbsp;
                <Button color='red' onClick={() => navegar("/register")}>Register</Button> 
                </div>
                <div className="headercitos">
                </div>
            </div>
        )
    }
    else  {
        return (
            <div className='header'>
                <div className="headercitos" onClick={()=>navigate('/')}> 
                    POKEAPI
                </div>
                <div className="headercitos">
                <Button color="red"  onClick={() => logOut()}>LogOut</Button>&nbsp;
                </div>
                <div className="headercitos"></div>
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
    search: state.search
}))(Header);