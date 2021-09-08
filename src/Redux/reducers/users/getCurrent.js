import { GET_CURR_USER_ERROR, GET_CURR_USER_START, GET_CURR_USER_SUCCESS } from "../../actionsTypes/users";

export default (state, {type, payload}) =>{
    switch(type){
        case GET_CURR_USER_START:
            return{
                ...state,
                currUser: {
                    ...state.currUser,
                    loadingCurr: true,
                    error: null
                }
            }

        case GET_CURR_USER_SUCCESS:
            return{
                ...state,
                currUser: {
                    ...state.currUser,
                    loadingCurr: false,
                    error: null,
                    data: payload,
                    auth: true,
                    stations: payload.Stations
                }
            }

        case GET_CURR_USER_ERROR:
            return{
                ...state,
                currUser: {
                    ...state.currUser,
                    loadingCurr: false,
                    error: payload,
                    auth: false,
                    data: { fullName: '' }
                }
            }
    }
}