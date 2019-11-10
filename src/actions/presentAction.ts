import { createAction } from "redux-actions";
import {
  GET_PRESENTATIONS,
  CREATE_PRESENTATION,
  ENTER_ROOM,
  CREATE_QUESTION,
  LOGIN,
  GET_QUESTIONS,
  LIKE,
  DISLIKE,
  CHANGE_PAGE
} from "constants/presentConstants";

export const getPresentationsRequest = createAction(GET_PRESENTATIONS.REQUEST);
export const getPresentationsSuccess = createAction<{ rooms: Room[] }>(GET_PRESENTATIONS.SUCCESS);
export const getPresentationsFail = createAction(GET_PRESENTATIONS.FAIL);

export const createPresentationRequest = createAction<{
  name: string;
  file: File;
}>(CREATE_PRESENTATION.REQUEST);
export const createPresentationSuccess = createAction<{ enterId: string; id: number; fileUrl: string; token: string }>(
  CREATE_PRESENTATION.SUCCESS
);
export const createPresentationFail = createAction(CREATE_PRESENTATION.FAIL);

export const enterRoomRequest = createAction<{ enterId: string }>(ENTER_ROOM.REQUEST);
export const enterRoomSuccess = createAction<{ roomDetail: RoomDetail }>(ENTER_ROOM.SUCCESS);
export const enterRoomFail = createAction(ENTER_ROOM.FAIL);

export const getQuestionsRequest = createAction<{ token: string; presentationId: number }>(GET_QUESTIONS.REQUEST);
export const getQuestionsSuccess = createAction<{ questions: Question[] }>(GET_QUESTIONS.SUCCESS);
export const getQuestionsFail = createAction(GET_QUESTIONS.FAIL);

export const createQuestionRequest = createAction<{
  token: string;
  presentationId: number;
  page: number;
  content: string;
}>(CREATE_QUESTION.REQUEST);
export const createQuestionSuccess = createAction(CREATE_QUESTION.SUCCESS);
export const createQuestionFail = createAction(CREATE_QUESTION.FAIL);

export const loginRequest = createAction<{ presentationId: number }>(LOGIN.REQUEST);
export const loginSuccess = createAction<{ user: User }>(LOGIN.SUCCESS);
export const loginFail = createAction(LOGIN.FAIL);

export const likeRequest = createAction<{ token: string; presentationId: number; questionId: number }>(LIKE.REQUEST);
export const likeSuccess = createAction(LIKE.SUCCESS);
export const likeFail = createAction(LIKE.FAIL);

export const dislikeRequest = createAction<{ token: string; presentationId: number; questionId: number }>(
  DISLIKE.REQUEST
);
export const dislikeSuccess = createAction(DISLIKE.SUCCESS);
export const dislikeFail = createAction(DISLIKE.FAIL);

export const changePageRequest = createAction<{ token: string; presentationId: number; page: number }>(
  CHANGE_PAGE.REQUEST
);
export const changePageSuccess = createAction(CHANGE_PAGE.SUCCESS);
