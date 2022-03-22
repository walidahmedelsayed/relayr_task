import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import CardView from "./CardView";
import devices from "../../../fixtures/devices.json";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../reducers";

const store = createStore(rootReducer);
const mockFunction = jest.fn();

describe("test the view devices with card view", () => {
  it("render the right number of devices", async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <CardView devices={devices} updateDeviceStatus={mockFunction} />
        </Router>
      </Provider>
    );

    const data = container.getElementsByTagName("li");
    expect(data.length).toBe(devices.length);
  });

  it("toggle status is triggered", async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <CardView devices={devices} updateDeviceStatus={mockFunction} />
        </Router>
      </Provider>
    );

    const toggleBtn = screen.getByText(/Toggle status/i);
    fireEvent.click(toggleBtn);
    expect(mockFunction).toBeCalledTimes(1);
  });
});
