const measurementMock = require("./measurementMock.js");
const { fakeMeasurementModel } = require("./measurementMock.helpers.js");

describe("Mock functionality", () => {
  it("should be a function", () => {
    expect(measurementMock).toBeInstanceOf(Function);
  });

  it("should return an measurement array", () => {
    const measurement = measurementMock();

    expect(measurement).toEqual(
      expect.arrayContaining([expect.any(Number), expect.any(String)])
    );
  });

  it("should return fake measurement model", () => {
    const model = fakeMeasurementModel();

    expect(model).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        type: expect.any(String),
        unit: expect.any(String),
        min: expect.any(Number),
        max: expect.any(Number),
      })
    );
  });

  it("measurement should use passed model", () => {
    const model = fakeMeasurementModel();
    const [value] = measurementMock({ model });
    const { min, max } = model;

    expect(value).toBeGreaterThanOrEqual(min);
    expect(value).toBeLessThanOrEqual(max);
  });
});
