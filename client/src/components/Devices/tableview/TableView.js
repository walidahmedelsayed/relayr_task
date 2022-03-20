import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const TableView = ({ devices }) => {
  return (
    <TableContainer component={Paper}>
      <span data-testid="table__view__test__id" />
      <Table sx={{ minWidth: 650 }} aria-label="device table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Device name</TableCell>
            <TableCell align="right">Device model</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Zipcode</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => {
            return (
              <TableRow
                key={device.deviceId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {device.deviceName}
                </TableCell>
                <TableCell align="right">{device.deviceModel}</TableCell>
                <TableCell align="right">
                  {device.active ? "true" : "false"}
                </TableCell>
                <TableCell align="right">{device.zipCode}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => alert("")}>
                    Toggle status
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;