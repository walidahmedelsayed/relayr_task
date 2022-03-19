const faker = require("faker");

const fakeAlertName = () =>
  faker.random.arrayElement([
    "faulty_sensor",
    "connectivity_issues",
    "main_unit_overloaded",
    "unit_jammed",
    "unit_stopped",
    "analytics_module_failure",
  ]);

module.exports = {
  fakeAlertName,
};
