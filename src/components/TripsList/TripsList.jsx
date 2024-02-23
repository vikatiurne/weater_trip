import { v4 as uuidv4 } from 'uuid';

import TripItem from '../TripItem/TripItem';
import Carousel from '../Carousel/Carousel';
import AddTrip from '../AddTrip/AddTrip';

import styles from './TripsList.module.css';

const TripsList = ({ allTrips, addClick, cardClick, active,clickButtonAdd }) => {
  const clickCardHandler = (trip) => cardClick(trip);

  return (
    <div className={styles.cards}>
      <Carousel>
        {allTrips.map((trip) => (
          <div
            key={uuidv4()}
            className={`${active === trip.id && styles.activeCard} ${
              styles.tripContainer
            } `}
            onClick={() => clickCardHandler(trip)}
          >
            <TripItem tripData={trip} />
          </div>
        ))}
      </Carousel>
      <AddTrip onclick={addClick} clickButtonAdd={clickButtonAdd}/>
    </div>
  );
};

export default TripsList;
