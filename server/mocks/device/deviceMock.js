const faker = require("faker");
const alertMock = require("../alert/alertMock.js");
const measurementMock = require("../measurement/measurementMock.js");
const { randomLengthArray } = require("../utils.js");
const {
  fakeMetadata,
  fakeDeviceModel,
  fakeDeviceName,
  fakeDeviceDates,
  sortMeasurements,
} = require("./deviceMock.helpers.js");
const {
  fakeMeasurementModel,
} = require("../measurement/measurementMock.helpers.js");

const deviceMock = () => {
  const { updatedAtDate, createdAtDate } = fakeDeviceDates();
  const measurementModels = randomLengthArray({ min: 1, max: 3 }).map(() =>
    fakeMeasurementModel()
  );

  return {
    deviceId: faker.datatype.uuid(),
    createdAt: createdAtDate.toISOString(),
    updatedAt: updatedAtDate.toISOString(),
    deviceName: fakeDeviceName(),
    deviceModel: fakeDeviceModel(),
    location: {
      lat: faker.address.latitude(),
      lon: faker.address.longitude(),
    },
    measurementModels,
    measurements: measurementModels.map((model) =>
      sortMeasurements(
        randomLengthArray({ min: 1, max: 10 }).map(() =>
          measurementMock({
            model,
            maxDate: updatedAtDate,
            minDate: createdAtDate,
          })
        )
      )
    ),
    active: faker.datatype.boolean(),
    zipCode: faker.address.zipCode(),
    metadata: fakeMetadata(),
    alerts: randomLengthArray({ min: 1, max: 10 }).map(() =>
      alertMock({ maxDate: updatedAtDate, minDate: createdAtDate })
    ),
  };
};

module.exports = deviceMock;
