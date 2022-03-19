const faker = require("faker");
const measurementMock = require("../measurement/measurementMock.js");
const { TimeMs, randomLengthArray } = require("../utils.js");
const {
  fakeMeasurementModel,
} = require("../measurement/measurementMock.helpers.js");

const fakeDeviceModel = () =>
  faker.random.arrayElement([
    "acme_em_v2.0.33",
    "acme_em_v1.1.33",
    "acme_em_v3.0.0",
  ]);

const fakeDeviceName = () =>
  faker.random.arrayElement([
    "electric_motor",
    "water_pump",
    "electric_owen",
    "coffee_machine",
    "electric_vehicle",
    "electric_scooter",
    "elevator",
  ]);

const fakeDeviceDates = () => {
  const createdAtDate = new Date(
    new Date() - faker.datatype.number(TimeMs.OneYear)
  );
  const updatedAtDate = new Date(
    +createdAtDate + faker.datatype.number(+new Date() - +createdAtDate)
  );

  return { createdAtDate, updatedAtDate };
};

const fakeMetadata = () =>
  randomLengthArray({ min: 1, max: 3 }).reduce(
    (acc) => ({ ...acc, [faker.hacker.noun()]: faker.hacker.noun() }),
    {}
  );

const sortMeasurements = (measurements) =>
  measurements.sort(([_, ta], [__, tb]) => Date.parse(ta) - Date.parse(tb));

const fakeMeasurementSeries = ({
  model = fakeMeasurementModel(),
  maxDate,
  minDate,
} = {}) => {
  const { min, max } = model;
  const difference = Math.abs(max - min);

  // new model with narrowed min and max value to simulate series
  const newModel = {
    ...model,
    min: faker.datatype.number({
      min: model.min,
      max: model.min + Math.floor(difference / 2),
    }),
    max: faker.datatype.number({
      min: model.max - Math.ceil(difference / 2),
      max: model.max,
    }),
  };

  return sortMeasurements(
    randomLengthArray({ min: 2, max: 15 }).map(() =>
      measurementMock({ model: newModel, maxDate, minDate })
    )
  );
};

module.exports = {
  fakeDeviceModel,
  fakeDeviceName,
  fakeDeviceDates,
  fakeMetadata,
  fakeMeasurementSeries,
  sortMeasurements,
};
