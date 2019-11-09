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

type PresentationState = {
  isFetchingRooms: boolean;
  rooms: Room[];
};

interface AppState {
  presentation: PresentationState;
}
