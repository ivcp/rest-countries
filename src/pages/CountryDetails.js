import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const { id } = useParams();
  const [countryDetails, setCountryDetails] = useState({});

  useEffect(() => {
    console.log('details effect running');
    async function getCountry() {
      const data = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
      const country = await data.json();
      setCountryDetails(country[0]);
    }
    getCountry();
  }, [id]);

  return (
    <main>
      <h1>{countryDetails.name?.common}</h1>
      <p>{countryDetails.population?.toLocaleString('en-US')}</p>
    </main>
  );
};

export default CountryDetails;
