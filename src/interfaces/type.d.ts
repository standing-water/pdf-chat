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
  activeUserCount: number;
  currentPage: number;
  enterId: string;
  fileUrl: string;
  id: number;
  name: string;
}

interface Question {
  id: number;
  page: number;
  nickname: string;
  content: number;
  myQuestion: boolean;
  liked: boolean;
  likeCount: number;
  reply: Reply[];
}

interface Reply {
  id: number;
  nickname: string;
  content: string;
  myReply: boolean;
  liked: boolean;
  likeCount: number;
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
