const deviceServiceMock = require("./deviceServiceMock.js");

describe("Mock functionality", () => {
  it("should be a function", () => {
    expect(deviceServiceMock).toBeInstanceOf(Function);
  });

  it("should return an service object", () => {
    const service = deviceServiceMock();

    expect(service).toEqual(
      expect.objectContaining({
        getBody: expect.any(Function),
        setBody: expect.any(Function),
        getDevice: expect.any(Function),
        setDevice: expect.any(Function),
        liveMode: expect.any(Function),
      })
    );
  });

  it("should generate different service on each call", () => {
    const service1 = deviceServiceMock();
    const service2 = deviceServiceMock();

    expect(service1).not.toEqual(service2);
  });

  it("getBody() should return proper body", () => {
    const service = deviceServiceMock();
    const body = service.getBody();

    expect(body).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        timestamp: expect.any(String),
        total: expect.any(Number),
      })
    );
  });

  it("setBody() should set proper body", () => {
    const service = deviceServiceMock();
    const body1 = service.getBody();

    expect(body1).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        timestamp: expect.any(String),
        total: expect.any(Number),
      })
    );

    service.setBody({});

    const body2 = service.getBody();

    expect(body2).toEqual({});
  });

  it("should return specified amount of devices", () => {
    const service = deviceServiceMock({ deviceCount: 10 });
    const { data } = service.getBody();

    expect(data.length).toBe(10);
  });

  it("getDevice() should get proper device", () => {
    const service = deviceServiceMock();
    const body = service.getBody();
    const testDevice = { deviceId: "t357", deviceName: "test device" };

    service.setBody({ ...body, data: [...body.data, testDevice] });

    const device = service.getDevice(testDevice.deviceId);

    expect(device).toEqual(testDevice);
  });

  it("setDevice() should set proper device", () => {
    const service = deviceServiceMock();
    const body = service.getBody();
    const testDevice = { deviceId: "t357", deviceName: "test device" };

    service.setBody({ ...body, data: [...body.data, testDevice] });
    service.setDevice(testDevice.deviceId, { ...testDevice, active: false });

    const device = service.getDevice(testDevice.deviceId);

    expect(device).toHaveProperty("active", false);
  });

  it("setDevice() should not set device for wrong id", () => {
    const service = deviceServiceMock();
    const fakeId = "wrong-id";

    expect(service.setDevice(fakeId, { active: false })).toBeFalsy();
    expect(service.getDevice(fakeId)).toBeFalsy();
  });
});

