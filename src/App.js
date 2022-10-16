import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CountryDetails from './pages/CountryDetails';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('effect');
    setLoading(true);
    async function getCountries() {
      try {
        const data = await fetch('https://restcountries.com/v3.1/all');
        if (!data.ok) throw new Error('Something went wrong ☹');
        const countryList = await data.json();
        setCountries(countryList);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    }
    getCountries();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            !loading ? <Home countries={countries} /> : <div>Loading...</div>
          }
        />
        <Route
          path="/:id"
          element={
            <CountryDetails
              countries={countries}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
