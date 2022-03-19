const deviceMock = require("./deviceMock.js");
const { fakeMeasurementSeries } = require("./deviceMock.helpers.js");

describe("Mock functionality", () => {
  it("should be a function", () => {
    expect(deviceMock).toBeInstanceOf(Function);
  });

  it("should return an device object", () => {
    const device = deviceMock();

    expect(device).toEqual(
      expect.objectContaining({
        deviceId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deviceName: expect.any(String),
        deviceModel: expect.any(String),
        location: expect.objectContaining({
          lat: expect.any(String),
          lon: expect.any(String),
        }),
        measurements: expect.arrayContaining([
          expect.arrayContaining([
            expect.arrayContaining([expect.any(Number), expect.any(String)]),
          ]),
        ]),
        measurementModels: expect.arrayContaining([expect.any(Object)]),
        active: expect.any(Boolean),
        zipCode: expect.any(String),
        metadata: expect.any(Object),
        alerts: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            severity: expect.any(Number),
            state: expect.any(String),
            timestamp: expect.any(String),
          }),
        ]),
      })
    );
  });

  it("should generate different device on each call", () => {
    const device1 = deviceMock();
    const device2 = deviceMock();

    expect(device1).not.toEqual(device2);
  });

  it("helper should generate series of measurements", () => {
    const series = fakeMeasurementSeries();
    expect(series).toEqual(expect.any(Array));
  });
});
