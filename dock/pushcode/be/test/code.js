const crypto = require('crypto');
const code = crypto.randomInt(100000, 1000000);
console.log(`[code]: `, code);

const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const fromtime = '11:20';
const totime = '12:30';

const ft = dayjs(`2000-01-01 ${fromtime}`);
const tt = dayjs(`2000-01-01 ${totime}`);
const mins = tt.diff(ft);
const totalHours = parseInt(mins / 60);
const totalMins = dayjs().minute(mins).$m;

console.log(
  dayjs() < dayjs().add(1.5, 'day'),
  dayjs.duration(mins).minutes(),
  dayjs.duration(mins).hours(),
);
