import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setDevices } from "../../actions/devices";
import { fetchDevices } from "../../services/DevicesData";
import ViewController from "../ViewController/ViewController";
import CardView from "./cardview/CardView";
import TableView from "./tableview/TableView";
import { LoadingButton } from "@mui/lab";
import "./index.css";

const Home = ({ devices, view, setDevices }) => {
  const [loadedDevices, setLoadedDevices] = useState(20);

  const handleLoadMore = () => {
    setLoadedDevices(loadedDevices + 20);
  };

  useEffect(() => {
    async function fetchData() {
      const devicesData = await fetchDevices();
      setDevices(devicesData.slice(0, loadedDevices));
    }
    fetchData();
  }, [loadedDevices, setDevices]);

  return (
    <div>
      <ViewController />
      {view === "Table" && <TableView devices={devices} />}
      {view === "Card" && <CardView devices={devices} />}
      {devices.length >= 20 && (
        <div className="LoadingBtn">
          <LoadingButton onClick={() => handleLoadMore()}>
            Load More
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
