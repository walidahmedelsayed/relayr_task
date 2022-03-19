const faker = require("faker");

const MeasurementsCategory = {
  Shift: {
    name: "shift",
    max: 50,
    min: -50,
    type: "number",
    unit: "mm",
  },
  Signal: {
    name: "signal",
    max: 100,
    min: 0,
    type: "number",
    unit: "%",
  },
  Speed: {
    name: "speed",
    max: 10,
    min: -10,
    type: "number",
    unit: "m/s",
  },
  Duration: {
    name: "duration",
    max: 3600,
    min: 0,
    type: "s",
    unit: "",
  },
  Open: {
    name: "open",
    max: 1,
    min: 0,
    type: "boolean",
    unit: "",
  },
};

const fakeMeasurementModelRange = (category) => {
  const difference = Math.abs(category.max - category.min);

  return {
    min: faker.datatype.number({
      min: category.min,
      max: Math.floor(difference / 2),
    }),
    max: faker.datatype.number({
      min: Math.ceil(difference / 2),
      max: category.max,
    }),
  };
};

const fakeMeasurementCategory = () =>
  MeasurementsCategory[
    faker.random.arrayElement(Object.keys(MeasurementsCategory))
  ];

const fakeMeasurementModel = (category = fakeMeasurementCategory()) => {
  const { min, max } = fakeMeasurementModelRange(category);

  return {
    name: category.name,
    type: category.type,
    unit: category.unit,
    min,
    max,
  };
};

module.exports = {
  MeasurementsCategory,
  fakeMeasurementModel,
};
