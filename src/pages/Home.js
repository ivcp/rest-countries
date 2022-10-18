import React, { useState, useRef } from 'react';
import Card from '../components/Card';
import Filter from '../components/Filter';
import Search from '../components/Search';
import styles from './Home.module.css';

const Home = ({ countries }) => {
  const [searching, setSearching] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const searchRef = useRef();
  const filterRef = useRef();

  return (
    <main>
      <div className={styles.searchAndFilter}>
        <Search
          searchRef={searchRef}
          filterRef={filterRef}
          countries={countries}
          setSearchResults={setSearchResults}
          setSearching={setSearching}
          setFiltering={setFiltering}
        />
        <div className={styles.filterContainer}>
          <Filter
            countries={countries}
            setFiltering={setFiltering}
            setSearching={setSearching}
            setFilterResults={setFilterResults}
            searchRef={searchRef}
            filterRef={filterRef}
          />
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
