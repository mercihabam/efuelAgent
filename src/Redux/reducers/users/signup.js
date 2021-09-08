import { SIGNUP_ERROR, SIGNUP_START, SIGNUP_SUCCESS } from "../../actionsTypes/users";

export default (state, {type, payload}) =>{
    switch(type){
        case SIGNUP_START:
            return{
                ...state,
                signup: {
                    ...state.signup,
                    loading: true,
                    error: ''
                }
            }

        case SIGNUP_SUCCESS:
            return{
                ...state,
                signup: {
                    ...state.signup,
                    loading: false,
                    error: '',
                    data: payload
                }
            }

        case SIGNUP_ERROR:
            return{
                ...state,
                signup: {
                    ...state.signup,
                    loading: false,
                    error: payload
                }
            }
    }
}