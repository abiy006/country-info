import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { changeRegion, getCountriesInfo } from '../redux/countries/countriesSlice';
import CountryCard from './CountryCard';
import HomeImage from './HomeImage';

const CountriesList = () => {
  const country = useSelector((state) => state.countries);
  const [valueSearch, setValueSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (country.countries.length === 0) {
      dispatch(getCountriesInfo());
    }
  }, [dispatch, country.countries.length]);

  const cBR = country.countries.filter((c) => c.region === country.region).filter((country) => {
    if (valueSearch === '') {
      return country;
    }
    return country.name.includes(valueSearch);
  });

  const handleChange = (e) => {
    dispatch(changeRegion(e.target.value));
  };

  const handleSearchValue = (e) => {
    const value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase();
    setValueSearch(value);
  };

  const totalPopulation = () => {
    let total = 0;
    cBR.forEach((country) => {
      total += country.population;
    });
    return total;
  };

  return (
    <section className="countries-container-inside">
      {country.status === 'Loading' && <div className="text-white">Loading...</div>}
      {country.status === 'fulfilled' && (
        <>
          <div className="home-img-div">
            {/* <img src={lulmap} alt="Icon world map" /> */}
            <HomeImage />
          </div>
          <div className="search-bycountry-div">
            <input className="search-bycountry" type="search" onChange={handleSearchValue} placeholder="Search country" />
          </div>
          <div className="select-region-div">
            <p className="select-region-txt" htmlFor="region">Region</p>
            <select name="region" className="select-region-options" onChange={handleChange}>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Antarctic">Antarctic</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          <div className="total-population-div">
            <p>
              Estimated Total Population of
              {` ${country.region}`}
              {' '}
              is
              {` ${totalPopulation()}`}
              {' '}
              people.
            </p>
          </div>
          <div>
            <p className="country-stat-txt">Countries information</p>
          </div>
          <section className="countries-list">
            {cBR.map((country) => (
              <CountryCard
                key={country.name}
                name={country.name}
                flag={country.flag}
                population={country.population}
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default CountriesList;
