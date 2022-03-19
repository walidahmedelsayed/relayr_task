<img src="./relayr_logo.png" alt="relayr-logo" width="300" />

# relayr Frontend Challenge

Welcome to the relayr Frontend Challenge. This coding task represents a slice of the work that we do here at relayr. It's designed to see **how you think, design and code** a simple application based on real-world requirements.

## Expectations

There's no time limit here, though we'd like to receive your solution **within a week if possible**. We expect a basic, yet elegant and user-friendly solution which can be done in couple hours. Hover you're welcome to work on it longer if you'd like but **please respect your time**.

In short, a simple, straightforward, functional interface is just fine.

---

**⚠️ NOTE:** while sending back the challenge please strip out `node_modules` to reduce archive file size.

---

## Challenge

Our customer is impressed with the data provided by our cloud solution and would like to see a proof of concept of a UI which meets the **acceptance criteria**:

- list of the devices can be toggled between table and card view
  - each of the views can be searched by device name
  - device activity status can be toggled in both views
    - display success and failure notification while toggling the activity
- each device has its own dedicated detailed view with:
  - additional information stored in the device object
  - charts presenting device measurements
  - alerts with statuses and severity
- after toggling the device status in the UI, a status change notification is sent from the server to the external MQTT broker
  - broker address (with username/password if needed) is passed to the server using the environmental variable
  - for the exercise, it can be either a local Mosquitto instance or an external service like https://test.mosquitto.org
  - if the broker address is provided, notifications are published to a dedicated topic as JSON
  - if the broker address is not provided, the server works without sending any notifications
  - connection errors are properly handled, the client can reconnect automatically when a connection was broken
- solution is unit tested (MQTT tests are optional)

In addition to the above product manager suggested some ideas of extra improvements which were marked as out of scope by the product owner. Those features are **only nice to have** and it's up to the engineers if they'd like to implement those:

- use TypeScript
- allow advance filtering by properties of the device
- visualize devices on a map
- searching functionality is persistent between page reloads
- navigation between views is done with breadcrumbs
- solution is dockerized
  - Dockerfile is created for both parts - UI, and the server
  - there's a docker-compose file that runs UI, server, and a Mosquitto broker
  - proper ports are exposed to the host

## Technical details

In this section you'll find all technical information needed to accomplish the task, so please read those carefully.

### Project setup

Project is divided into two workspaces, client and server, which are orchestrated from the top-level directory. Thus, all of the NPM commands should be run from the **project root directory**.

Frontend related work should be done in the `client` directory and the Backend in the `server`. Both folders are at your full disposal, however you should not modify the server part if it's not **explicitly stated** in the challenge.

---

**⚠️ NOTE:** this project requires at least **Node v16.13** and **NPM v8.1** due to use of some modern features.

---

After installing the project dependencies with `npm install`, you can run:

#### `npm start`

