import React, { useState, useRef } from 'react';
import Card from '../components/Card';

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
      <input
        ref={searchRef}
        type="search"
        name="search"
        onChange={searchCountries}
      />
      <div>
        <select
          ref={filterRef}
          name="filter"
          id="filter"
          onChange={filterCountries}
        >
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      {!searching &&
        !filtering &&
        countries.map(country => (
          <Card
            key={country.cca3}
            id={country.cca3}
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
            name={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital}
          />
        ))}
    </main>
  );
};

export default Home;
