import axios from 'axios';
import { SERVER_URL, TOKEN_NAME } from 'env';
import * as secureStore from 'expo-secure-store'
import { GET_SELLED_STOCK_ERROR, GET_SELLED_STOCK_START, GET_SELLED_STOCK_SUCCESS } from '../actionsTypes/stocks';


export const getSelledStocks = (stationId, agentId, date1, date2) =>async(dispatch) =>{
    dispatch({
        type: GET_SELLED_STOCK_START
    })
    const token = await secureStore.getItemAsync(TOKEN_NAME);
    try {
        const res = await axios.get(`${SERVER_URL}/stocks/selled/${agentId}/${stationId}/${date1}/${date2}`, {
            headers: {
                'e-fuel-authtoken': token
            }
        });
        if(res.status === 200){
            dispatch({
                type: GET_SELLED_STOCK_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: GET_SELLED_STOCK_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: GET_SELLED_STOCK_ERROR,
                payload: 'Veuillez réessayer plus tard'
            })
        }
    }
};