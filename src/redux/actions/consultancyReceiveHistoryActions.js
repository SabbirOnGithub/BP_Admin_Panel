import { 
    // CONSULTANCY_RECEIVE_HISTORY_LIST_REQUEST, 
    // CONSULTANCY_RECEIVE_HISTORY_LIST_FAIL, 
    // CONSULTANCY_RECEIVE_HISTORY_LIST_SUCCESS, 
    // CONSULTANCY_RECEIVE_HISTORY_DETAILS_SUCCESS, 
    // CONSULTANCY_RECEIVE_HISTORY_DETAILS_REQUEST, 
    // CONSULTANCY_RECEIVE_HISTORY_DETAILS_FAIL,
    CONSULTANCY_RECEIVE_HISTORY_SAVE_REQUEST,
    CONSULTANCY_RECEIVE_HISTORY_SAVE_SUCCESS,
    CONSULTANCY_RECEIVE_HISTORY_SAVE_FAIL,
    CONSULTANCY_RECEIVE_HISTORY_DELETE_REQUEST,
    CONSULTANCY_RECEIVE_HISTORY_DELETE_SUCCESS,
    CONSULTANCY_RECEIVE_HISTORY_DELETE_FAIL,
    CONSULTANCY_RECEIVE_HISTORY_STATUS_LIST_REQUEST, 
    CONSULTANCY_RECEIVE_HISTORY_STATUS_LIST_FAIL, 
    CONSULTANCY_RECEIVE_HISTORY_STATUS_LIST_SUCCESS, 

 } from '../constants/consultancyReceiveHistoryConstants';
import { axiosWithToken,axiosWithoutToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL

// const listConsultancyReceiveHistorys = () => async (dispatch)=>{
//     try{
//         dispatch({type: CONSULTANCY_RECEIVE_HISTORY_LIST_REQUEST});
//         const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/ConsultancyReceiveHistory`);
//         if (data.status === true) {
//             dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
//         }else{
//             dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_LIST_FAIL, payload: data.message });
//         }
//         // console.log(data.data)
//     }
//     catch(error){
//         dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_LIST_FAIL, payload: error.message });

//     }
// };

// const detailsConsultancyReceiveHistory = (id)=> async (dispatch) =>{
//     try{
//         dispatch({type:CONSULTANCY_RECEIVE_HISTORY_DETAILS_REQUEST});
//         const { data } = await axiosWithoutToken.get("/ConsultancyReceiveHistory/" + id); 
//         dispatch({type:CONSULTANCY_RECEIVE_HISTORY_DETAILS_SUCCESS, payload: data });
//     }
//     catch(error){
//         dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_DETAILS_FAIL, payload: error.message });
//     }
// };

const saveConsultancyReceiveHistory = (item) => async (dispatch) =>{
    try{
        dispatch({type: CONSULTANCY_RECEIVE_HISTORY_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/ConsultancyReceiveHistory", item)
            if (data.status === true) {
                dispatch({type: CONSULTANCY_RECEIVE_HISTORY_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/ConsultancyReceiveHistory", item);
            if (data.status === true) {
                dispatch({type: CONSULTANCY_RECEIVE_HISTORY_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_SAVE_FAIL, payload: error.message });
    }
};

const deleteConsultancyReceiveHistory = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CONSULTANCY_RECEIVE_HISTORY_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/ConsultancyReceiveHistory/" + id); 
        if (data.status === true) {
            dispatch({type:CONSULTANCY_RECEIVE_HISTORY_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_DELETE_FAIL, payload: error.message });
    }
};

const listConsultancyReceiveHistoryStatuses = () => async (dispatch)=>{
    try{
        dispatch({type: CONSULTANCY_RECEIVE_HISTORY_STATUS_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/ConsultancyReceiveHistory/StatusList`);
        dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_STATUS_LIST_SUCCESS, payload: data ? data : [] });
        // console.log(data)
    }
    catch(error){
        dispatch({ type: CONSULTANCY_RECEIVE_HISTORY_STATUS_LIST_FAIL, payload: error.message });

    }
};
export { 
    // listConsultancyReceiveHistorys, 
    // detailsConsultancyReceiveHistory, 
    saveConsultancyReceiveHistory, 
    deleteConsultancyReceiveHistory,
    listConsultancyReceiveHistoryStatuses 
}