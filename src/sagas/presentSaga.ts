import { take, call, put, select, takeLatest, all } from "redux-saga/effects";
import { API_URL } from "constants/server";
import { postRequest } from "utils/request";
import { GET_PRESENTATIONS, CREATE_PRESENTATION, ENTER_ROOM } from "constants/presentConstants";
import { getPresentation, createPresentation, enterRoom } from "apis/presentation";
import {
  getPresentationsRequest,
  getPresentationsSuccess,
  createPresentationFail,
  enterRoomSuccess
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

export default function* presentSaga() {
  yield all([
    takeLatest(GET_PRESENTATIONS.REQUEST, watchGetPresentation),
    takeLatest(CREATE_PRESENTATION.REQUEST, watchCreatePresentation),
    takeLatest(ENTER_ROOM.REQUEST, watchEnterRoom)
  ]);
}
