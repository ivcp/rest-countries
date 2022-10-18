import React from 'react';

import styles from './Filter.module.css';

const Filter = ({
  countries,
  setFiltering,
  setSearching,
  setFilterResults,
  filterRef,
  searchRef,
}) => {
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
    <>
      <label className={styles.srOnly} htmlFor="filter">
        Filter
      </label>
      <select
        className={styles.filter}
        ref={filterRef}
        name="filter"
        id="filter"
        onChange={filterCountries}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
};

export default Filter;
