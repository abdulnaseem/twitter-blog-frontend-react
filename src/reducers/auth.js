import {     
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GET_USERS
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    users: []
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.user.tokens[0].token)
            return {
                ...payload,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.user.tokens[0].token)
            return {
                ...payload,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            }
        default:
            return state;
    }

}