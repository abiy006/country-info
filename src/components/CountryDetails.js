import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountryDetails } from '../redux/countries/countriesSlice';

const DetailsCountry = () => {
  const country = useSelector((state) => state.countries);
  const { countryName } = useParams();
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetails(countryName));
  }, [dispatch, countryName]);

  useEffect(() => {
    if (country.detailsStatus === 'fulfilled') {
      if (country.countryDetails.currencies !== undefined) {
        const currencyKeys = Object.keys(country.countryDetails.currencies);
        setCurrencies(currencyKeys);
      }
      if (country.countryDetails.languages !== undefined) {
        const languagesKeys = Object.keys(country.countryDetails.languages);
        setLanguages(languagesKeys);
      }
    }
  }, [country.detailsStatus, countryName,
    country.countryDetails.currencies, country.countryDetails.languages]);

  const currencyParagraph = (currencyKeys) => {
    const currencyDiv = currencyKeys.map((key) => {
      if (country.countryDetails.currencies !== undefined) {
        const currency = country.countryDetails.currencies[key];
        if (currency) {
          return (
            <p key={key}>
              {currency.name}
              {' '}
              {currency.symbol}
            </p>
          );
        }
        return null;
      }
      return currencyDiv;
    });
    return currencyDiv;
  };

  const languageParagraph = (languageKeys) => {
    const languageDiv = languageKeys.map((key) => {
      if (country.countryDetails.languages !== undefined) {
        const language = country.countryDetails.languages[key];
        if (language) {
          return <p key={key}>{language}</p>;
        }
        return null;
      }
      return languageDiv;
    });
    return languageDiv;
  };

  return (
    <>
      {country.detailsStatus === 'Loading' && <div>Loading...</div>}
      {country.detailsStatus === 'fulfilled' && (
      <section className="country-detail-info">
        <div className="country-detail-img">
          <img src={country.countryDetails.flag} alt={`${country.name} flag`} />
          <h1>{country.countryDetails.official}</h1>
        </div>
        <section>
          <div className="county-info-div div-capital">
            <p>Capital</p>
            <p>{country.countryDetails.capital}</p>
          </div>
          <div className="county-info-div div-demonym">
            <p>Demonym</p>
            <p>{country.countryDetails.demonyms}</p>
          </div>
          <div className="county-info-div div-area">
            <p>Area</p>
            <p>
              {country.countryDetails.area}
              {' '}
              Km
              <sup>2</sup>
            </p>
          </div>
          <div className="county-info-div div-timezones">
            <p>Time Zones</p>
            <p>{country.countryDetails.timezones}</p>
          </div>
          <div className="county-info-div div-language">
            <p>Language</p>
            <div>
              {languageParagraph(languages)}
            </div>
          </div>
          <div className="county-info-div div-currency">
            <p>Currencies</p>
            <div>
              {currencyParagraph(currencies)}
            </div>
          </div>
          <div className="county-info-div div-map">
            <p>Map Location</p>
            <a href={country.countryDetails.mapLocation}>Link to Google Maps</a>
          </div>
        </section>
      </section>
      )}
    </>

  );
};

export default DetailsCountry;
