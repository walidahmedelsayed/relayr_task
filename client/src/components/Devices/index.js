import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setDevices } from "../../actions/devices";
import { fetchDevices } from "../../services/DevicesData";
import ViewController from "../controllers/ViewController";
import CardView from "./cardview/CardView";
import TableView from "./tableview/TableView";

const Home = ({ devices, view, setDevices }) => {
  useEffect(() => {
    async function fetchData() {
      const devicesData = await fetchDevices();
      setDevices(devicesData);
    }
    fetchData();
  }, [setDevices]);

  return (
    <div>
      <ViewController />
      {view === "Table" && <TableView devices={devices} />}
      {view === "Card" && <CardView devices={devices} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    devices: state.devices.devices,
    view: state.devices.view,
  };
};

export default connect(mapStateToProps, {
  setDevices,
})(Home);
