import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import TableView from "./TableView";
import devices from "../../../fixtures/devices.json";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../reducers";

const store = createStore(rootReducer);
const mockFunction = jest.fn();

describe("test the view devices with table view", () => {
  it("render the right number of devices", async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <TableView devices={devices} updateDeviceStatus={mockFunction} />
        </Router>
      </Provider>
    );

    const data = container.getElementsByTagName("tr");
    expect(data.length).toBe(devices.length + 1);
  });
});
