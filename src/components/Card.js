import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ id, image, name, population, region, capital }) => {
  return (
    <Link to={`/${id}`}>
      <article key={id} className={styles.card}>
        <img src={image} alt={`flag of ${name}`} />

        <div className={styles.body}>
          <h2>{name}</h2>
          <p>
            Population: <span>{population.toLocaleString('en-US')}</span>
          </p>
          <p>
            Region: <span>{region}</span>
          </p>
          <p>
            Capital: <span>{capital}</span>
          </p>
        </div>
      </article>
    </Link>
  );
};

export default Card;
