import { combineReducers } from "redux";
import devicesReducer from "./devices";

export default combineReducers({ devices: devicesReducer });
