import { take, call, put, select, takeLatest, all } from "redux-saga/effects";
import { API_URL } from "constants/server";
import { postRequest } from "utils/request";
import { GET_PRESENTATIONS, CREATE_PRESENTATION } from "constants/presentConstants";
import { createPresentation } from "apis/presentation";
import { createPresentationFail } from "actions/presentAction";

function* watchGetPresentation(action: any) {
  yield console.log("TEST");
}

function* watchCreatePresentation(action: ActionWithPayload<{ name: string; file: File }>) {
  const { name, file } = action.payload;
  try {
    const test = yield call(createPresentation, name, file);
    console.log(test);
  } catch (err) {
    yield put(createPresentationFail());
  }
}

export default function* presentSaga() {
  yield all([
    takeLatest(GET_PRESENTATIONS.REQUEST, watchGetPresentation),
    takeLatest(CREATE_PRESENTATION.REQUEST, watchCreatePresentation)
  ]);
}
