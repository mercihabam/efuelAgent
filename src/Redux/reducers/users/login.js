import { LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS } from "../../actionsTypes/users";

export default (state, {type, payload}) =>{
    switch(type){
        case LOGIN_START:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: true,
                    error: ''
                }
            }

        case LOGIN_SUCCESS:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: '',
                    data: payload
                }
            }

        case LOGIN_ERROR:
            return{
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: payload
                }
            }
    }
}