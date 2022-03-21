import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Typography,
  Table,
  TableCell,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import MeasurementsChart from "../MeasurementsChart/MeasurementsChart";

const DeviceDetails = ({ devices }) => {
  const { id } = useParams();
  const [device, setDevice] = useState();

  useEffect(() => {
    const deviceData = devices.find((d) => d.deviceId === id);
    setDevice(deviceData);
  }, [devices, id]);

  console.log(device);
  return (
    <div>
      {device && (
        <Container>
          <Typography variant="h3" component="div">
            Device details
          </Typography>
          <Typography>Name: {device.deviceName}</Typography>
          <Typography>Model: {device.deviceModel}</Typography>
          <Typography>
            Location: latitude {device.location?.lat} | longitude{" "}
            {device.location?.lon}
          </Typography>
          <Typography>
            Status: {device.active ? "Active" : "Inactive"}
          </Typography>
          <Typography>Zipcode: {device.zipCode}</Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="alert table">
              <TableHead>
                <TableRow>
                  <TableCell component="th">Alert name</TableCell>
                  <TableCell align="right">Alert severity</TableCell>
                  <TableCell align="right">Alert state</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {device.alerts.map((al) => (
                  <TableRow
                    key={al.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{al?.name}</TableCell>
                    <TableCell align="right">{al?.severity}</TableCell>
                    <TableCell align="right">{al?.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Measurement charts:
          </Typography>
          <MeasurementsChart device={device} />
        </Container>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    devices: state.devices.devices,
  };
};

export default connect(mapStateToProps, null)(DeviceDetails);
