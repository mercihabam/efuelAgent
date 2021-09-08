import { combineReducers, createStore } from "redux";
import reducers from "./reducers";
import initialStates from "./initialStates";
// import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(combineReducers(reducers), initialStates);

export default store;