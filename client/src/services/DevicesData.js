import axios from "axios";
import { BACKEND_DEVICES_URL } from "../config.json";

export const fetchDevices = async () => {
  const { data } = await axios.get(BACKEND_DEVICES_URL);
  return data.data;
};
