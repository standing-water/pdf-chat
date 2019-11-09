interface ActionWithPayload<T> {
  type: string;
  payload: T;
}

interface Room {
  enterId: string;
  fileId: string;
  id: number;
  name: string;
}

interface Question {
  content: string;
}

type PresentationState = {
  isFetchingRooms: boolean;
  rooms: Room[];
  questions: Question[];
};

interface AppState {
  presentation: PresentationState;
}
