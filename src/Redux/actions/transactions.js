import axios from "axios"
import { sendNotif } from "../../Utils/notif";
import { GET_TRANSACTIONS_ERROR, GET_TRANSACTIONS_START, GET_TRANSACTIONS_SUCCESS } from "../actionsTypes/transactions"

export const getTransactions = (stationId, offset, limit, type) =>async(dispatch) =>{
    dispatch({
        type: GET_TRANSACTIONS_START
    })

    try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/transactions/from-address/${stationId}?offset=${offset}&limit=${limit}&type=${type}`, {
                            headers: {
                                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
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
            sendNotif('success', 'Veuillez réessayez plus tard')
        }
    }
}