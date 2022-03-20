import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const DeviceDetails = ({ devices }) => {
  const { id } = useParams();
  const [device, setDevice] = useState();

  useEffect(() => {
    const deviceData = devices.find((d) => d.deviceId === id);
    setDevice(deviceData);
  }, [devices, id]);

  return <div>{device && device.deviceName}</div>;
};

const mapStateToProps = (state) => {
  return {
    devices: state.devices.devices,
  };
};

export default connect(mapStateToProps, null)(DeviceDetails);
