const faker = require("faker");
const dayjs = require("dayjs");
const alertMock = require("../alert/alertMock.js");
const { luckyBreak } = require("../utils.js");
const { fakeMeasurementSeries } = require("../device/deviceMock.helpers.js");
const randomBodyUpdate = (
  body,
  {
    activityChangeChance = 5,
    newAlertChance = 25,
    alertClearChance = 10,
    measurementChangeChance = 50,
  } = {}
) => {
  const timestamp = new Date().toISOString();
  const newBody = { ...body, timestamp };
  const lastDeviceIndex = newBody.data.length - 1;
  const getRandomDeviceIndex = () =>
    faker.datatype.number({
      min: 0,
      max: lastDeviceIndex,
    });

  // maybe toggle random device activity
  if (luckyBreak(activityChangeChance)) {
    const randomDeviceIndex = getRandomDeviceIndex();
    const devices = newBody.data;
    const device = devices[randomDeviceIndex];

    devices[randomDeviceIndex] = {
      ...device,
      updatedAt: timestamp,
      active: !device.active,
    };
  }

  // maybe push new alert to random device
  if (luckyBreak(newAlertChance)) {
    const randomDeviceIndex = getRandomDeviceIndex();
    const devices = newBody.data;
    const device = devices[randomDeviceIndex];

    devices[randomDeviceIndex] = {
      ...device,
      updatedAt: timestamp,
      alerts: [...device.alerts, alertMock({ state: "set" })],
    };
  }

  // maybe clear random alert in random device, if device got at least one alert set
  if (luckyBreak(alertClearChance)) {
    const randomDeviceIndex = getRandomDeviceIndex();
    const devices = newBody.data;
    const device = devices[randomDeviceIndex];

    devices[randomDeviceIndex] = {
      ...device,
      updatedAt: timestamp,
    };

    const deviceAlerts = device.alerts;
    const deviceSetAlerts = deviceAlerts
      .map((a, index) => (a.state === "set" ? index : false))
      .filter(Number.isInteger);
    const randomSetAlertIndex = faker.random.arrayElement(deviceSetAlerts);

    if (Number.isInteger(randomSetAlertIndex)) {
      const alert = deviceAlerts[randomSetAlertIndex];

      deviceAlerts[randomSetAlertIndex] = { ...alert, state: "cleared" };
    }
  }

  // maybe push new measurements to random device
  if (luckyBreak(measurementChangeChance)) {
    const randomDeviceIndex = getRandomDeviceIndex();
    const devices = newBody.data;
    const device = devices[randomDeviceIndex];

    devices[randomDeviceIndex] = {
      ...device,
      updatedAt: timestamp,
    };

    const deviceMeasurements = device.measurements;
    const deviceMeasurementModels = device.measurementModels;
    const randomMeasurementGroupIndex = faker.datatype.number({
      min: 0,
      max: deviceMeasurements.length - 1,
    });
    const measurementGroup = deviceMeasurements[randomMeasurementGroupIndex];
    const [, lastMeasurementInGroupTime] =
      measurementGroup[measurementGroup.length - 1];
    const measurementGroupModel =
      deviceMeasurementModels[randomMeasurementGroupIndex];

    deviceMeasurements[randomMeasurementGroupIndex] = [
      ...measurementGroup,
      ...fakeMeasurementSeries({
        model: measurementGroupModel,
        minDate: new Date(lastMeasurementInGroupTime),
        maxDate: new Date(device.updatedAt),
      }),
    ];
  }

  return newBody;
};

const serviceOperations = (context) => {
  return {
    getBody: () => context.responseBodyEmitter$.value,
    setBody: (newBody) => context.responseBodyEmitter$.next(newBody),
    getDevice: (deviceId) =>
      context.responseBodyEmitter$.value.data.find(
        (d) => d.deviceId === deviceId
      ),
    setDevice: (deviceId, newDevice) => {
      const deviceIndex = context.responseBodyEmitter$.value.data.findIndex(
        (d) => d.deviceId === deviceId
      );

      if (!~deviceIndex) {
        return false;
      }

      const newBody = { ...context.responseBodyEmitter$.value };

      newBody.data[deviceIndex] = newDevice;
      context.responseBodyEmitter$.next(newBody);

      return true;
    },
    liveMode: (live = true) => {
      if (context.liveSubscription && live) {
        return context.liveSource$;
      }

      if (context.liveSubscription && !live) {
        context.liveSubscription = context.liveSubscription.unsubscribe();
        return;
      }

      context.liveSubscription = context.liveSource$.subscribe();

      // in case somone would like to subscribe to liveSource$
      return context.liveSource$;
    },
  };
};

module.exports = {
  randomBodyUpdate,
  serviceOperations,
};
