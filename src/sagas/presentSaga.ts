import { take, call, put, select, takeLatest, all } from "redux-saga/effects";

import {
  GET_PRESENTATIONS,
  CREATE_PRESENTATION,
  CREATE_QUESTION
} from "constants/presentConstants";
import { getPresentation, createPresentation } from "apis/presentation";
import {
  getPresentationsRequest,
  getPresentationsSuccess,
  createPresentationFail,
  createQuestionSuccess,
  createQuestionFail
} from "actions/presentAction";

function* watchGetPresentation(action: any) {
  try {
    const result = yield call(getPresentation);
    yield put(getPresentationsSuccess({ rooms: result.data.data }));
  } catch (err) {}
}

function* watchCreatePresentation(
  action: ActionWithPayload<{ name: string; file: File }>
) {
  const { name, file } = action.payload;
  try {
    const test = yield call(createPresentation, name, file);
    yield put(getPresentationsRequest());
  } catch (err) {
    yield put(createPresentationFail());
  }
}

function* watchCreateQuestion(
  action: ActionWithPayload<{
    present_id: number;
    page: number;
    content: string;
  }>
) {
  const { present_id, page, content } = action.payload;
  // const question = yield call(createQuestion, present_id, page, content)
  try {
    yield put(createQuestionSuccess(content));
  } catch (err) {
    yield put(createQuestionFail());
  }
}

export default function* presentSaga() {
  yield all([
    takeLatest(GET_PRESENTATIONS.REQUEST, watchGetPresentation),
    takeLatest(CREATE_PRESENTATION.REQUEST, watchCreatePresentation),
    takeLatest(CREATE_QUESTION.REQUEST, watchCreateQuestion)
  ]);
}
