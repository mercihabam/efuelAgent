import { GET_STOCKS_ERROR, GET_STOCKS_START, GET_STOCKS_SUCCESS } from "../../actionsTypes/stocks";

export default (state, {type, payload}) =>{
    switch(type){
        case GET_STOCKS_START:
            return {
                ...state, 
                stocks: {
                    loadingStocks: true,
                    error: null,
                    dataStocks: [{name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}]
                }
            }

        case GET_STOCKS_SUCCESS:
            return {
                ...state, 
                stocks: {
                    loadingStocks: false,
                    error: null,
                    dataStocks: payload
                }
            }

        case GET_STOCKS_ERROR:
            return {
                ...state, 
                stocks: {
                    loadingStocks: false,
                    error: payload
                }
            }
    }
}