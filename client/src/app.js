import React from "react";
import Devices from "./components/Devices";
import Logo from "./components/RelayrLogo/logo";
import Search from "./components/Search/Search";

const App = () => {
  return (
    <>
      <Logo />
      <Search />
      <Devices />
    </>
  );
};

export default App;
