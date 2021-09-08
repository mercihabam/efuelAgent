import initialStates from "../../initialStates";
import getAll from "./getAll";

export default (state=initialStates.transactions, action={}) =>({
    ...state,
    ...getAll(state, action)
})