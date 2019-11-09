import { GET_PRESENTATIONS, CREATE_PRESENTATION, CREATE_QUESTION, ENTER_ROOM } from "constants/presentConstants";

// Initial State
const initialState: PresentationState = {
  isFetchingRooms: false,
  isFetchingCurrentRoom: false,
  rooms: [],
  currentRoom: null,
  questions: [
    {
      content: "Hi"
    }
  ]
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
    case CREATE_QUESTION.SUCCESS: {
      console.log(action);
      return {
        ...state,
        questions: [...state.questions, { content: action.payload }]
      };
    }

    default:
      return state;
  }
}

export default presentReducer;
