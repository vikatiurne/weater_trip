import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import styles from './SearchTrip.module.css';

const SearchTrip = ({ onchange }) => {
  const [searchTrip, setSearchTrip] = useState('');

  const searchTripHandler = (e) => {
    setSearchTrip(e.target.value);
    onchange(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <IoSearch />
      <input
        className={styles.search}
        type="search"
        placeholder="Search your trip"
        value={searchTrip}
        onChange={searchTripHandler}
      />
    </div>
  );
};

export default SearchTrip;
