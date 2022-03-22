import React from "react";
import { Box, Typography, Slider } from "@mui/material";

const MeasurementsChart = ({ device }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {device.measurementModels.map((measurement, index) => (
        <div key={`${index}`}>
          <Typography>Measurement Name: {measurement.name}</Typography>
          <Slider
            value={device.measurements[index][0][0]}
            step={10}
            min={measurement.min}
            max={measurement.max}
            marks
            valueLabelDisplay="on"
          />
        </div>
      ))}
    </Box>
  );
};

export default MeasurementsChart;
