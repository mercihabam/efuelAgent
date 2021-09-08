import { GET_CUR_STATION_ERROR, GET_CUR_STATION_START, GET_CUR_STATION_SUCCESS } from "../../actionsTypes/stations";

export default (state, {type, payload}) =>{
    switch(type){
        case GET_CUR_STATION_START:
            return {
                ...state,
                currStation: {
                    ...state.currStation,
                    loadingCurrSt: true
                }
            }

        case GET_CUR_STATION_SUCCESS:
            return {
                ...state,
                currStation: {
                    ...state.currStation,
                    loadingCurrSt: false,
                    dataSt: payload,
                    error: null
                }
            }

        case GET_CUR_STATION_ERROR:
            return {
                ...state,
                currStation: {
                    ...state.currStation,
                    loadingCurrSt: false,
                    error: payload
                }
            }
    }
}