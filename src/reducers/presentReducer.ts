import {
  GET_PRESENTATIONS,
  CREATE_PRESENTATION,
  CREATE_QUESTION
} from "constants/presentConstants";

// Initial State
const initialState: PresentationState = {
  isFetchingRooms: false,
  rooms: []
const initialState = {
  presentation: {
    id: null
  },
  questions: []
};

function presentReducer(state: PresentationState = initialState, action: any): PresentationState {
  switch (action.type) {
    case GET_PRESENTATIONS.REQUEST: {
      return {
        ...state,
        isFetchingRooms: true
      };
    }
    case GET_PRESENTATIONS.SUCCESS: {
      const { rooms } = action.payload;
      return {
        ...state,
        rooms,
        isFetchingRooms: false
      };
    }
    case CREATE_QUESTION:

    default:
      return state;
  }
}

export default presentReducer;
