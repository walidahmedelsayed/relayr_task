import React from "react";
import { connect } from "react-redux";
import { updateView } from "../../actions/devices";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const ViewController = ({ view, updateView }) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="data-views"
        name="row-radio-buttons-group"
        value={view}
        onChange={(e) => updateView(e.target.value)}
      >
        <FormControlLabel value="Card" control={<Radio />} label="Card View" />
        <FormControlLabel
          value="Table"
          control={<Radio />}
          label="Table View"
        />
      </RadioGroup>
    </FormControl>
  );
};

const mapStateToProps = (state) => {
  return {
    view: state.devices.view,
  };
};

export default connect(mapStateToProps, {
  updateView,
})(ViewController);
