import { GET_PRESENTATIONS, CREATE_PRESENTATION, CREATE_QUESTION, ENTER_ROOM, LOGIN } from "constants/presentConstants";
import { WS_URL } from "constants/server";
import { GET_QUESTIONS } from "../constants/presentConstants";

// Initial State
const initialState: PresentationState = {
  ws: new WebSocket(WS_URL),
  user: null,
  isFetchingRooms: false,
  isFetchingCurrentRoom: false,
  rooms: [],
  currentRoom: null,
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
    case ENTER_ROOM.REQUEST: {
      return {
        ...state,
        isFetchingCurrentRoom: true
      };
    }
    case ENTER_ROOM.SUCCESS: {
      const { roomDetail } = action.payload;
      return {
        ...state,
        currentRoom: roomDetail,
        isFetchingCurrentRoom: false
      };
    }
    case GET_QUESTIONS.SUCCESS: {
      const { questions } = action.payload;
      return {
        ...state,
        questions
      };
    }
    case CREATE_QUESTION.SUCCESS: {
      return {
        ...state
      };
    }
    case LOGIN.SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }

    default:
      return state;
  }
}

export default presentReducer;
