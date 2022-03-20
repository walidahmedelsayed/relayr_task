import {
  FETCHING_DEVICES_SUCCESS,
  SEARCH_DEVICE,
  UPDATE_DEVICES_VIEW,
  UPDATE_DEVICE_STATUS,
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

    case UPDATE_DEVICE_STATUS:
      const device = state.devices.find((d) => d.deviceId === action.payload);
      device.active = !device.active;

      return {
        ...state,
        devices: [...state.devices],
        filteredDevices: [...state.filteredDevices],
      };

    default:
      return state;
  }
};

export default devicesReducer;
