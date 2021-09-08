import axios from 'axios';
import { sendNotif } from '../../Utils/notif';
import { CREATE_STOCK_ERROR, CREATE_STOCK_START, CREATE_STOCK_SUCCESS, EDIT_STOCK_ERROR, EDIT_STOCK_START, EDIT_STOCK_SUCCESS, GET_SELLED_STOCK_ERROR, GET_SELLED_STOCK_START, GET_SELLED_STOCK_SUCCESS, GET_STOCKS_ERROR, GET_STOCKS_START, GET_STOCKS_SUCCESS } from '../actionsTypes/stocks';

export const createStock = (data, stationId) =>async(dispatch) =>{
    dispatch({
        type: CREATE_STOCK_START
    })
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/stocks/new/${stationId}`, data, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 201){
            dispatch({
                type: CREATE_STOCK_SUCCESS,
                payload: res.data.data
            })
            sendNotif('success', res.data.msg);
            getStocks(stationId)(dispatch);
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: CREATE_STOCK_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: CREATE_STOCK_ERROR,
                payload: 'Veuillez réessayer plus tard'
            })
        }
    }
};

export const getStocks = (stationId) =>async(dispatch) =>{
    dispatch({
        type: GET_STOCKS_START
    })
    try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/stocks/stocks/${stationId}`, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 200){
            dispatch({
                type: GET_STOCKS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: GET_STOCKS_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: GET_STOCKS_ERROR,
                payload: 'Veuillez réessayer plus tard'
            })
        }
    }
};


export const updateStock = (data, stockId, stationId) =>async(dispatch) =>{
    dispatch({
        type: EDIT_STOCK_START
    })
    try {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/stocks/${stationId}/${stockId}`, data, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 200){
            dispatch({
                type: EDIT_STOCK_SUCCESS,
                payload: res.data.data
            })
            sendNotif('success', res.data.msg);
            getStocks(stationId)(dispatch);
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: EDIT_STOCK_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: EDIT_STOCK_ERROR,
                payload: 'Veuillez réessayer plus tard'
            })
        }
    }
};


export const getSelledStocks = (stationId, date1, date2) =>async(dispatch) =>{
    dispatch({
        type: GET_SELLED_STOCK_START
    })
    try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/stocks/selled/${stationId}/${date1}/${date2}`, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
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