import { createAction } from "redux-actions";
import {
  GET_PRESENTATIONS,
  CREATE_PRESENTATION,
  CREATE_QUESTION
} from "constants/presentConstants";

export const getPresentationsRequest = createAction(GET_PRESENTATIONS.REQUEST);
export const getPresentationsSuccess = createAction<{ rooms: Room[] }>(GET_PRESENTATIONS.SUCCESS);
export const getPresentationsFail = createAction(GET_PRESENTATIONS.FAIL);

export const createPresentationRequest = createAction<{
  name: string;
  file: File;
}>(CREATE_PRESENTATION.REQUEST);
export const createPresentationSuccess = createAction(
  CREATE_PRESENTATION.SUCCESS
);
export const createPresentationFail = createAction(CREATE_PRESENTATION.FAIL);

export const createQuestionRequest = createAction<{
  present_id: number;
  page: number;
  content: string;
}>(CREATE_QUESTION.REQUEST);

export const createQuestionSuccess = createAction(CREATE_QUESTION.SUCCESS);
export const createQuestionFail = createAction(CREATE_QUESTION.FAIL);
