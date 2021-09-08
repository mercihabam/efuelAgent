import axios from "axios"
import { sendNotif } from "../../Utils/notif";
import { ADD_AGENT_ERROR, ADD_AGENT_START, ADD_AGENT_SUCCESS, DELETE_AGENT_ERROR, DELETE_AGENT_START, DELETE_AGENT_SUCCESS, EDIT_AGENT_ERROR, EDIT_AGENT_START, EDIT_AGENT_SUCCESS, GET_AGENTS_ERROR, GET_AGENTS_START, GET_AGENTS_SUCCESS } from "../actionsTypes/agents"

export const getAgentsAction = (offset, limit, stationId) => async(dispatch) =>{
    dispatch({
        type: GET_AGENTS_START
    })
    try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/agents/get-by-station/${stationId}?limit=${limit}&offset=${offset}`, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 200){
            dispatch({
                type: GET_AGENTS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: GET_AGENTS_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: GET_AGENTS_ERROR,
                payload: 'Veuillez réessayez plutard'
            })
            sendNotif('success', 'Veuillez réessayez plutard')
        }
    }
};

export const addAgent = (data) =>async(dispatch) =>{
    dispatch({
        type: ADD_AGENT_START
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/agents/add`, data, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 201){
            dispatch({
                type: ADD_AGENT_SUCCESS,
                payload: res.data.data
            })
            sendNotif('success', res.data.msg);
            getAgentsAction(0, 100)(dispatch)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: ADD_AGENT_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: ADD_AGENT_ERROR,
                payload: 'Veuillez réessayer plus tard'
            })
        }
    }
}

export const editAgent = (data, agentId) =>async(dispatch) =>{
    dispatch({
        type: EDIT_AGENT_START
    });

    try {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/agents/update/${agentId}`, data, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 200){
            dispatch({
                type: EDIT_AGENT_SUCCESS,
                payload: res.data.data
            })
            sendNotif('success', res.data.msg);
            getAgentsAction(0, 100, data.stationId)(dispatch)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: EDIT_AGENT_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: EDIT_AGENT_ERROR,
                payload: 'Veuillez réessayer plus tard'
            })
        }
    }
};

export const deleteAgent = (agentId, stationId) =>async(dispatch) =>{
    dispatch({
        type: DELETE_AGENT_START
    });

    try {
        const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/agents/delete/${stationId}/${agentId}`, {
            headers: {
                'e-fuel-authtoken': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
            }
        });
        if(res.status === 200){
            dispatch({
                type: DELETE_AGENT_SUCCESS,
                payload: res.data.data
            })
            sendNotif('success', res.data.msg);
            getAgentsAction(0, 100)(dispatch)
        }
    } catch (error) {
        const res = error.response;
        if(res){
            dispatch({
                type: DELETE_AGENT_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: DELETE_AGENT_ERROR,
                payload: 'Veuillez réessayer plus tard'
            })
        }
    }
}