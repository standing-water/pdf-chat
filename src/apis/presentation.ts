import axios from "axios";
import { API_URL } from "constants/server";

export const getPresentation = () => {};
export const createPresentation = (name: string, file: File) =>
  axios.post(`${API_URL}/presentation`, {
    name,
    file
  });
