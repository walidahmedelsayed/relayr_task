import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import MeasurementsChart from "./MeasurementsChart";
import devices from "../../fixtures/devices.json";

describe("Test the chart component", () => {
  it("render the chart component", () => {
    render(<MeasurementsChart device={devices[0]} />);
    const measurement = screen.getAllByText(/Measurement Name/i);
    expect(measurement.length).toBe(4);
  });
});
