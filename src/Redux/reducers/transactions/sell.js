import { SELL_ERROR, SELL_START, SELL_SUCCESS } from "../../actionsTypes/transactions";

export default (state, {type, payload}) =>{
    switch(type){
        case SELL_START:
            return {
                ...state,
                sell: {
                    loadingSell: true
                }
            };

        case SELL_SUCCESS:
            return {
                ...state,
                sell: {
                    ...state.sell,
                    loadingSell: false,
                    errorSell: '',
                    data: payload
                }
            };

        case SELL_ERROR:
            return {
                ...state,
                sell: {
                    loadingSell: false,
                    errorSell: payload
                }
            }
    }
}