Runs the whole application, both server and client, in the development mode.\
Your browser window should open automatically, but you can always manually visit [http://localhost:8080](http://localhost:8080).

API server listens on `http://localhost:8888`, by visiting [http://localhost:8888/api/devices](http://localhost:8888/api/devices) you should see the default devices GET response.

Hot reloading is enabled so if you make edits to your code the page will refresh, and you will also see any lint errors in the console.

#### `npm install client-example-package -w client`

Installs package as a client workspace dependency

#### `npm install server-example-package -w server`

Installs package as a server workspace dependency
#### `npm run start:client`

Runs the client application only.

#### `npm run start:server`

Runs the server application only.

#### `npm run test:client`

Runs the client tests only.

#### `npm run test:server`

Runs the server tests only.

### Backend API

List of endpoints provided by the sever. Click on the respective endpoint to reveal details.

<details>
<summary><b>[GET] api/devices</b></summary><br/>

**URL:**
http://localhost:8888/api/devices

**Description:**
Returns 200 response with a JSON object containing data, total, and timestamp fields. Where data is an array of devices.

**Hint:**
Device `measurementModels` (array of objects) models the `measurements` (array of arrays containing tuples). For example `measurementModels[0]` object defines the name, type and min/max value of the measurement stored in `measurements[0][tuple1, tuple2, ...]` where tuple is `[value, timestamp]`.

**Example response:**

```json
{
  "data": [
    {
      "deviceId": "40552302-6ea2-476d-9cad-c3ab142a2ef5",
      "createdAt": "2021-08-19T20:02:09.986Z",
      "updatedAt": "2021-09-16T16:35:51.612Z",
      "deviceName": "electric_vehicle",
      "deviceModel": "acme_em_v3.0.0",
      "location": {
        "lat": "-45.0274",
        "lon": "-96.0561"
      },
      "measurementModels": [
        {
          "name": "speed",
          "type": "number",
          "unit": "m/s",
          "min": -9,
          "max": 10
        },
        {
          "name": "shift",
          "type": "number",
          "unit": "mm",
          "min": -3,
          "max": 50
        }
      ],
      "measurements": [
        [
          [-4, "2021-08-23T06:22:55.689Z"],
          [-4, "2021-09-03T00:54:01.269Z"]
        ],
        [[13, "2021-08-23T09:52:04.879Z"]]
      ],
      "active": false,
      "zipCode": "88138",
      "metadata": {
        "application": "transmitter",
        "capacitor": "firewall",
        "protocol": "panel"
      },
      "alerts": [
        {
          "name": "main_unit_overloaded",
          "severity": 1,
          "state": "cleared",
          "timestamp": "2021-09-06T23:05:28.766Z"
        },
        {
          "name": "main_unit_overloaded",
          "severity": 0,
          "state": "cleared",
          "timestamp": "2021-08-24T01:30:43.786Z"
        }
      ]
    }
  ],
  "total": 1,
  "timestamp": "2021-11-09T22:05:07.453Z"
}
```

</details>

<details>
<summary><b>[GET] api/devices/{deviceId}</b></summary><br/>

**URL:**
http://localhost:8888/api/devices/{deviceId}

**Description:**
Returns 200 response with a JSON object containing device data.

**Example response:**

```json
{
  "deviceId": "40552302-6ea2-476d-9cad-c3ab142a2ef5",
  "createdAt": "2021-08-19T20:02:09.986Z",
  "updatedAt": "2021-09-16T16:35:51.612Z",
  "deviceName": "electric_vehicle",
  "deviceModel": "acme_em_v3.0.0",
  "location": {
    "lat": "-45.0274",
    "lon": "-96.0561"
  },
  "measurementModels": [
    {
      "name": "speed",
      "type": "number",
      "unit": "m/s",
      "min": -9,
      "max": 10
    },
    {
      "name": "shift",
      "type": "number",
      "unit": "mm",
      "min": -3,
      "max": 50
    }
  ],
  "measurements": [
    [
      [-4, "2021-08-23T06:22:55.689Z"],
      [-4, "2021-09-03T00:54:01.269Z"]
    ],
    [[13, "2021-08-23T09:52:04.879Z"]]
  ],
  "active": false,
  "zipCode": "88138",
  "metadata": {
    "application": "transmitter",
    "capacitor": "firewall",
    "protocol": "panel"
  },
  "alerts": [
    {
      "name": "main_unit_overloaded",
      "severity": 1,
      "state": "cleared",
      "timestamp": "2021-09-06T23:05:28.766Z"
    },
    {
      "name": "main_unit_overloaded",
      "severity": 0,
      "state": "cleared",
      "timestamp": "2021-08-24T01:30:43.786Z"
    }
  ]
}
```

</details>

<details>
<summary><b>[PATCH] api/devices/{deviceId}</b></summary><br/>

**URL:**
http://localhost:8888/api/devices/{deviceId}

**Description:**
Accepts body JSON object with the fields that should be updated. For successful patch operation, it returns back 204 response otherwise it sends 418 error.

**Hint:**
This endpoint has no protection against malicious operations. For example sending `{ "alerts": [] }` body will substitute the alerts with an empty array.

**Example request:**

```json
{
  "active": true
}
```

</details>


### Library suggestions

A list of libraries which might be considered helpful to solve the challenge.

- material-ui
- react-query
- react-testing-library
- highcharts
- mapbox
- redux
- jest
