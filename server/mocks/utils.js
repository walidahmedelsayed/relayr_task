const faker = require("faker");

const TimeMs = (() => {
  const oneDayMs = 1000 * 60 * 60 * 24;
  const oneMonthMs = oneDayMs * 30;
  const oneYearMs = oneDayMs * 365;
  return {
    OneDay: oneDayMs,
    OneMonth: oneMonthMs,
    OneYear: oneYearMs,
  };
})();

const randomLengthArray = ({ min = 1, max = 10 } = {}) =>
  Array.from({
    length: faker.datatype.number({ min, max }),
  });

const luckyBreak = (chance) =>
  faker.datatype.number({ min: 1, max: 100 }) <= chance;

const randomTimestampInRange = ({ minDate, maxDate } = {}) => {
  const currentDate = new Date();

  if (!minDate && !maxDate) {
    return currentDate.toISOString();
  }

  const derivedMaxDate = maxDate || currentDate;
  const derivedMinDate =
    minDate ||
    new Date(+derivedMaxDate - faker.datatype.number(TimeMs.OneMonth));
  const timeDifference = Math.abs(+derivedMaxDate - +derivedMinDate);

  return new Date(
    +derivedMinDate + faker.datatype.number(timeDifference)
  ).toISOString();
};

module.exports = {
  randomLengthArray,
  randomTimestampInRange,
  luckyBreak,
  TimeMs,
};
