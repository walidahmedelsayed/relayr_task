const Koa = require("koa");
const koaRouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const deviceServiceMock = require("./mocks/deviceService/deviceServiceMock.js");
const { luckyBreak } = require("./mocks/utils.js");
const { publishNotification } = require("./publisher");

const SERVER_PORT = 8888;

const app = new Koa();
const router = koaRouter();
const deviceService = deviceServiceMock();

deviceService.liveMode(true);

router.get("/api/devices", async (ctx, next) => {
  ctx.body = deviceService.getBody();

  return next();
});

router.get("/api/devices/:id", async (ctx, next) => {
  const device = deviceService.getDevice(ctx.params.id);

  if (!device) {
    ctx.throw(404);
  } else {
    ctx.body = device;
  }

  return next();
});

router.patch("/api/devices/:id", async (ctx, next) => {
  const deviceId = ctx.params.id;
  const device = deviceService.getDevice(deviceId);

  if (!device) {
    ctx.throw(404);
    // with 20% chance throw 418
  } else if (luckyBreak(20)) {
    ctx.throw(418);
  } else {
    deviceService.setDevice(deviceId, { ...device, ...ctx.request.body });
    const msg = {
      deviceId,
      updatedValues: { ...ctx.request.body },
      message: "Device status toggled successfully",
    };
    publishNotification(Buffer.from(JSON.stringify(msg)));
    ctx.status = 204;
  }

  return next();
});

app.use(cors()).use(bodyParser()).use(router.routes()).listen(SERVER_PORT);

console.log(`🌏 [API server] listening on http://localhost:${SERVER_PORT}`);
