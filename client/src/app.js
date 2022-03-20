import React from "react";
import Devices from "./components/Devices";
import Logo from "./components/RelayrLogo/logo";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DeviceDetails from "./components/DeviceDetails/DeviceDetails";
import { Button } from "@mui/material";

const App = () => {
  return (
    <>
      <Logo />
      <Router>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Routes>
          <Route path="/" element={<Devices />} />
          <Route path="/:id" element={<DeviceDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
