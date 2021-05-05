import { 
    CONSULTING_TYPE_LIST_REQUEST, 
    CONSULTING_TYPE_LIST_FAIL, 
    CONSULTING_TYPE_LIST_SUCCESS, 
    CONSULTING_TYPE_DETAILS_SUCCESS, 
    CONSULTING_TYPE_DETAILS_REQUEST, 
    CONSULTING_TYPE_DETAILS_FAIL,
    CONSULTING_TYPE_SAVE_REQUEST,
    CONSULTING_TYPE_SAVE_SUCCESS,
    CONSULTING_TYPE_SAVE_FAIL,
    CONSULTING_TYPE_DELETE_REQUEST,
    CONSULTING_TYPE_DELETE_SUCCESS,
    CONSULTING_TYPE_DELETE_FAIL,

 } from '../constants/consultingTypeConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listConsultingTypes = () => async (dispatch)=>{
    try{
        dispatch({type: CONSULTING_TYPE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/ConsultingType`);
        if (data.status === true) {
            dispatch({ type: CONSULTING_TYPE_LIST_SUCCESS, payload: data.data?.reverse() ? data.data : [] });
        }else{
            dispatch({ type: CONSULTING_TYPE_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: CONSULTING_TYPE_LIST_FAIL, payload: error.message });

    }
};


const detailsConsultingType = (id)=> async (dispatch) =>{
    try{
        dispatch({type:CONSULTING_TYPE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/ConsultingType/" + id); 
        dispatch({type:CONSULTING_TYPE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: CONSULTING_TYPE_DETAILS_FAIL, payload: error.message });
    }
};

const saveConsultingType = (item) => async (dispatch) =>{
    try{
        dispatch({type: CONSULTING_TYPE_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/ConsultingType", item)
            if (data.status === true) {
                dispatch({type: CONSULTING_TYPE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: CONSULTING_TYPE_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/ConsultingType/", item);
            if (data.status === true) {
                dispatch({type: CONSULTING_TYPE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: CONSULTING_TYPE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CONSULTING_TYPE_SAVE_FAIL, payload: error.message });
    }
};

const deleteConsultingType = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CONSULTING_TYPE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/ConsultingType/" + id); 
        if (data.status === true) {
            dispatch({type:CONSULTING_TYPE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: CONSULTING_TYPE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: CONSULTING_TYPE_DELETE_FAIL, payload: error.message });
    }
};

export { listConsultingTypes, detailsConsultingType, saveConsultingType, deleteConsultingType }