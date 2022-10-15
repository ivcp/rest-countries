import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, population, region, capital }) => {
  return (
    <Link to={`/${id}`}>
      <article key={id}>
        <h2>{name}</h2>
        <p>{population.toLocaleString('en-US')}</p>
        <p>{region}</p>
        <p>{capital}</p>
      </article>
    </Link>
  );
};

export default Card;
