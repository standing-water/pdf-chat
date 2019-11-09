import { combineReducers } from "redux";
import presentReducer from "./presentReducer";

const rootReducer = combineReducers({
  presentation: presentReducer
});

export default rootReducer;
