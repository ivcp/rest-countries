import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BorderCountry.module.css';

const BorderCountry = ({ country }) => {
  return (
    <Link className={styles.link} to={`/${country.cca3}`}>
      {country.name.common}
    </Link>
  );
};

export default BorderCountry;
