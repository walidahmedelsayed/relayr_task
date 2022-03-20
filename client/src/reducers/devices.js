import {
  FETCHING_DEVICES_SUCCESS,
  SEARCH_DEVICE,
  UPDATE_DEVICES_VIEW,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  view: "Card",
  devices: [],
  filteredDevices: [],
};

const devicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_DEVICES_SUCCESS:
      return {
        ...state,
        devices: [...action.payload],
        filteredDevices: [...action.payload],
      };
    case UPDATE_DEVICES_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    case SEARCH_DEVICE:
      return {
        ...state,
        filteredDevices: [
          ...state.devices.filter((device) =>
            device.deviceName.includes(action.payload || "")
          ),
        ],
      };
    default:
      return state;
  }
};

export default devicesReducer;
