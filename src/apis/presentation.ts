import axios from "axios";
import { API_URL } from "constants/server";

export const getPresentation = () => {};
export const createPresentation = (name: string, file: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);
  return axios.post(`${API_URL}/presentation`, formData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  });
};
