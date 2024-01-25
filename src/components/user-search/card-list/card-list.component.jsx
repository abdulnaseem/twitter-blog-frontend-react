import { Component } from 'react';
import './card-list.styles.css';
import Card from '../card/card.component';

const CardList = ({ data }) => {
  return (
    <div className="card-list">
      {
        data.map((user, i) => {
          return (
            <Card user={user} key={i} />
          )
        })
      }
    </div>
  );
}

export default CardList;
