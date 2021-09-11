import initialStates from "../../initialStates";
import getAll from "./getAll";
import sell from "./sell";

export default (state=initialStates.transactions, action={}) =>({
    ...state,
    ...getAll(state, action),
    ...sell(state, action)
})