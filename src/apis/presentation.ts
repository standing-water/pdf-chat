import axios from "axios";
import { API_URL } from "constants/server";

export const getPresentation = () => {};
export const createPresentation = (name: string, file: File) =>
  axios.post(
    `${API_URL}/presentation`,
    {
      name,
      file
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
