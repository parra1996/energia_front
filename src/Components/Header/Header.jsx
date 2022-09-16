
import React, { useEffect, useState } from 'react';
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
                <div className="headercitos" style={{color : "blue"}}>
                    pokeAPI
                </div>
                <div className="headercitos">
                <Button color='demo' style={{pointer:'cursor'}} onClick={() => navegar("/login")}>Login</Button>&nbsp;
                <Button color='demo' onClick={() => navegar("/register")}>Register</Button> 
                </div>
                <div className="headercitos">
                </div>
            </div>
        )
    }
    else  {
        return (
            <div className='header'>
                <div className="headercitos" style={{color : "blue", cursor : "pointer"}} onClick={()=>navigate('/')}> 
                    pokeAPI
                </div>
                <div className="headercitos">
                <Button color="demo"  onClick={() => logOut()}>LogOut</Button>&nbsp;
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