import {
  POST_PRESENT_REQUEST,
  POST_PRESENT_SUCCESS,
  POST_PRESENT_FAIL
} from "constants/presentConstants";

// Initial State
const initialState = {
  presentation: {
    id: null
  }
};

function presentReducer(state = initialState, action: any) {
  switch (action.type) {
    case POST_PRESENT_REQUEST:
    case POST_PRESENT_SUCCESS:
    case POST_PRESENT_FAIL:
    default:
      return state;
  }
}

export default presentReducer;
