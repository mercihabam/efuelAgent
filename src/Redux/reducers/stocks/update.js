import { EDIT_STOCK_ERROR, EDIT_STOCK_START, EDIT_STOCK_SUCCESS } from "../../actionsTypes/stocks";

export default (state, {type, payload}) =>{
    switch(type){
        case EDIT_STOCK_START:
            return {
                ...state,
                updateStock: {
                    loadingUpdate: true,
                    error: ''
                }
            }

        case EDIT_STOCK_SUCCESS:
            return {
                ...state,
                updateStock: {
                    loadingUpdate: false,
                    error: '',
                    data: payload
                }
            }

        case EDIT_STOCK_ERROR:
            return {
                ...state,
                updateStock: {
                    loadingUpdate: false,
                    error: payload
                }
            }
    }
}