export function getRemainingTime(timestamp) {
  const now = new Date().getTime();

  const distance = timestamp - now;

  const days = Math.floor(distance / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
  const seconds = Math.floor((distance % (60 * 1000)) / 1000);


  if (distance < 0) {
    return {
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00',
    };
  }
  return {
    seconds,
    minutes,
    hours,
    days,
  };
}
