import request from 'request-promise-native';

const yrUrl = 'https://api.met.no/weatherapi/locationforecast/1.9/.json';

export const getWeatherFromYr = async (lat, lon) => {
  const options = {
    uri: yrUrl,
    qs: {
      lat,
      lon,
    }
  }
  try {
    console.log('options', options)
    const yrWeatherResponse = JSON.parse(await request(options));
    console.log('yrWeatherResponse', yrWeatherResponse)
    return yrWeatherResponse.product.time;
  } catch (err) {
    console.error(err);
    return null;
  }
  // const parsed = await parseString(yrWeatherResponse);
  // const parsed = JSON.parse(convert.xml2json(yrWeatherResponse, { compact: true, spaces: 2 }));
  // console.log('parsed', parsed)
  // console.log('typeof parsed', typeof parsed)
  // return parsed;
};

