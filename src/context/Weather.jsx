import React, { useEffect, useReducer, useContext } from 'react';
import isBefore from 'date-fns/isBefore';
import SunCalc from 'suncalc';

import { GeolocationStateContext } from './Geolocation';

import { getWeather } from 'api/weather';

const initialState = { forecasts: [], forecastIndex: 0, forecast: null, sunTimes: null };

export const WeatherStateContext = React.createContext()
export const WeatherDispatchContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.value };
    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const GeolocationState = useContext(GeolocationStateContext);

  const { forecasts } = state;

  const currentTimeWithinDates = (currentDate, from, to) => {
    const toDate = new Date(to);
    const beforeToDate = isBefore(currentDate, toDate);
    console.log('beforeToDate', beforeToDate, currentDate, toDate)
    return beforeToDate;
  };

  const getForecast = () => {
    const { forecastIndex } = state;
    const currentDate = new Date();

    for (let i = forecastIndex; i < forecasts.length; i++) {
      const forecastToCheck = forecasts[i];
      const { from, to } = forecastToCheck;

      if (currentTimeWithinDates(currentDate, from, to)) {
        dispatch({ 
          type: 'update', 
          value: { 
            forecast: forecastToCheck, 
            forecastIndex: i 
          } 
        });
        return;
      }
    }
  };

  useEffect(() => {
    getForecast();
  }, [forecasts])
  console.log('state', state);


  const fetchWeather = async ({ lat, lon }) => {
    const weathers = await getWeather(lat, lon);
    dispatch({ type: 'update', value: { forecasts: weathers.yrWeather }});
  }

  const fetchSun = ({ lat, lon }) => {
    var times = SunCalc.getTimes(new Date(), lat, lon);
    dispatch({ type: 'update', value: { sunTimes: times }});
  }

  useEffect(() => {
    if (GeolocationState) {
      const { lat, lon } = GeolocationState;
      if (!lat || !lon) {
        return;
      }
  
      fetchWeather(GeolocationState);
      fetchSun(GeolocationState);
    }
  }, [GeolocationState]);

  return (
    <WeatherStateContext.Provider value={state}>
      <WeatherDispatchContext.Provider value={dispatch}>
        {children}
      </WeatherDispatchContext.Provider>
    </WeatherStateContext.Provider>
  );
}
