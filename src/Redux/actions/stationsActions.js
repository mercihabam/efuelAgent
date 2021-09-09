import axios from "axios";
import { GET_CUR_STATION_ERROR, GET_CUR_STATION_START, GET_CUR_STATION_SUCCESS } from "../actionsTypes/stations"
import { getCurrUser } from "./usersActions";
import { SERVER_URL, TOKEN_NAME } from 'env';
import * as SecureStore from 'expo-secure-store';

export const getCurrStation = (stationId) =>async(dispatch) =>{
        dispatch({
            type: GET_CUR_STATION_START
        });

        const token = await SecureStore.getItemAsync(TOKEN_NAME);
        try {
            const res = await axios.get(`${SERVER_URL}/stations/current/${stationId}`, {
                headers: {
                    'e-fuel-authtoken': token
                }
            });
            if(res.status === 200){
                dispatch({
                    type: GET_CUR_STATION_SUCCESS,
                    payload: res.data.data
                })
            }
        } catch (error) {
            const res = error.response;
            if(res && res.status === 401){
                dispatch({
                    type: GET_CUR_STATION_ERROR,
                    payload: res.data.error
                });
            }else if(res && res.status === 404){
                dispatch({
                    type: GET_CUR_STATION_ERROR,
                    payload: res.data.error
                });
                sendNotif('warn', 'Veuillez activez votre station pour y acceder');
            }else{
                dispatch({
                    type: GET_CUR_STATION_ERROR,
                    payload: 'Veuillez réessayer plutard'
                });
            }
        }
}