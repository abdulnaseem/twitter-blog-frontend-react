import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, Navigate } from 'react-router-dom'
import './login.component.css'
import { login } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { propTypes } from 'react-bootstrap/esm/Image'
import Spinner from '../layout/Spinner';


const Login = ({ login, isAuthenticated, loading }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    //redirect if logged in
    if(isAuthenticated) {
        return loading ? setTimeout(() => {
            <Spinner />
        }, 2000) : <Navigate to='/posts' />
    }

    return(
        <div className="container">
            <h1 className="large login">Sign in to Twitter.</h1>

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={onChange} />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                </Form.Group>

                <Button className="sign-up text-center" variant="primary" type="submit">
                    Sign in
                </Button>
            </Form>
            <p className="my-1">
                Don't have an account? <Link to="/">Sign Up</Link>
            </p>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);