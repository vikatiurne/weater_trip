import axios from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DateServices from '../../utils/DateService';

import styles from './WeatherTrip.module.css';


const WeatherTrip = ({ tripData }) => {
  const [status, setStatus] = useState('idle');
  const [errMessage, setErrMessage]=useState('')
  const [weatherInfo, setWeatherInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const date1 = DateServices.convertDateFromMs(tripData?.startDate);
        const date2 = DateServices.convertDateFromMs(tripData?.endDate);
        const src = `${process.env.REACT_APP_URL}${tripData?.cityName}/${date1}/${date2}?key=${process.env.REACT_APP_API_KEY}`;
        await axios.get(src).then((res) => {
          setWeatherInfo(res.data);
          setStatus('success');
        });
      } catch (error) {
        setErrMessage(error.response.data)
        setStatus('error');
      }
    }
    if (tripData?.cityName) fetchData();
  }, [tripData]);

  return (
    <>
      <p className={styles.titleWeather}>Week</p>
      {weatherInfo.length !== 0 && status === 'success' ? (
        <div className={styles.wheathrTripContainer}>
          {weatherInfo?.days.map((day) => (
            <section key={uuidv4()}>
              <p className={styles.dayOfWeek}>
                {DateServices.getDayOfWeek(day?.datetime)}
              </p>
              <div
                className={styles.weatherIcon}
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_IMG_URL}${day?.icon}.svg)`,
                }}
              ></div>
              <p className={styles.weatherTemp}>
                {Math.round(((day?.tempmax - 32) * 5) / 9)}&deg;/
                {Math.round(((day?.tempmin - 32) * 5) / 9)}&deg;
              </p>
            </section>
          ))}
        </div>
      ) : status !== 'error' ? (
        <h4>Loading...</h4>
      ) : (
        <h4 className={styles.errMessage}><span>Error:</span>{errMessage}</h4>
      )}
    </>
  );
};

export default WeatherTrip;
