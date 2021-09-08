import { UPDATE_STATION_ERROR, UPDATE_STATION_START, UPDATE_STATION_SUCCESS } from "../../actionsTypes/stations";

export default (state, {type, payload}) =>{
    switch(type){
        case UPDATE_STATION_START:
            return {
                ...state,
                updateStation: {
                    ...state.updateStation,
                    loadingUpdate: true,
                    errorUpdate: ''
                }
            }

        case UPDATE_STATION_SUCCESS:
            return {
                ...state,
                updateStation: {
                    ...state.updateStation,
                    loadingUpdate: false,
                    data: payload,
                    errorUpdate: ''
                }
            }

        case UPDATE_STATION_ERROR:
            return {
                ...state,
                updateStation: {
                    ...state.updateStation,
                    loadingUpdate: false,
                    errorUpdate: payload
                }
            }
    }
}