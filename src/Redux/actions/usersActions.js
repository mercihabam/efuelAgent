import axios from "axios";
import { GET_CURR_USER_ERROR, GET_CURR_USER_START, GET_CURR_USER_SUCCESS, LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS, SIGNUP_ERROR, SIGNUP_START, SIGNUP_SUCCESS } from "../actionsTypes/users";
import { SERVER_URL, TOKEN_NAME } from 'env';
import * as SecureStore from 'expo-secure-store';

export const loginAction = (data) => async(dispatch, navigation) =>{
    dispatch({
        type: LOGIN_START
    });

    try {
        const url =`${SERVER_URL}/users/login`;
        const res = await axios.post(url, data);
        if(res.status === 200){
            SecureStore.setItemAsync(TOKEN_NAME, res.data.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data.user
            });
            SecureStore.deleteItemAsync('stationId');
            getCurrUser(dispatch);
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: LOGIN_ERROR,
                payload: 'Veuillez réessayez plus tard'
            });
        }
    }
};

export const getCurrUser = async(dispatch) =>{
    dispatch({
        type: GET_CURR_USER_START
    });

    try {
        const token = await SecureStore.getItemAsync(TOKEN_NAME);
        const res = await axios.get(`${SERVER_URL}/agents/current-user-agent`, {
            headers: {
                'e-fuel-authtoken': token
            }
        });
        if(res.status === 200){
            dispatch({
                type: GET_CURR_USER_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: GET_CURR_USER_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: GET_CURR_USER_ERROR,
                payload: 'Veuillez réessayez plutard'
            })
        }
    }
};

export const signupAction = (data) => async(dispatch) =>{
    dispatch({
        type: SIGNUP_START
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, data);
        if(res.status === 201){
            localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, res.data.data.token);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data.data.user
            });
            window.location = '/dashboard'
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: SIGNUP_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: SIGNUP_ERROR,
                payload: 'Veuillez réessayez plutard'
            });
        }
    }
};