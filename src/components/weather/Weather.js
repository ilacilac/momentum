import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import WeatherContent from "./WeatherContent";
import "./weather.scss";
import "./weather-icons.css";
import "./weather-icons-wind.css";

const API_KEY = "64bb4412769a73988b668782663bd5f7";
const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const date = new Date();
const today = date.getDay();

export default function Weather() {
  const [weather, setWeather] = useState({
    current: {
      weather: [{}],
      temp: 0,
    },
    daily: [],
    loading: false,
  });
  const [city, setCity] = useState({});
  const weatherParent = useRef();
  const btnRef = useRef(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    function geoError() {
      console.log("위치 정보를 가져올 수 없습니다.");
    }
    async function geoSuccess(position) {
      const { coords } = position;
      const lat = coords.latitude;
      const lon = coords.longitude;
      try {
        const weatherData = await axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          )
          .then((res) => res.data)
          .catch((err) => console.log(`weatherGetError: ${err}`));
        const cityData = await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          )
          .then((res) => res.data)
          .catch((err) => console.log(`cityGetError: ${err}`));
        setWeather(weatherData);
        setCity(cityData);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleClickOutside = (e) => {
    if (btnRef.current && !btnRef.current.contains(e.target)) {
      btnRef.current.classList.remove("active");
    } else {
      btnRef.current.classList.add("active");
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      <button ref={btnRef} className="weather-btn">
        <div>
          <p
            className="btn-temp"
            title={weather.current.weather[0].description}
          >
            <i className={"btn-icon wi " + weather.current.weather[0].main}></i>
            {Math.round(weather.current.temp)}°
          </p>
          <p className="btn-city" title={city.name}>
            {city.name}
          </p>
        </div>
        <div className="weather-container" ref={weatherParent}>
          <div className="city-detail">
            <p className="city">
              {city.name}
              <span></span>
            </p>
            <p
              className="description"
              data-description={weather.current.weather[0].description}
            >
              {weather.current.weather[0].description}
            </p>
          </div>
          <div className="active-day">
            <i
              className={"wi " + weather.current.weather[0].main}
              data-icon={"wi " + weather.current.weather[0].main}
            ></i>
            <p data-temp={Math.round(weather.current.temp)}>
              {Math.round(weather.current.temp)}° <span></span>
            </p>
          </div>
          <ul>
            {weather.daily.map((day, i) => (
              <WeatherContent
                key={day.dt}
                weather={day.weather}
                temp={day.temp}
                week={
                  week[
                    today + i === 7
                      ? 0
                      : today + i === 8
                      ? 1
                      : today + i === 9
                      ? 2
                      : today + i === 10
                      ? 3
                      : today + i
                  ]
                }
                index={i}
              />
            ))}
          </ul>
        </div>
      </button>
    </>
  );
}
