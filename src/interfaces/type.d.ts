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

interface RoomDetail {
  currentPage: number;
  enterId: string;
  fileUrl: string;
  id: number;
  name: string;
}

interface Question {
  content: string;
}

type PresentationState = {
  isFetchingRooms: boolean;
  isFetchingCurrentRoom: boolean;
  rooms: Room[];
  currentRoom: RoomDetail | null;
  questions: Question[];
};

interface AppState {
  presentation: PresentationState;
}
