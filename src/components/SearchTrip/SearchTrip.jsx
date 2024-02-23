import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import styles from './SearchTrip.module.css';

const SearchTrip = ({ onchange, isAddClick }) => {
  const [searchTrip, setSearchTrip] = useState('');

  useEffect(() => {
    if (!isAddClick) setSearchTrip('');
  }, [isAddClick]);

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
