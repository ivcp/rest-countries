import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './CountryDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import BorderCountry from '../components/BorderCountry';

const CountryDetails = ({ loading, setLoading, countries }) => {
  const { id } = useParams();
  const [countryDetails, setCountryDetails] = useState({});
  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = countryDetails;

  useEffect(() => {
    setLoading(true);
    async function getCountry() {
      try {
        const data = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        if (!data.ok) throw new Error('Page does not exist.');
        const country = await data.json();
        setCountryDetails(country[0]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError({
          error: true,
          message: err.message,
        });
      }
    }
    getCountry();
  }, [id, setLoading]);

  return (
    <main>
      <div className={styles.btnContainer}>
        <Link to="/" className={styles.backButton}>
          <FontAwesomeIcon className={styles.icon} icon={faArrowLeftLong} />
          Back
        </Link>
      </div>
      {Object.keys(countryDetails).length > 0 && !loading && !error.error && (
        <article className={styles.article}>
          <div className={styles.flagContainer}>
            <img
              className={styles.flag}
              src={flags.svg}
              alt={`flag of ${name.common}`}
            />
          </div>
          <div className={styles.details}>
            <h1>{name.common}</h1>
            <div className={styles.container}>
              <div>
                <p>
                  <span>Population:</span> {population.toLocaleString('en-US')}
                </p>
                <p>
                  <span>Region:</span> {region}
                </p>
                <p>
                  <span>Sub Region:</span> {subregion}
                </p>
                <p>
                  <span>Capital:</span> {capital}
                </p>
              </div>
              <div>
                <p>
                  <span>Top Level Domain:</span> {tld}
                </p>
                <p>
                  <span>Currencies:</span>{' '}
                  {Object.values(currencies).map((c, i) =>
                    Object.values(currencies).length === 1 ? (
                      <span key={c.name}>{c.name}</span>
                    ) : i === Object.values(currencies).length - 1 ? (
                      <span key={c.name}>{c.name}</span>
                    ) : (
                      <span key={c.name}>{c.name}, </span>
                    )
                  )}
                </p>
                <p>
                  <span>Languages:</span>{' '}
                  {Object.values(languages).map((l, i) =>
                    Object.values(languages).length === 1 ? (
                      <span key={l}>{l}</span>
                    ) : i === Object.values(languages).length - 1 ? (
                      <span key={l}>{l}</span>
                    ) : (
                      <span key={l}>{l}, </span>
                    )
                  )}
                </p>
              </div>
            </div>
            <div className={styles.bordersContainer}>
              <p>
                <span>Border countries:</span>
              </p>
              <div className={styles.borders}>
                {borders ? (
                  countries.map(
                    country =>
                      borders.includes(country.cca3) && (
                        <BorderCountry key={country.cca3} country={country} />
                      )
                  )
                ) : (
                  <p>None</p>
                )}
              </div>
            </div>
          </div>
        </article>
      )}
      {loading && <div>Loading...</div>}
      {error.error && <div>{error.message}</div>}
    </main>
  );
};

export default CountryDetails;
