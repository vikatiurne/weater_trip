import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';


import data from '../../data/data.json';
import DateServices from '../../utils/DateService';

import Modal from '../Modal/Modal';

import styles from './AddTrip.module.css';

const AddTrip = ({ onclick }) => {
  const [modalActive, setModalActive] = useState(false);
  const [cityName, setCityName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [touchedCityName, setTouchedCityName] = useState(false);
  const [touchedStartDate, setTouchedStartDate] = useState(false);
  const [touchedEndDate, setTouchedEndDate] = useState(false);

  const reset = () => {
    setTouchedCityName(false);
    setTouchedEndDate(false);
    setCityName('');
    setTouchedStartDate(false);
    setModalActive(false);
  };

  const clickHandler = () => reset();
  const cancelHandler = () => reset();
  const changeStartHandker = (e) => setStartDate(e.target.value);
  const changeEndHandker = (e) => setEndDate(e.target.value);
  const changeCityHandler = (e) => setCityName(e.target.value);

  const addTripHandler = () => {
    setModalActive(true);
    setStartDate('');
    setEndDate('');
  };

  const addHandler = () => {
     onclick(cityName, startDate, endDate);
     reset()
     setModalActive(false)
  };

  const valid = {
    cityName: cityName.length > 0,
    startDate: startDate.length > 0,
    endDate: endDate.length > 0,
  };
  const isValid = valid.cityName && valid.startDate && valid.endDate;

  const renderModalContent = (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <h2>Create trip</h2>
        <IoClose
          className={styles.iconClose}
          onClick={() => setModalActive(false)}
        />
      </div>
      <div className={styles.modalFields}>
        <div className={styles.field}>
          <label htmlFor="city">
            <span>* </span>City
          </label>

          <select
            name="city"
            value={cityName}
            className={`${
              !valid.cityName && touchedCityName ? styles.invalidSelect : null
            } ${styles.selectCity}`}
            onChange={changeCityHandler}
            onBlur={() => setTouchedCityName(true)}
          >
            <option disabled value="">
              Pleace select a city
            </option>
            {data.map((city) => (
              <option value={city.cityName} key={uuidv4()}>
                {city.cityName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="startDate">
            <span>* </span>Start date{' '}
          </label>
          <input
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => {
              e.target.type = 'text';
              setTouchedStartDate(true);
            }}
            className={`${
              !valid.startDate && touchedStartDate ? styles.invalidInput : null
            } ${styles.selectDate}`}
            min={DateServices.getCurrentDate()}
            max={DateServices.getMaxData(15)}
            type="text"
            name="startDate"
            placeholder="Select date"
            value={startDate}
            onChange={changeStartHandker}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="endDate">
            <span>* </span>End date
          </label>
          <input
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => {
              e.target.type = 'text';
              setTouchedEndDate(true);
            }}
            className={`${
              !valid.endDate && touchedEndDate ? styles.invalidInput : null
            } ${styles.selectDate}`}
            min={startDate}
            max={DateServices.getMaxData(15)}
            type="text"
            name="endDate"
            placeholder="Select date"
            value={endDate}
            onChange={changeEndHandker}
          />
        </div>
      </div>
      <div className={styles.modalBtns}>
        <button className={styles.cancel} onClick={cancelHandler}>
          Cancel
        </button>
        <button
          className={isValid ? styles.primary : styles.invalid}
          onClick={addHandler}
          disabled={!isValid}
        >
          Save
        </button>
      </div>
    </div>
  );

  return (
    <>
      {modalActive && (
        <Modal active={modalActive} setActive={clickHandler}>
          {renderModalContent}
        </Modal>
      )}
      <div className={styles.addCard} onClick={addTripHandler}>
        <p>+</p>
        <p>Add trip</p>
      </div>
    </>
  );
};

export default AddTrip;
