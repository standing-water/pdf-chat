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

interface User {
  nickname: string;
  token: string;
}

type PresentationState = {
  ws: WebSocket;
  isFetchingRooms: boolean;
  isFetchingCurrentRoom: boolean;
  rooms: Room[];
  currentRoom: RoomDetail | null;
  questions: Question[];
  user: User | null;
};

interface AppState {
  presentation: PresentationState;
}
