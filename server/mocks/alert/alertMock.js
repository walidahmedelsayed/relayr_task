const faker = require("faker");
const { fakeAlertName } = require("./alertMock.helpers.js");
const { randomTimestampInRange } = require("../utils.js");

const alertMock = ({ minDate, maxDate, state } = {}) => {
  return {
    name: fakeAlertName(),
    severity: faker.datatype.number({ min: 0, max: 5 }),
    state: state || faker.datatype.boolean() ? "set" : "cleared",
    timestamp: randomTimestampInRange({ minDate, maxDate }),
  };
};

module.exports = alertMock;
