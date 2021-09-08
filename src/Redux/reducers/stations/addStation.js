import { CREATE_STATION_ERROR, CREATE_STATION_START, CREATE_STATION_SUCCESS } from "../../actionsTypes/stations";

export default (state, {type, payload}) =>{
    switch(type){
        case CREATE_STATION_START:
            return {
                ...state,
                createStation: {
                    ...state.createStation,
                    loadingCreate: true,
                    error: ''
                }
            }

        case CREATE_STATION_SUCCESS:
            return {
                ...state,
                createStation: {
                    ...state.createStation,
                    loadingCreate: false,
                    data: payload,
                    error: ''
                }
            }

        case CREATE_STATION_ERROR:
            return {
                ...state,
                createStation: {
                    ...state.createStation,
                    loadingCreate: false,
                    error: payload
                }
            }
    }
}