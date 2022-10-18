import React from 'react';
import styles from './Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = ({
  countries,
  setSearchResults,
  setSearching,
  setFiltering,
  filterRef,
  searchRef,
}) => {
  const searchCountries = e => {
    if (e.target.value) {
      setSearching(true);
      setFiltering(false);
      filterRef.current.value = '';
    } else setSearching(false);

    setSearchResults(
      countries.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim())
      )
    );
  };

  return (
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
  );
};

export default Search;
