import { take, call, put, select, takeLatest, all } from "redux-saga/effects";
import { API_URL } from "constants/server";
import { postRequest } from "utils/request";
import {
  GET_PRESENTATIONS,
  CREATE_PRESENTATION,
  CREATE_QUESTION,
  ENTER_ROOM,
  LOGIN,
  GET_QUESTIONS
} from "constants/presentConstants";
import { getPresentation, createPresentation, enterRoom, login, createQuestion, getQuestions } from "apis/presentation";
import { getQuestionsSuccess } from "../actions/presentAction";

import {
  getPresentationsRequest,
  getPresentationsSuccess,
  createPresentationFail,
  enterRoomSuccess,
  createQuestionSuccess,
  createQuestionFail,
  loginSuccess,
  getQuestionsRequest
} from "actions/presentAction";

function* watchGetPresentation(action: any) {
  try {
    const result = yield call(getPresentation);
    yield put(getPresentationsSuccess({ rooms: result.data.data.items }));
  } catch (err) {}
}

function* watchCreatePresentation(action: ActionWithPayload<{ name: string; file: File }>) {
  const { name, file } = action.payload;
  try {
    const test = yield call(createPresentation, name, file);
    yield put(getPresentationsRequest());
  } catch (err) {
    yield put(createPresentationFail());
  }
}

function* watchEnterRoom(action: ActionWithPayload<{ enterId: string }>) {
  const { enterId } = action.payload;
  try {
    const res = yield call(enterRoom, enterId);
    yield put(enterRoomSuccess({ roomDetail: res.data.data }));
  } catch (err) {}
}

function* watchGetQuestion(action: ActionWithPayload<{ token: string; presentationId: number }>) {
  const { token, presentationId } = action.payload;
  try {
    const res = yield call(getQuestions, token, presentationId);
    yield put(getQuestionsSuccess({ questions: res.data.data.items }));
  } catch (err) {
    console.log(err);
  }
}

function* watchCreateQuestion(
  action: ActionWithPayload<{
    token: string;
    presentationId: number;
    page: number;
    content: string;
  }>
) {
  const { token, presentationId, page, content } = action.payload;
  try {
    const res = yield call(createQuestion, token, presentationId, page, content);
    console.log(res.data.data);
    yield put(createQuestionSuccess(content));
    yield put(getQuestionsRequest({ token, presentationId }));
  } catch (err) {
    yield put(createQuestionFail());
  }
}

function* watchLogin(action: ActionWithPayload<{ presentationId: number }>) {
  const { presentationId } = action.payload;
  try {
    const res = yield call(login, presentationId);
    yield put(loginSuccess({ user: res.data.data }));
  } catch (err) {}
}

export default function* presentSaga() {
  yield all([
    takeLatest(GET_PRESENTATIONS.REQUEST, watchGetPresentation),
    takeLatest(CREATE_PRESENTATION.REQUEST, watchCreatePresentation),
    takeLatest(ENTER_ROOM.REQUEST, watchEnterRoom),
    takeLatest(GET_QUESTIONS.REQUEST, watchGetQuestion),
    takeLatest(CREATE_QUESTION.REQUEST, watchCreateQuestion),
    takeLatest(LOGIN.REQUEST, watchLogin)
  ]);
}
