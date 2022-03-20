import {
  FETCHING_DEVICES_SUCCESS,
  UPDATE_DEVICES_VIEW,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  view: "Card",
  devices: [],
};

const devicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_DEVICES_SUCCESS:
      return {
        ...state,
        devices: [...action.payload],
      };
    case UPDATE_DEVICES_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    default:
      return state;
  }
};

export default devicesReducer;
