import axios from "axios";
import { BACKEND_DEVICES_URL } from "../config.json";

export const fetchDevices = async () => {
  const { data } = await axios.get(BACKEND_DEVICES_URL);
  return data.data;
};

export const updateDevice = async (deviceId, updatedData) => {
  try {
    await axios.patch(BACKEND_DEVICES_URL + deviceId, updatedData);
  } catch (e) {
    return false;
  }
  return true;
};
