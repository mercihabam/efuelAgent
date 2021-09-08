import initialStates from "../../initialStates";
import create from "./create";
import getAll from "./getAll";
import selled from "./selled";
import update from "./update";

export default (state=initialStates.stocks, action={}) =>({
    ...state,
    ...create(state, action),
    ...getAll(state, action),
    ...update(state, action),
    ...selled(state, action)
})