const { interval, BehaviorSubject } = require("rxjs");
const { withLatestFrom, share, tap } = require("rxjs/operators");
const deviceMock = require("../device/deviceMock.js");
const {
  serviceOperations,
  randomBodyUpdate,
} = require("./deviceServiceMock.helpers.js");

const mockDeviceService = ({
  deviceCount = 1000,
  liveUpdateInterval = 5000,
  randomBodyOptions,
} = {}) => {
  const responseBodyEmitter$ = new BehaviorSubject({
    data: Array.from({ length: deviceCount }).map(() => deviceMock()),
    total: deviceCount,
    timestamp: new Date().toISOString(),
  });

  const liveSource$ = interval(liveUpdateInterval).pipe(
    withLatestFrom(responseBodyEmitter$),
    // sideffect which pushes new data to responseBodyEmitter$
    tap(([_counter, body]) => {
      responseBodyEmitter$.next(randomBodyUpdate(body, randomBodyOptions));
    }),
    // just in case of need to share with multiple subscribers
    share()
  );

  const context = {
    liveSubscription: undefined,
    responseBodyEmitter$,
    liveSource$,
  };

  const { getBody, setBody, getDevice, setDevice, liveMode } =
    serviceOperations(context);

  return {
    getBody,
    setBody,
    getDevice,
    setDevice,
    liveMode,
  };
};

module.exports = mockDeviceService;
