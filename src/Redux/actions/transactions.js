import axios from "axios"
import { GET_TRANSACTIONS_ERROR, GET_TRANSACTIONS_START, GET_TRANSACTIONS_SUCCESS } from "../actionsTypes/transactions"
import { SERVER_URL, TOKEN_NAME } from 'env';
import * as secureStore from 'expo-secure-store'

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
}