import { GET_PRESENTS_REQUEST, POST_PRESENT_REQUEST } from "constants/presentConstants";

export function getPresentsRequestAction() {
  return {
    type: GET_PRESENTS_REQUEST
  };
}

export function postPresentRequestAction() {
  return {
    type: POST_PRESENT_REQUEST
  };
}
