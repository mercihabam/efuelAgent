import axios from "axios";
import { sendNotif } from "../../Utils/notif";
import { CREATE_STATION_ERROR, CREATE_STATION_START, CREATE_STATION_SUCCESS, GET_CUR_STATION_ERROR, GET_CUR_STATION_START, GET_CUR_STATION_SUCCESS, UPDATE_STATION_ERROR, UPDATE_STATION_START, UPDATE_STATION_SUCCESS } from "../actionsTypes/stations"
import { getCurrUser } from "./usersActions";

export const createStation = (data) =>async(dispatch) =>{
    dispatch({
        type: CREATE_STATION_START
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/stations/register`, data, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 201){
            dispatch({
                type: CREATE_STATION_SUCCESS,
                payload: res.data
            });
            sendNotif('success', 'Station créée')
            getCurrUser(dispatch);
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: CREATE_STATION_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: CREATE_STATION_ERROR,
                payload: 'Veuillez réessayer plutard'
            })
            sendNotif('error', 'Veuillez réessayer plutard')
        }
    }
};

export const updateStation = (data, id) =>async(dispatch) =>{
    dispatch({
        type: UPDATE_STATION_START
    });

    try {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/stations/update/${id}`, data, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 200){
            dispatch({
                type: UPDATE_STATION_SUCCESS,
                payload: res.data
            });
            sendNotif('success', 'Station modifiée')
            getCurrUser(dispatch);
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: UPDATE_STATION_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: UPDATE_STATION_ERROR,
                payload: 'Veuillez réessayer plutard'
            })
            sendNotif('error', 'Veuillez réessayer plutard')
        }
    }
} 

export const getCurrStation = (stationId) =>async(dispatch, history) =>{
    if(stationId){
        dispatch({
            type: GET_CUR_STATION_START
        });

        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/stations/current/${stationId}`, {
                headers: {
                    'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
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
                sendNotif('warn', res.data.error);
                localStorage.removeItem('stationId');
                history.push('/stations');
            }else if(res && res.status === 404){
                dispatch({
                    type: GET_CUR_STATION_ERROR,
                    payload: res.data.error
                });
                sendNotif('warn', 'Veuillez activez votre station pour y acceder');
                localStorage.removeItem('stationId');
                history.push('/stations');
            }else{
                dispatch({
                    type: GET_CUR_STATION_ERROR,
                    payload: 'Veuillez réessayer plutard'
                });
                sendNotif('error', 'Veuillez réessayer plutard')
                localStorage.removeItem('stationId');
                history.push('/login');
            }
        }
    }else{
        dispatch({
            type: GET_CUR_STATION_ERROR,
            payload: 'Veuillez activez votre station pour y acceder'
        });
        sendNotif('warn', 'Veuillez activez votre station pour y acceder');
        localStorage.removeItem('stationId');
        // history.push('/stations');
    }
}