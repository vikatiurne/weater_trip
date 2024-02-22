import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import DateServices from './utils/DateService';

import createCollectionsInIndexDB, { idb } from './components/indexedDB/idb';

import TripsList from './components/TripsList/TripsList';
import SearchTrip from './components/SearchTrip/SearchTrip';
import GoogleAuth from './components/GoogleAuth/GoogleAuth';
import WeatherTrip from './components/WeatherTrip/WeatherTrip';
import WeatherCity from './components/WeatherCity/WeatherCity';
import Timer from './components/Timer/Timer';

import styles from './App.module.css';

function App() {
  const [allTrips, setAllTrips] = useState([]);
  const [filteredAllTrips, setFilteredAllTrips] = useState([]);
  const [selectTrip, setSelectTrip] = useState({});
  const [activeCard, setActiveCard] = useState('');

  useEffect(() => {
    createCollectionsInIndexDB();
  }, []);

  useEffect(() => {
    getAllTrips();
  }, []);

  useEffect(() => {
    setFilteredAllTrips(allTrips);
  }, [allTrips]);

  const getAllTrips = () => {
    const dbPromise = idb.open('trip-task', 2);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const transaction = db.transaction('trip', 'readonly');
      const tripData = transaction.objectStore('trip');
      const trips = tripData.getAll();
      trips.onsuccess = (e) => {
        if (!e.target.result.length) {
          const trips = [
            {
              id: uuidv4(),
              cityName: 'London',
              startDate: DateServices.getCurrentDate(),
              endDate: DateServices.getMaxData(7),
              isActive: false,
            },
          ];
          setAllTrips(trips);
          setSelectTrip(trips[0]);
          setActiveCard(trips[0].id);
        } else {
          const trips = e.target.result;
          trips.sort((a, b) => a.startDate - b.startDate);
          setAllTrips(trips);
          setSelectTrip(trips[0]);
          setActiveCard(trips[0].id);
        }
      };
      trips.onerror = (err) => console.log(err);

      transaction.oncomplete = () => {
        db.close();
      };
    };
  };

  const saveTripHandler = (cityName, startDate, endDate) => {
    const dbPromise = idb.open('trip-task', 2);
    if (cityName && startDate && endDate) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const transaction = db.transaction('trip', 'readwrite');
        const tripData = transaction.objectStore('trip');
        const newTrip = tripData.put({
          id: uuidv4(),
          cityName,
          startDate: Date.parse(startDate),
          endDate: Date.parse(endDate),
          isActive: false,
        });
        newTrip.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
            getAllTrips();
          };
          console.log('Поїздка додана до бази даних');
        };
        newTrip.onerror = (err) => console.log(err);
      };
    }
  };

  const searchTripsHandler = (value) => {
    const filteredTrips = allTrips.filter((trip) =>
      trip.cityName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setFilteredAllTrips(filteredTrips);
  };

  const cardClickHandler = (trip) => {
    setSelectTrip(trip);
    setActiveCard(trip.id);
  };

  return (
    <div className={styles.app}>
      <div className={styles.tripsContainer}>
        <h1>Weather Forecast</h1>
        <SearchTrip onchange={searchTripsHandler} />
        <TripsList
          allTrips={filteredAllTrips}
          addClick={saveTripHandler}
          cardClick={cardClickHandler}
          active={activeCard}
        />

        <WeatherTrip tripData={selectTrip} />
      </div>
      <aside className={styles.weatherContainer}>
        <GoogleAuth />
        <WeatherCity selectTrip={selectTrip} />
        <Timer timestamp={selectTrip?.startDate} />
      </aside>
    </div>
  );
}

function Root() {
  return <App />;
}
export default Root;
