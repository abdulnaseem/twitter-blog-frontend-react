import React from 'react';
import Logo from '../../assets/twitter-icon.jpg'
import './navbar.css'

const TwitterLogo = () => {
  return (
    <div>
      <img className="logo-mobile" src={Logo} />
    </div>
  );
}

export default TwitterLogo;