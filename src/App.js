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
  const [status, setStatus] = useState('idle');
  const [allTrips, setAllTrips] = useState([]);
  const [filteredAllTrips, setFilteredAllTrips] = useState([]);
  const [selectTrip, setSelectTrip] = useState({});
  const [activeCard, setActiveCard] = useState('');
  const [isAddClick, setIsAddClick] = useState(false);

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
      const transaction = db.transaction('tripData', 'readonly');
      const tripData = transaction.objectStore('tripData');
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
          setStatus('success');
          setAllTrips(trips);
          setSelectTrip(trips[0]);
          setActiveCard(trips[0].id);
        } else {
          const trips = e.target.result;
          trips.sort((a, b) => a.startDate - b.startDate);
          setStatus('success');
          setAllTrips(trips);
          setSelectTrip(trips[0]);
          setActiveCard(trips[0].id);
        }
      };
      trips.onerror = (err) => {
        setStatus('error');
        console.log(err);
      };

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
            setStatus('success');
          };
          console.log('Поїздка додана до бази даних');
        };
        newTrip.onerror = (err) => {
          setStatus('error');
          console.log(err);
        };
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

  const clickButtonAddHandler = (bool)=>{setIsAddClick(bool)}

  return status === 'success' ? (
    <div className={styles.app}>
      <div className={styles.tripsContainer}>
        <h1>Weather Forecast</h1>
        <SearchTrip onchange={searchTripsHandler} isAddClick={isAddClick}/>
        <TripsList
          allTrips={filteredAllTrips}
          addClick={saveTripHandler}
          cardClick={cardClickHandler}
          clickButtonAdd={clickButtonAddHandler}
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
  ) : status !== 'error' ? (
    <h4>Loading...</h4>
  ) : (
    <h4>Unexpected error</h4>
  );
}

function Root() {
  return <App />;
}
export default Root;
