import axios from "axios";
import { API_URL } from "constants/server";

export const getPresentation = () => axios.get(`${API_URL}/presentation`);
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

export const enterRoom = (enterId: string) => axios.get(`${API_URL}/presentation/${enterId}`);

export const getQuestions = (token: string, presentationId: number) =>
  axios.get(`${API_URL}/presentation/${presentationId}/question`, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });

export const createQuestion = (token: string, presentationId: number, page: number, content: string) => {
  const formData = new FormData();
  formData.append("page", page.toString());
  formData.append("content", content);
  return axios.post(`${API_URL}/presentation/${presentationId}/question`, formData, {
    headers: {
      Authorization: `bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const login = (presentationId: number) =>
  axios.post(`${API_URL}/presentation/${presentationId}/login`, null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

export const sendWS = (ws: WebSocket, data: { message: string; parameter?: any }) => ws.send(JSON.stringify(data));

export const like = (token: string, presentationId: number, questionId: number) => {
  return axios.post(`${API_URL}/presentation/${presentationId}/question/${questionId}/like`, null, {
    headers: {
      Authorization: `bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const dislike = (token: string, presentationId: number, questionId: number) => {
  return axios.delete(`${API_URL}/presentation/${presentationId}/question/${questionId}/like`, {
    headers: {
      Authorization: `bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
