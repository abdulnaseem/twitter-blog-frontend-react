import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './register.component.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import axios from 'axios'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

import PropTypes from 'prop-types'


const Register = ({ setAlert, register, isAuthenticated }) => {


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        contactnumber: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { firstname, lastname, contactnumber, username, email, password, password2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = async (e) => {
        e.preventDefault();
        
        if(formData.password !== formData.password2) {
            setAlert('Passwords do not match!', 'danger')
        }
        else{

            register({ firstname, lastname, contactnumber, username, email, password })
            // const newUser = {
            //     firstName: formData.firstname,
            //     lastName: formData.lastname,
            //     email: formData.email,
            //     loginId: formData.username,
            //     password: formData.password,
            //     contactNumber: formData.contactnumber
            // }

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser)

            //     const res = await axios.post('/api/v1.0/tweets/register', body, config)
            //     console.log(res.data)
            // }
            // catch(error) {
            //     console.error(error.response.data)
            // }
        }
        
    }

    if(isAuthenticated) {
        return <Navigate to='/dashboard' />
    }

    return(
        <div className="container">
            <h1 className="large">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user" /> Join Twitter today.
            </p>
            <Form onSubmit={onSubmit}>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="First Name" name="firstname" value={firstname} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Last Name" name="lastname" value={lastname} onChange={onChange}  />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Mobile Number" name="contactnumber" value={contactnumber} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Username" name="username" value={username} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={onChange} />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Control type="password" placeholder="Retype Password" name="password2" value={password2} onChange={onChange} />
                </Form.Group>

                <Button className="sign-up text-center" variant="primary" type="submit">
                    Sign Up!
                </Button>


            </Form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);