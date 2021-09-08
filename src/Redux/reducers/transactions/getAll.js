import { GET_TRANSACTIONS_ERROR, GET_TRANSACTIONS_START, GET_TRANSACTIONS_SUCCESS } from "../../actionsTypes/transactions";

export default (state, {type, payload}) =>{
    switch(type){
        case GET_TRANSACTIONS_START:
            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    loadingTrans: true,
                    error: null
                }
            }

        case GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    loadingTrans: false,
                    error: null,
                    dataTrans: payload,
                    rowsTrans: payload.rows,
                    countTrans: payload.count
                }
            }

        case GET_TRANSACTIONS_ERROR:
            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    loadingTrans: false,
                    error: payload
                }
            }
    }
}