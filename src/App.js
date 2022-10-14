import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CountryDetails from './pages/CountryDetails';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log('app effect running');
    async function getCountries() {
      const data = await fetch('https://restcountries.com/v3.1/all');
      const countryList = await data.json();
      setCountries(countryList);
    }
    getCountries();
  }, []);
  return (
    <>
      <div>HEADER</div>
      <Routes>
        <Route path="/" element={<Home countries={countries} />} />
        <Route path="/:id" element={<CountryDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
