import { GET_PRESENTATIONS, CREATE_PRESENTATION } from "constants/presentConstants";

// Initial State
const initialState = {
  presentation: {
    id: null
  }
};

function presentReducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export default presentReducer;
