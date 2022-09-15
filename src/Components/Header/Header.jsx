
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../redux/types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Header.css';

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
                    {/* <img className='homeButton' style={{pointer:'cursor'}} src={require('../../img/aguacte.png')} onClick={()=>navigate('/')} alt="home" /> */}
                    POKEAPI
                </div>
                <div className="headercitos">
                {/* <div color='teal' style={{pointer:'cursor'}} onClick={() => navegar("/login")}>Login</div>&nbsp; */}
                <div className='' onClick={() => navegar("/register")}>Register</div> 
                </div>
                <div className="headercitos">
                </div>
            </div>
        )
    }else if(props.credentials.usuario.rol === true){
        return (
            <div className='header' onClick={()=>navigate('/')}>
                <div className="headercitos">
                    POKEAPI
                </div>
                <div className="headercitos">
                {/* <div color="teal" style={{pointer:'cursor'}} onClick={() => logOut()}>LogOut</div>&nbsp; */}
                </div>
                <div className="headercitos"></div>
            </div>
        )
    } else {
        return (
            <div className='header'>
                <div className="headercitos" onClick={()=>navigate('/')}> 
                    POKEAPI
                </div>
                <div className="headercitos">
                {/* <div color="teal" style={{pointer:'cursor'}} onClick={() => navegar("/perfil")}>{props.credentials?.usuario.nombre} {props.credentials?.usuario.apellido}</div>&nbsp; */}
                {/* <div color="teal" style={{pointer:'cursor'}} onClick={() => logOut()}>LogOut</div>&nbsp; */}
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