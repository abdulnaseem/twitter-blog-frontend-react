import axios from 'axios'
import { setAlert } from './alert'
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GET_USERS
} from './types'
import setAuthToken from '../utils/setAuthToken'

//load user
export const loadUser = () => async (dispatch) => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }

    try {
        const res = await axios.get('/api/v1.0/tweets/auth', config)

        console.log(res.data)

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch(error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//register user
export const register = ({ 
    firstname, 
    lastname, 
    contactnumber, 
    username, 
    email, 
    password }) => async (dispatch) => {

        const newUser = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            loginId: username,
            password: password,
            contactNumber: contactnumber
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(newUser)

        try {
            const res = await axios.post('/api/v1.0/tweets/register', body, config)
            console.log(res.data)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

            dispatch(loadUser())

        }
        catch(error) {

            const errors = error.response.data.errors

            if (errors) {
                Object.keys(errors).forEach(key => {
                    dispatch(setAlert(errors[key].message, 'danger'))
                })
            }

            dispatch({
                type: REGISTER_FAIL
            })
        } 

}

export const login = (email, password) => async (dispatch) => {

        const newUser = {
            email,
            password
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(newUser)

        try {
            const res = await axios.post('/api/v1.0/tweets/login', body, config)
            console.log(res.data)

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

            dispatch(loadUser())

            dispatch(setAlert('Login success', 'success'))

        }
        catch(error) {

            const errors = error.response.data.errors

            console.log(errors)

            if (errors) {
                Object.keys(errors).forEach(key => {
                    dispatch(setAlert(errors[key].message, 'danger'))
                })
            }

            dispatch({
                type: LOGIN_FAIL
            })
        }
}

//logout
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT })
}

//get all users
export const getUsers = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/v1.0/tweets/users/all');
        //console.log(res.data)

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch(err) {
        console.log(err) 
        dispatch({
            type: GET_USERS,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
