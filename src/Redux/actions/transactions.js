import axios from "axios"
import { GET_TRANSACTIONS_ERROR, GET_TRANSACTIONS_START, GET_TRANSACTIONS_SUCCESS, RECHARGE_ERROR, RECHARGE_START, RECHARGE_SUCCESS, SELL_ERROR, SELL_START, SELL_SUCCESS } from "../actionsTypes/transactions"
import { SERVER_URL, TOKEN_NAME } from 'env';
import * as secureStore from 'expo-secure-store'
import { ToastAndroid } from "react-native";

export const getTransactions = (stationId, agentId, offset, limit, type) =>async(dispatch) =>{
    dispatch({
        type: GET_TRANSACTIONS_START
    })

    const token = await secureStore.getItemAsync(TOKEN_NAME);
    try {
        const res = await axios.get(`${SERVER_URL}/transactions/by-agent/${stationId}/${agentId}?offset=${offset}&limit=${limit}&type=${type}`, {
                            headers: {
                                'e-fuel-authtoken': token
                            }
                        });

        if(res.status === 200){
            dispatch({
                type: GET_TRANSACTIONS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: GET_TRANSACTIONS_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: GET_TRANSACTIONS_ERROR,
                payload: 'Veuillez réessayez plus tard'
            });
        }
    }
};

export const sellAction = (data) =>async(dispatch, cb) =>{
    dispatch({
        type: SELL_START
    });

    const token = await secureStore.getItemAsync(TOKEN_NAME);
    try {
        const res = await axios.post(`${SERVER_URL}/transactions/sell`, data, {
            headers: {
                'e-fuel-authtoken': token
            }
        });
        if(res.status === 200){
            dispatch({
                type: SELL_SUCCESS,
                payload: res.data.msg
            });
            ToastAndroid.show(res.data.msg, ToastAndroid.LONG)
            cb(true)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: SELL_ERROR,
                payload: res.data.error
            });
            ToastAndroid.show(res.data.error, ToastAndroid.LONG)
        }else{
            dispatch({
                type: SELL_ERROR,
                payload: 'Veuillez réessayez plus tard'
            });
            ToastAndroid.show('Veuillez réessayez plus tard', ToastAndroid.LONG)
        }
        cb(false)
    }
};

export const rechargeAction = (data) =>async(dispatch, cb=null) =>{
    dispatch({
        type: RECHARGE_START
    });

    const token = await secureStore.getItemAsync(TOKEN_NAME);
    try {
        const res = await axios.post(`${SERVER_URL}/transactions/recharge`, data, {
            headers: {
                'e-fuel-authtoken': token
            }
        });
        if(res.status === 200){
            dispatch({
                type: RECHARGE_SUCCESS,
                payload: res.data.msg
            });
            cb(true);
            ToastAndroid.show(res.data.msg, ToastAndroid.LONG)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: RECHARGE_ERROR,
                payload: res.data.error
            })
            ToastAndroid.show(res.data.error, ToastAndroid.LONG)
        }else{
            dispatch({
                type: RECHARGE_ERROR,
                payload: 'Veuillez réessayez plus tard'
            });
        }
        ToastAndroid.show(res.data.msg, 'Veuillez réessayez plus tard');
        cb(false)
    }
}