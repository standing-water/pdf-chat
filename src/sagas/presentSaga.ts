import { take, call, put, select, takeLatest, all } from "redux-saga/effects";
import { API_URL } from "constants/server";
import { postRequest } from "utils/request";
import {
  POST_PRESENT_FAIL,
  POST_PRESENT_SUCCESS
} from "constants/presentConstants";

export function* postPresentSaga(action: any) {
  const { name, file } = action;
  const url = `${API_URL}/presentation`;
  const payload = {
    name,
    file
  };
  try {
    const result = yield call(postRequest, { url, payload });
    yield put({ type: POST_PRESENT_SUCCESS });
  } catch ({ error, response }) {
    let failed = false;
    if (response.data.message === "login failed") {
      failed = true;
    }
    yield put({ type: POST_PRESENT_FAIL, failed });
  }
}
