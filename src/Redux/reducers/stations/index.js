import initialStates from "../../initialStates";
import addStation from "./addStation";
import current from "./current";
import update from "./update";

export default (state=initialStates.stations, action={})=>({
    ...state,
    ...addStation(state, action),
    ...update(state, action),
    ...current(state, action)
})