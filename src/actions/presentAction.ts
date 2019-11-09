import { createAction } from "redux-actions";
import { GET_PRESENTATIONS, CREATE_PRESENTATION } from "constants/presentConstants";

export const getPresentationsRequest = createAction(GET_PRESENTATIONS.REQUEST);
export const getPresentationsSuccess = createAction<{ rooms: Room[] }>(GET_PRESENTATIONS.SUCCESS);
export const getPresentationsFail = createAction(GET_PRESENTATIONS.FAIL);

export const createPresentationRequest = createAction<{ name: string; file: File }>(CREATE_PRESENTATION.REQUEST);
export const createPresentationSuccess = createAction(CREATE_PRESENTATION.SUCCESS);
export const createPresentationFail = createAction(CREATE_PRESENTATION.FAIL);
