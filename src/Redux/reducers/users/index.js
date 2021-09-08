import initialStates from "../../initialStates";
import getCurrent from "./getCurrent";
import login from "./login";
import signup from "./signup";

export default (state = initialStates.users, action={}) =>({
    ...state,
    ...login(state, action),
    ...getCurrent(state, action),
    ...signup(state, action)
});