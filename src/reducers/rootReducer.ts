import { combineReducers } from "redux";
import presentReducer from "./presentReducer";

export interface AppState {}

const rootReducer = combineReducers({
  presentReducer: presentReducer
});

export default rootReducer;
