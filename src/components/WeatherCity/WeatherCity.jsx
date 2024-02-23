import { useEffect, useState } from 'react';
import axios from 'axios';

import DateServices from '../../utils/DateService';

import styles from './WeatherCity.module.css';


const WeatherCity = ({ selectTrip }) => {
  const [status, setStatus] = useState('idle');
  const [errMessage, setErrMessage] = useState('');
  const [weatherInfo, setWeatherInfo] = useState({});
  const [dayOfWeek, setDayOfWeek] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const src = `${process.env.REACT_APP_URL}${selectTrip?.cityName}?key=${process.env.REACT_APP_API_KEY}`;
        await axios.get(src).then((res) => {
          setWeatherInfo(res.data);
          setStatus('success');
        });
      } catch (error) {
        setErrMessage(error.response.data);
        setStatus('error');
      }
    }
    if (selectTrip?.cityName) fetchData();
  }, [selectTrip]);

  useEffect(() => {
    setDayOfWeek(DateServices.getDayOfWeek(new Date()));
  }, []);

  return (
    <div className={styles.weatherInfo}>
      <p className={styles.dayOfWeek}>{dayOfWeek}</p>
      {status === 'success' ? (
        <>
          <div className={styles.weather}>
            <div
              className={styles.weatherIcon}
              style={{
                backgroundImage: `url(${process.env.REACT_APP_IMG_URL}${weatherInfo.currentConditions?.icon}.svg)`,
              }}
            ></div>
            <p className={styles.temp}>
              {Math.round(((weatherInfo.currentConditions?.temp - 32) * 5) / 9)}
              <span>&#8451;</span>
            </p>
          </div>
          <p className={styles.city}>{weatherInfo?.address}</p>
        </>
      ) : status !== 'error' ? (
        <p>Loading...</p>
      ) : (
        <p className={styles.errMessage}>
          <span>Error: </span> {errMessage}
        </p>
      )}
    </div>
  );
};

export default WeatherCity;
