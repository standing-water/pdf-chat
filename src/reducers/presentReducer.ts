import { GET_PRESENTATIONS, CREATE_PRESENTATION } from "constants/presentConstants";

// Initial State
const initialState: PresentationState = {
  isFetchingRooms: false,
  rooms: []
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
    default:
      return state;
  }
}

export default presentReducer;
