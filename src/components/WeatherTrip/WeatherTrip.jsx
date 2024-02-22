import axios from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DateServices from '../../utils/DateService';

import styles from './WeatherTrip.module.css';

const WEATHER_TRIP_DEFAULT = {
  days: [
    { datetime: '2024-02-22', icon: 'rain', tempmax: 95, tempmin: 78 },
    { datetime: '2024-02-22', icon: 'snow', tempmax: 45, tempmin: 35 },
    { datetime: '2024-02-22', icon: 'showers-day', tempmax: 45, tempmin: 35 },
    { datetime: '2024-02-22', icon: 'thunder', tempmax: 45, tempmin: 35 },
    { datetime: '2024-02-22', icon: 'sleet', tempmax: 45, tempmin: 35 },
    { datetime: '2024-02-22', icon: 'showers-day', tempmax: 45, tempmin: 35 },
  ],
};

const WeatherTrip = ({ tripData }) => {
  const [weatherInfo, setWeatherInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const date1 = DateServices.convertDateFromMs(tripData?.startDate);
      const date2 = DateServices.convertDateFromMs(tripData?.endDate);
      const src = `${process.env.REACT_APP_URL}${tripData?.cityName}/${date1}/${date2}?key=${process.env.REACT_APP_API_KEY}`;
      await axios.get(src).then((res) => {
        setWeatherInfo(res.data);
      });
      // setWeatherInfo(WEATHER_TRIP_DEFAULT);
    }
    if (tripData?.cityName) fetchData();
  }, [tripData]);

  return (
    <>
      <p className={styles.titleWeather}>Week</p>
      {weatherInfo.length !== 0 && (
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
      )}
    </>
  );
};

export default WeatherTrip;
