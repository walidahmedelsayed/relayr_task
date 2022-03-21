require("dotenv").config();
const mqtt = require("mqtt");

const client = mqtt.connect(process.env.BROKER_ADDRESS, {
  // Try to reconnect every 2 seconds.
  reconnectPeriod: 2000,
});

client.on("connect", () =>
  console.log("Connected to the broker successfully.")
);

const publishNotification = (notification) => {
  if (client.connected) {
    client.publish(process.env.TOPIC, notification);
    console.log("Notification sent successfully.");
  }
};

// Subscribing on the topic for testing purpose
client.subscribe(process.env.TOPIC);

client.on("message", function (topic, message) {
  // Logging for testing purpose
  console.log(`Message Received '${message.toString()}'`);
});

module.exports = { publishNotification };
