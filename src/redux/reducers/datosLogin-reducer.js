import {LOGIN, LOGOUT, MODIFY_CREDENTIALS} from '../types';

const initialState = {
    token : '',
    usuario : {}
};

const datosLoginReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN :
            return action.payload;

        case LOGOUT : 
            return initialState;

        case MODIFY_CREDENTIALS :
            return {...state, user : {...state.user, userName : action.payload.userName, } };

        default :
            return state
    }
}

export default datosLoginReducer;