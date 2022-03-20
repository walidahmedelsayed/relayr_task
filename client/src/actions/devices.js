import {
  FETCHING_DEVICES_SUCCESS,
  SEARCH_DEVICE,
  UPDATE_DEVICES_VIEW,
} from "./actionTypes";

export const setDevices = (devices) => ({
  type: FETCHING_DEVICES_SUCCESS,
  payload: devices,
});

export const updateView = (view) => ({
  type: UPDATE_DEVICES_VIEW,
  payload: view,
});

export const searchDevices = (name) => ({
  type: SEARCH_DEVICE,
  payload: name,
});
