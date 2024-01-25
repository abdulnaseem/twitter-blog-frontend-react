import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from './logo.component'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import './navbar.css'
import { BiSearchAlt2 } from 'react-icons/bi';

const Navigation = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <>  
            <div className='posts'>
                <Link to='/search'>
                    <BiSearchAlt2 size={23} />
                </Link>
            </div>
            <div className='posts'>
                <Link to='/posts'>
                    <h4>Tweets</h4>
                </Link>
            </div>
            <div className='post'>
                <Link to='/post'>
                    <h4>My Tweets</h4>
                </Link>
            </div>
            <div className='logout'>
                <Link to='/login' onClick={logout}>
                    <h4>Logout</h4>
                </Link>
            </div>
        </>

    );

    const guestLinks = (
        <div></div>
    )


    return (
        <div className="App">
            <Navbar>
                <Navbar.Brand className="logo">
                    <Logo />
                </Navbar.Brand>
                {
                    !loading && (
                        <>
                            { isAuthenticated ? authLinks : guestLinks }
                        </>
                    )
                }
            </Navbar>
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navigation);