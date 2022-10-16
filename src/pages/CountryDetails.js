import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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
      <Link to="/">Back</Link>
      {Object.keys(countryDetails).length > 0 && !loading && !error.error && (
        <>
          <img src={flags.svg} alt={`flag of ${name.common}`} />
          <h1>{name.common}</h1>
          <p>Population: {population.toLocaleString('en-US')}</p>
          <p>Region: {region}</p>
          <p>Sub Region: {subregion}</p>
          <p>Capital: {capital}</p>
          <p>Top Level Domain: {tld}</p>
          <p>
            Currencies:{' '}
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
            Languages:{' '}
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
          <div>
            <p>Border countries:</p>
            {borders ? (
              countries.map(
                country =>
                  borders.includes(country.cca3) && (
                    <Link key={country.cca3} to={`/${country.cca3}`}>
                      {country.name.common}
                    </Link>
                  )
              )
            ) : (
              <p>None</p>
            )}
          </div>
        </>
      )}
      {loading && <div>Loading...</div>}
      {error.error && <div>{error.message}</div>}
    </main>
  );
};

export default CountryDetails;
