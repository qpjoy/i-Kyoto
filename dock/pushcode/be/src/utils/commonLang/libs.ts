import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const formatTimer = (timer: any) => {
  const duration = dayjs.duration(timer, 'days');
  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  console.log(
    `[days, hours, minutes,]: `,
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    timer,
  );
  return dayjs()
    .add(years, 'year')
    .add(months, 'month')
    .add(days, 'day')
    .add(hours, 'hour')
    .add(minutes, 'minute')
    .add(seconds, 'second')
    .format('YYYY-MM-DD HH:mm:ss');
};
