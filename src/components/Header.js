import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
const Header = () => {
  const [nightMode, setNightMode] = useState(true);

  const toggleTheme = () => {
    setNightMode(prev => !prev);
  };

  useEffect(() => {
    nightMode
      ? document.body.classList.remove('light')
      : document.body.classList.add('light');
  }, [nightMode]);

  return (
    <header className={styles.header}>
      <h1>Where in the world?</h1>
      <button onClick={toggleTheme}>
        <FontAwesomeIcon
          icon={nightMode ? faSun : faMoon}
          className={!nightMode ? styles.light : ''}
        />{' '}
        {nightMode ? 'Light' : 'Dark'} Mode
      </button>
    </header>
  );
};

export default Header;
