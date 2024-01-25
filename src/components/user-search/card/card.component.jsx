import { Component } from 'react';
import './card.styles.css';

const Card = ({ user }) => {

  const { _id, loginId } = user;
  
  return (
    <div key={_id}>
      <h2>{loginId}</h2>
    </div>
  );
}

export default Card;
