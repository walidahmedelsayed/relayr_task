const faker = require("faker");
const { fakeMeasurementModel } = require("./measurementMock.helpers.js");
const { randomTimestampInRange } = require("../utils.js");

const measurementMock = ({
  model = fakeMeasurementModel(),
  minDate,
  maxDate,
} = {}) => {
  const value = faker.datatype.number({ min: model.min, max: model.max });
  const timestamp = randomTimestampInRange({ minDate, maxDate });

  return [value, timestamp];
};

module.exports = measurementMock;
