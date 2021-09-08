import axios from "axios";
import { sendNotif } from "../../Utils/notif";
import { GET_CLIENTS_ERROR, GET_CLIENTS_START, GET_CLIENTS_SUCCESS } from "../actionsTypes/clients"

export const getClients = (limit, offset, stationId) => async(dispatch) =>{
    dispatch({
        type: GET_CLIENTS_START
    });
    
    if(stationId){
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/clients/${stationId}?limit=${limit}&offset=${offset}`, {
                headers: {
                    'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
                }
            });
        
            if(res.status === 200){
                dispatch({
                    type: GET_CLIENTS_SUCCESS,
                    payload: res.data.data
                })
            }
        } catch (error) {
            const res = error.response;
            if(res){
                dispatch({
                    type: GET_CLIENTS_ERROR,
                    payload: res.data.error
                })
            }else{
                dispatch({
                    type: GET_CLIENTS_ERROR,
                    payload: 'Veuillez réessayer plutard'
                });
                sendNotif('error', 'Veuillez réessayer plutard')
            }
        }
    }else{
        dispatch({
            type: GET_CLIENTS_ERROR,
            payload: 'Veuillez selectionner votre station'
        });
    }
}