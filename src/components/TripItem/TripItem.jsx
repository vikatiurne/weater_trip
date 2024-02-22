import DateServices from '../../utils/DateService';

import styles from './TripItem.module.css';

const TripItem = ({ tripData }) => {
  return (
    <>
      <img
        className={styles.img}
        src={require(`../../assets/${tripData.cityName.toLocaleLowerCase()}.jpg`)}
        alt={tripData.cityName}
      />
      <div className={styles.tripInfo}>
        <p className={styles.title}>{tripData.cityName}</p>
        <p className={styles.tripPeriod}>
          {DateServices.convertDate(tripData.startDate)}-
          {DateServices.convertDate(tripData.endDate)}
        </p>
      </div>
    </>
  );
};

export default TripItem;
