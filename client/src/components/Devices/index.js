import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setDevices } from "../../actions/devices";
import { fetchDevices } from "../../services/DevicesData";
import ViewController from "../ViewController/ViewController";
import CardView from "./cardview/CardView";
import TableView from "./tableview/TableView";
import { LoadingButton } from "@mui/lab";
import "./index.css";

const INITIAL_DEVICES_TO_SHOW = 16;

const Home = ({ devices, view, setDevices }) => {
  const [loadedDevices, setLoadedDevices] = useState(INITIAL_DEVICES_TO_SHOW);
  const [devicesToShow, setDevicesToShow] = useState(
    devices.slice(0, loadedDevices)
  );

  const handleLoadMore = () => {
    setLoadedDevices(loadedDevices + INITIAL_DEVICES_TO_SHOW);
  };

  useEffect(() => {
    async function fetchData() {
      const devicesData = await fetchDevices();
      setDevices(devicesData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setDevicesToShow(devices.slice(0, loadedDevices));
  }, [loadedDevices, setDevicesToShow, devices]);

  return (
    <div>
      <ViewController />
      {view === "Table" && <TableView devices={devicesToShow} />}
      {view === "Card" && <CardView devices={devicesToShow} />}
      {devicesToShow.length >= INITIAL_DEVICES_TO_SHOW && (
        <div className="LoadingBtn">
          <LoadingButton onClick={() => handleLoadMore()}>
            Load More Devices
          </LoadingButton>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    devices: state.devices.filteredDevices,
    view: state.devices.view,
  };
};

export default connect(mapStateToProps, {
  setDevices,
})(Home);
