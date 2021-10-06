import { RECHARGE_ERROR, RECHARGE_START, RECHARGE_SUCCESS } from "../../actionsTypes/transactions";

export default (state, {type, payload}) =>{
    switch(type){
        case RECHARGE_START:
            return {
                ...state,
                recharge: {
                    loadingRecharge: true
                }
            };

        case RECHARGE_SUCCESS:
            return {
                ...state,
                recharge: {
                    ...state.recharge,
                    loadingRecharge: false,
                    errorRecharge: '',
                    data: payload
                }
            };

        case RECHARGE_ERROR:
            return {
                ...state,
                recharge: {
                    ...state.recharge,
                    loadingRecharge: false,
                    errorRecharge: payload
                }
            }
    }
}