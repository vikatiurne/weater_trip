var options = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

export default class DateServices {
  static getCurrentDate() {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  static getMaxData(period) {
    const date = new Date();
    const milisec = date.setDate(date.getDate() + period);
    const maxDate = new Date(milisec);
    return maxDate.toISOString().split('T')[0];
  }

  static convertDate(str) {
    const date = new Date(str);
    return date.toLocaleString('ru', options);
  }

  static convertDateFromMs(str) {
    const date = new Date(str);
    return date.toISOString().split('T')[0];
  }

  static getDayOfWeek(date) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let day;
    typeof date === 'string' ? (day = new Date(date)) : (day = date);
    const week = day.getDay();
    return days[week];
  }

  static getRemainingTime(timestamp) {
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
}
