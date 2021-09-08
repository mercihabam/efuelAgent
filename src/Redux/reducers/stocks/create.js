import { CREATE_STOCK_ERROR, CREATE_STOCK_START, CREATE_STOCK_SUCCESS } from "../../actionsTypes/stocks";

export default (state, {type, payload}) =>{
    switch(type){
        case CREATE_STOCK_START:
            return {
                ...state,
                createStock: {
                    loadingCreate: true,
                    error: ''
                }
            }

        case CREATE_STOCK_SUCCESS:
            return {
                ...state,
                createStock: {
                    loadingCreate: false,
                    error: '',
                    data: payload
                }
            }

        case CREATE_STOCK_ERROR:
            return {
                ...state,
                createStock: {
                    loadingCreate: false,
                    error: payload
                }
            }
    }
}