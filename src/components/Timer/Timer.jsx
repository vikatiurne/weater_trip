import { useState, useEffect } from 'react';

import DateServices from '../../utils/DateService';

import styles from './Timer.module.css';

const defaultTimerValue = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
};

const Timer = ({ timestamp }) => {
  const [remainingTime, setRemainingTime] = useState(defaultTimerValue);

  useEffect(() => {
    if (timestamp - new Date().getTime() > 0) {
      const intervalId = setInterval(() => {
        updateRemainingTime(timestamp);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setRemainingTime(defaultTimerValue);
    }
  }, [timestamp]);

  function updateRemainingTime(countdown) {
    setRemainingTime(DateServices.getRemainingTime(countdown));
  }

  return (
    <div className={styles.timerContainer}>
      <div className={styles.numdays}>{remainingTime.days}</div>
      <div className={styles.numhours}>{remainingTime.hours}</div>
      <div className={styles.nummin}>{remainingTime.minutes}</div>
      <div className={styles.numsec}>{remainingTime.seconds}</div>
      <div className={styles.day}>days</div>
      <div className={styles.hours}>hours</div>
      <div className={styles.mins}>minuts</div>
      <div className={styles.sec}>seconds</div>
    </div>
  );
};

export default Timer;
