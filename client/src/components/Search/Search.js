import React from "react";
import { connect } from "react-redux";
import { TextField } from "@mui/material";
import "./search.css";
import { searchDevices } from "../../actions/devices";

const Search = ({ searchDevices }) => {
  const handleSearch = (name) => {
    searchDevices(name);
  };
  return (
    <div className="center">
      <TextField
        label="Search by name"
        type="search"
        variant="standard"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
export default connect(null, {
  searchDevices,
})(Search);
