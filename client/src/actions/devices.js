import { FETCHING_DEVICES_SUCCESS, UPDATE_DEVICES_VIEW } from "./actionTypes";

export const setDevices = (devices) => ({
  type: FETCHING_DEVICES_SUCCESS,
  payload: devices,
});

export const updateView = (view) => ({
  type: UPDATE_DEVICES_VIEW,
  payload: view,
});
