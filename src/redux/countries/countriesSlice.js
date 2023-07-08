import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_COUNTRIES_URL = 'https://restcountries.com/v3.1/all';

export const getCountriesInfo = createAsyncThunk('countries/getCountriesInfo',
  async () => {
    try {
      const response = await axios.get(API_COUNTRIES_URL);
      return response.data;
    } catch (error) {
      return error.message;
    }
  });

const API_COUNTRY_DETAILS_URL = 'https://restcountries.com/v3.1/name/';

export const getCountryDetails = createAsyncThunk('countries/getCountryDetails',
  async (name) => {
    try {
      const response = await axios.get(API_COUNTRY_DETAILS_URL + name);
      const filteredCountryDetails = response.data.map((country) => ({
        name: country.name.common,
        flag: country.flags.png,
        official: country.name.official,
        area: country.area,
        capital: country.capital,
        currencies: country.currencies,
        demonyms: country.demonyms.eng.f,
        languages: country.languages,
        timezones: country.timezones[0],
        mapLocation: country.maps.googleMaps,
      }));
      const selectedCountry = filteredCountryDetails.find((country) => country.name === name);
      return selectedCountry;
    } catch (error) {
      return error.message;
    }
  });

const initialState = {
  countries: [],
  status: 'idle',
  error: null,
  region: 'Africa',
  detailsStatus: 'idle',
  countryDetails: [],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    changeRegion: (state, action) => ({ ...state, region: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesInfo.fulfilled, (state, action) => {
        const newCountriesArr = action.payload.map((country) => ({
          name: country.name.common,
          officialName: country.name.official,
          flag: country.flags.png,
          region: country.region,
          population: country.population,
        }));
        return { ...state, status: 'fulfilled', countries: newCountriesArr };
      })
      .addCase(getCountriesInfo.pending, (state) => ({ ...state, status: 'Loading' }))
      .addCase(getCountriesInfo.rejected, (state, action) => ({ ...state, status: 'rejected', error: action.error.message }))
      .addCase(getCountryDetails.pending, (state) => ({ ...state, detailsStatus: 'Loading' }))
      .addCase(getCountryDetails.fulfilled, (state, action) => ({ ...state, detailsStatus: 'fulfilled', countryDetails: action.payload }))
      .addCase(getCountryDetails.rejected, (state, action) => ({ ...state, detailsStatus: 'rejected', error: action.error.message }));
  },
});

export const { changeRegion } = countriesSlice.actions;
export default countriesSlice.reducer;
