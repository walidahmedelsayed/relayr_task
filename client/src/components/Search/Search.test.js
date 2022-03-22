import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Search from "./Search";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";

const store = createStore(rootReducer);
describe("Test the search component", () => {
  it("render the search controller", () => {
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const SearchInput = screen.getByLabelText(/Search by name/i);
    expect(SearchInput.value).toBe("");
    fireEvent.change(SearchInput, { target: { value: "pump" } });
    expect(SearchInput.value).toBe("pump");
  });
});
