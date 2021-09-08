import { GET_SELLED_STOCK_ERROR, GET_SELLED_STOCK_START, GET_SELLED_STOCK_SUCCESS } from "../../actionsTypes/stocks";

export default (state, {type, payload}) =>{
    switch(type){
        case GET_SELLED_STOCK_START:
            return {
                ...state, 
                selled: {
                    ...state.selled,
                    loadingSelled: true,
                    error: null,
                }
            }

        case GET_SELLED_STOCK_SUCCESS:
            return {
                ...state, 
                selled: {
                    ...state.selled,
                    loadingSelled: false,
                    error: null,
                    data: payload
                }
            }

        case GET_SELLED_STOCK_ERROR:
            return {
                ...state, 
                selled: {
                    ...state.selled,
                    loadingSelled: false,
                    error: payload
                }
            }
    }
}