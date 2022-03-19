const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");

dayjs.extend(isBetween);

const { luckyBreak, randomTimestampInRange } = require("../mocks/utils.js");

describe("luckyBreak function", () => {
  it("should be a function", () => {
    expect(luckyBreak).toBeInstanceOf(Function);
  });

  it("should return true for 100 chance", () => {
    const chance = 100;
    let retry = 10;

    while (retry) {
      expect(luckyBreak(chance)).toBe(true);
      retry -= 1;
    }
  });

  it("should return false for 0 chance", () => {
    const chance = 0;
    let retry = 10;

    while (retry) {
      expect(luckyBreak(chance)).toBe(false);
      retry -= 1;
    }
  });

  it("should return return true or false for 50 chance", () => {
    const chance = 50;
    let retry = 100;
    let results = [];

    while (retry) {
      results.push(luckyBreak(chance));
      retry -= 1;
    }

    expect(results).toContain(false);
    expect(results).toContain(true);
  });
});

describe("randomTimestampInRange function", () => {
  it("should be a function", () => {
    expect(randomTimestampInRange).toBeInstanceOf(Function);
  });

  it("should return string", () => {
    const alertTimestamp = randomTimestampInRange();

    expect(alertTimestamp).toEqual(expect.any(String));
    expect(dayjs(alertTimestamp).isValid()).toBe(true);
  });

  it("should return current timestamp", async () => {
    const deforeDate = dayjs();
    const alertTimestamp = randomTimestampInRange();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const afterDate = dayjs();
    const isBetween = dayjs(alertTimestamp).isBetween(
      deforeDate,
      afterDate,
      null,
      "[]"
    );

    expect(isBetween).toBe(true);
  });

  it("should return timestamp between dates", () => {
    const beforeDate = dayjs("2020-01-01");
    const afterDate = dayjs("2021-01-01");
    const alertTimestamp = randomTimestampInRange({
      minDate: beforeDate.toDate(),
      maxDate: afterDate.toDate(),
    });
    const isBetween = dayjs(alertTimestamp).isBetween(
      beforeDate,
      afterDate,
      null,
      "[]"
    );

    expect(isBetween).toBe(true);
  });

  it("should return timestamp between dates with only minDate specified", () => {
    const beforeDate = dayjs("2021-01-01");
    const alertTimestamp = randomTimestampInRange({
      minDate: beforeDate.toDate(),
    });
    const currentDate = dayjs();
    const isBetween = dayjs(alertTimestamp).isBetween(
      beforeDate,
      currentDate,
      null,
      "[]"
    );

    expect(isBetween).toBe(true);
  });

  it("should return timestamp between dates with only maxDate specified", () => {
    const futureDate = dayjs("2021-01-01");
    const alertTimestamp = randomTimestampInRange({
      maxDate: futureDate.toDate(),
    });

    expect(dayjs(alertTimestamp).isBefore(dayjs(futureDate))).toBe(true);
  });
});
