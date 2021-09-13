import initialStates from "../../initialStates";
import getAll from "./getAll";
import recharge from "./recharge";
import sell from "./sell";

export default (state=initialStates.transactions, action={}) =>({
    ...state,
    ...getAll(state, action),
    ...sell(state, action),
    ...recharge(state, action)
})