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
          {device.measurements.map((m, i) => {
            return (
              <>
                <Typography>
                  Measurement Name: {measurement.name} at{" "}
                  {new Date(m[index][i][1]).toDateString()}
                </Typography>
                <Slider
                  aria-label={measurement.name}
                  value={m[index][i][0]}
                  step={10}
                  min={measurement.min}
                  max={measurement.max}
                  marks
                  valueLabelDisplay="on"
                />
              </>
            );
          })}
        </div>
      ))}
    </Box>
  );
};

export default MeasurementsChart;
