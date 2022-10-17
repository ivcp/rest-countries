import React, { useState, useRef } from 'react';
import Card from '../components/Card';
import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Home = ({ countries }) => {
  const [searching, setSearching] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const searchRef = useRef();
  const filterRef = useRef();

  const searchCountries = e => {
    if (e.target.value) {
      setSearching(true);
      setFiltering(false);
      filterRef.current.value = '';
    } else setSearching(false);

    setSearchResults(
      countries.filter(country =>
        country.name.common.toLowerCase().startsWith(e.target.value.trim())
      )
    );
  };

  const filterCountries = e => {
    const filter = e.target.value.trim();
    if (filter) {
      setFiltering(true);
      setSearching(false);
      searchRef.current.value = '';
    } else setFiltering(false);

    setFilterResults(countries.filter(country => country.region === filter));
  };

  return (
    <main>
      <div className={styles.searchAndFilter}>
        <div className={styles.search}>
          <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
          <input
            className={styles.searchInput}
            ref={searchRef}
            name="search"
            onChange={searchCountries}
            placeholder="Search for a country..."
          />
        </div>
        <div className={styles.filterContainer}>
          <select
            className={styles.filter}
            ref={filterRef}
            name="filter"
            id="filter"
            onChange={filterCountries}
          >
            <option value="" selected disabled hidden>
              Filter by Region
            </option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className={styles.countryCards}>
        {!searching &&
          !filtering &&
          countries.map(country => (
            <Card
              key={country.cca3}
              id={country.cca3}
              image={country.flags.svg}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))}

        {searching &&
          !filtering &&
          searchResults.map(country => (
            <Card
              key={country.cca3}
              id={country.cca3}
              image={country.flags.svg}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))}

        {filtering &&
          !searching &&
          filterResults.map(country => (
            <Card
              key={country.cca3}
              id={country.cca3}
              image={country.flags.svg}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))}
      </div>
    </main>
  );
};

export default Home;
