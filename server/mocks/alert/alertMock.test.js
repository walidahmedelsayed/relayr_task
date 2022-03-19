const alertMock = require("./alertMock.js");

describe("Mock functionality", () => {
  it("should be a function", () => {
    expect(alertMock).toBeInstanceOf(Function);
  });

  it("should return an alert object", () => {
    const alert = alertMock();

    expect(alert).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        severity: expect.any(Number),
        state: expect.any(String),
        timestamp: expect.any(String),
      })
    );
  });

  it("should generate different alert on each call", async () => {
    const alert1 = alertMock();

    await new Promise((resolve) => setTimeout(resolve, 1));

    const alert2 = alertMock();

    expect(alert1).not.toEqual(alert2);
  });
});
