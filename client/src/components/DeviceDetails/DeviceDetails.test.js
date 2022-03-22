import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import DeviceDetails from "./DeviceDetails";
import devices from "../../fixtures/devices.json";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";

const store = createStore(rootReducer);

describe("test the detail view", () => {
  it("render the component", async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <DeviceDetails devices={devices} />
        </Router>
      </Provider>
    );

    const data = container.tagName;

    expect(data).toBe("DIV");
  });
});
