import { getWeatherFromYr } from './yr';
 
export const getWeather = async (lat, lon) => {
  console.log('---> getting weather from yr')
  const yrWeather = await getWeatherFromYr(lat, lon);

  return {
    yrWeather,
  }
};
