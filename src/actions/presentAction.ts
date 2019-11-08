import { createAction } from "redux-actions";
import { GET_PRESENTATIONS, POST_PRESENT_REQUEST } from "constants/presentConstants";

export const getPresentationsRequest = createAction(GET_PRESENTATIONS.REQUEST);
export const getPresentationsSuccess = createAction(GET_PRESENTATIONS.SUCCESS);
export const getPresentationsFail = createAction(GET_PRESENTATIONS.FAIL);

export function postPresentRequestAction() {
  return {
    type: POST_PRESENT_REQUEST
  };
}
