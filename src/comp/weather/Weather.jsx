import './weather.css';

import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { format } from 'date-fns';

import { WeatherStateContext } from 'context/Weather';
import Sun from 'comp/icons/Sun';
import Cloud from 'comp/icons/Cloud';
import Wind from 'comp/icons/Wind';
import SkyBackground from 'comp/weather/SkyBackground';

export default function Weather() {
  const { forecast, sunTimes } = useContext(WeatherStateContext);
  const [context, setContext] = useState(null);
  
  const [sun, setSun] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [wind, setWind] = useState(null);
  const [skyBackground, setSkyBackground] = useState(null);

  const [canvasElem, setCanvasElem] = useState(null);
  const startTime = useRef(null);

  const then = useRef(null);
  const elapsed = useRef(null);
  const now = useRef(null);
  const fpsInterval = useRef(null);

  const fps = 60;

  const setupCanvas = () => {
    const c = document.getElementById("weatherCanvas");
    const ctx = c.getContext("2d");
    setCanvasElem(c);
    setContext(ctx);
  }

  const draw = (time) => {
    now.current = Date.now();
    elapsed.current = now.current - then.current;

    if (!startTime.current) {
      startTime.current = time;
    }

    // console.log('drawing outside', elapsed.current > fpsInterval.current)
    // if ((elapsed.current > fpsInterval.current) && context && canvasElem && forecast) {
    if (context && canvasElem && forecast) {

      then.current = now.current - (elapsed.current % fpsInterval.current);
        const {
        cloudiness,
      } = forecast.location;


      context.clearRect(0, 0, canvasElem.width, canvasElem.height);

      if (sun) {
        sun.draw(time, startTime.current);
      }

      if (wind) {
        wind.draw(time, startTime.current);
      }

      if (cloud && parseFloat(cloudiness.percent) > 1) {
        if (cloud) {
          cloud.draw(time, startTime.current);
        }
      }

    }
    requestAnimationFrame(draw);
  };

  useEffect(() => {
    setupCanvas();

    fpsInterval.current = 1000 / fps;
    then.current = Date.now();

    requestAnimationFrame(draw);
  }, [context, canvasElem, sun, cloud, forecast]);

  useEffect(() => {
    if (sunTimes) {
      setSkyBackground(new SkyBackground({ sunTimes}));
    }
  }, [sunTimes]);

  useEffect(() => {
    if (skyBackground) {
      const currentSkyColor = skyBackground.getSkyColor();
      console.log('currentSkyColor', currentSkyColor)
      let root = document.documentElement;
      root.style.setProperty('--sky-color', currentSkyColor);
      // canvasElem.style.backgroundColor = currentSkyColor;
    }
    // skyBackground.getC
  }, [skyBackground]);

  useEffect(() => {
    if (context && forecast) {
      const defaultAttributes = {
        context, 
        width: canvasElem.width, 
        height: canvasElem.height 
      };

      setSun(new Sun(defaultAttributes));
      setCloud(new Cloud(defaultAttributes));
      setWind(new Wind({ ...defaultAttributes, windDirection: parseFloat(forecast.location.windDirection.deg) }));
    }
  }, [context, forecast]);

  if (!forecast) { 
    return <canvas id="weatherCanvas" width="400" height="400" style={{border: '1px solid #000000' }} />;
  }

  const {
    location: {
      cloudiness,
      fog,
      temperature,
      windDirection,
      windGust,
      windSpeed
    },
    from,
  } = forecast;

  return (
    <div className="weather">
    <canvas id="weatherCanvas" width="400" height="400" style={{border: '1px solid #000000' }} />

      {forecast && (
        <>
          <div>Time: {format(new Date(from), 'HH:mm')} </div>
          <div>Cloudiness: {cloudiness.percent}</div>
          <div>Fog: {fog.percent}</div>
          <div>Temperature: {Math.round(parseFloat(temperature.value))}</div>
          <div>WindDirection: {windDirection.name} {windDirection.deg}</div>
          <div>WindGust: {windGust.mps}</div>
          <div>WindSpeed: {windSpeed.mps}</div>
        </>
      )}
    </div>
  )
};