describe("Mock live mode", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return the same data in normal mode", () => {
    jest.useFakeTimers();

    const service = deviceServiceMock({
      deviceCount: 1,
      liveUpdateInterval: 1,
      randomBodyOptions: {
        activityChangeChance: 100,
        newAlertChance: 100,
        alertClearChance: 100,
        measurementChangeChance: 100,
      },
    });

    const body1 = service.getBody();

    jest.runOnlyPendingTimers();

    const body2 = service.getBody();

    expect(body1).toEqual(body2);
  });

  it("with 100 chance should toggle the device activity", () => {
    jest.useFakeTimers();

    const service = deviceServiceMock({
      deviceCount: 1,
      liveUpdateInterval: 1,
      randomBodyOptions: {
        activityChangeChance: 100,
        newAlertChance: 0,
        alertClearChance: 0,
        measurementChangeChance: 0,
      },
    });

    const { data: data1 } = service.getBody();
    const [device1] = data1;
    const { active: device1Active, ...device1restState } = device1;

    service.liveMode();
    jest.runOnlyPendingTimers();

    const { data: data2 } = service.getBody();
    const [device2] = data2;
    const { active: device2Active, ...device2restState } = device2;

    expect(device1Active).not.toEqual(device2Active);
    expect(device1restState).not.toEqual(device2restState);
    expect(device1restState).toEqual({
      ...device2restState,
      updatedAt: device1.updatedAt,
    });
  });

  it("with 100 chance should push alert", () => {
    jest.useFakeTimers();

    const service = deviceServiceMock({
      deviceCount: 1,
      liveUpdateInterval: 1,
      randomBodyOptions: {
        activityChangeChance: 0,
        newAlertChance: 100,
        alertClearChance: 0,
        measurementChangeChance: 0,
      },
    });

    const { data: data1 } = service.getBody();
    const [device1] = data1;
    const { alerts: device1Alerts, ...device1restState } = device1;

    service.liveMode();
    jest.runOnlyPendingTimers();

    const { data: data2 } = service.getBody();
    const [device2] = data2;
    const { alerts: device2Alerts, ...device2restState } = device2;

    expect(device1Alerts).not.toEqual(device2Alerts);
    expect(device1restState).not.toEqual(device2restState);
    expect(device1restState).toEqual({
      ...device2restState,
      updatedAt: device1.updatedAt,
    });
  });

  it("with 100 chance should clear alert", () => {
    jest.useFakeTimers();

    const service = deviceServiceMock({
      deviceCount: 1,
      liveUpdateInterval: 1,
      randomBodyOptions: {
        activityChangeChance: 0,
        newAlertChance: 0,
        alertClearChance: 100,
        measurementChangeChance: 0,
      },
    });

    const initialBody = { ...service.getBody() };
    const initialDevices = initialBody.data;
    const [initialDevice] = initialDevices;

    initialDevices[0] = { ...initialDevice, alerts: [{ state: "set" }] };
    service.setBody(initialBody);

    const { data: data1 } = service.getBody();
    const [device1] = data1;
    const { alerts: device1Alerts, ...device1restState } = device1;
    const [device1Alert] = device1Alerts;

    expect(device1Alert).toEqual({ state: "set" });

    service.liveMode();
    jest.runOnlyPendingTimers();

    const { data: data2 } = service.getBody();
    const [device2] = data2;
    const { alerts: device2Alerts, ...device2restState } = device2;
    const [device2Alert] = device2Alerts;

    expect(device2Alert).toEqual({ state: "cleared" });
    expect(device1restState).not.toEqual(device2restState);
    expect(device1restState).toEqual({
      ...device2restState,
      updatedAt: device1.updatedAt,
    });
  });

  it("with 100 chance should not clear alert if there's nothing to clear", () => {
    jest.useFakeTimers();

    const service = deviceServiceMock({
      deviceCount: 1,
      liveUpdateInterval: 1,
      randomBodyOptions: {
        activityChangeChance: 0,
        newAlertChance: 0,
        alertClearChance: 100,
        measurementChangeChance: 0,
      },
    });

    const fakeAlert = { state: "cleared" };
    const initialBody = { ...service.getBody() };
    const initialDevices = initialBody.data;
    const [initialDevice] = initialDevices;

    initialDevices[0] = { ...initialDevice, alerts: [fakeAlert] };

    service.setBody(initialBody);
    service.liveMode();
    jest.runOnlyPendingTimers();

    const {
      data: [device],
    } = service.getBody();
    const {
      alerts: [alert],
    } = device;

    expect(alert).toEqual(fakeAlert);
  });

  it("with 100 chance should add new measurements", () => {
    jest.useFakeTimers();

    const service = deviceServiceMock({
      deviceCount: 1,
      liveUpdateInterval: 1,
      randomBodyOptions: {
        activityChangeChance: 0,
        newAlertChance: 0,
        alertClearChance: 0,
        measurementChangeChance: 100,
      },
    });

    const { data: data1 } = service.getBody();
    const [device1] = data1;
    let { measurements: device1Measurements, ...device1restState } = device1
   
    // spread into new array to preseve initial state
    device1Measurements = [ ...device1Measurements]

    service.liveMode();
    jest.runOnlyPendingTimers();

    const [device2] = data1;
    const { measurements: device2Measurements, ...device2restState } = device2

    expect(device1Measurements).not.toEqual(device2Measurements);
    expect(device1restState).not.toEqual(device2restState);
    expect(device1restState).toEqual({...device2restState, updatedAt: device1.updatedAt});
  });

  it("liveMode function should return proper values", async () => {
    jest.useFakeTimers(); // enable just to disable teardown warning when calling `afterEach`

    const service = deviceServiceMock();
    const observable = service.liveMode();

    expect(observable).toHaveProperty("subscribe");
    expect(service.liveMode()).toHaveProperty("subscribe");

    //stop live mode
    expect(service.liveMode(false)).toBeFalsy();
  });
});
