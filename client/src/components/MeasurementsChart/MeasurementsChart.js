import React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(4),
  },
  rail: {
    height: theme.spacing(4),
  },
  track: {
    height: theme.spacing(4),
  },
  mark: {
    height: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  thumb: {
    display: "none",
  },
}));

const MeasurementsChart = ({ device }) => {
  const classes = useStyles();
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
            classes={{
              root: classes.root,
              rail: classes.rail,
              track: classes.track,
              thumb: classes.thumb,
              mark: classes.mark,
            }}
          />
        </div>
      ))}
    </Box>
  );
};

export default MeasurementsChart;
