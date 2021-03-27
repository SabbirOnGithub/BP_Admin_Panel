import { 
    CTA_HOUR_LIST_REQUEST, 
    CTA_HOUR_LIST_FAIL, 
    CTA_HOUR_LIST_SUCCESS, 
    CTA_HOUR_DETAILS_SUCCESS, 
    CTA_HOUR_DETAILS_REQUEST, 
    CTA_HOUR_DETAILS_FAIL,
    CTA_HOUR_SAVE_REQUEST,
    CTA_HOUR_SAVE_SUCCESS,
    CTA_HOUR_SAVE_FAIL,
    CTA_HOUR_DELETE_REQUEST,
    CTA_HOUR_DELETE_SUCCESS,
    CTA_HOUR_DELETE_FAIL,

 } from '../constants/ctaHourConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCtaHours = () => async (dispatch)=>{
    try{
        dispatch({type: CTA_HOUR_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CtaHour`);
        if (data.status === true) {
            dispatch({ type: CTA_HOUR_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: CTA_HOUR_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: CTA_HOUR_LIST_FAIL, payload: error.message });

    }
};


const detailsCtaHour = (id)=> async (dispatch) =>{
    try{
        dispatch({type:CTA_HOUR_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CtaHour/" + id); 
        dispatch({type:CTA_HOUR_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: CTA_HOUR_DETAILS_FAIL, payload: error.message });
    }
};

const saveCtaHour = (item) => async (dispatch) =>{
    try{
        dispatch({type: CTA_HOUR_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/CtaHour", item)
            if (data.status === true) {
                dispatch({type: CTA_HOUR_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: CTA_HOUR_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/CtaHour/", item);
            if (data.status === true) {
                dispatch({type: CTA_HOUR_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: CTA_HOUR_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CTA_HOUR_SAVE_FAIL, payload: error.message });
    }
};

const deleteCtaHour = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CTA_HOUR_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CtaHour/" + id); 
        if (data.status === true) {
            dispatch({type:CTA_HOUR_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: CTA_HOUR_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: CTA_HOUR_DELETE_FAIL, payload: error.message });
    }
};

export { listCtaHours, detailsCtaHour, saveCtaHour, deleteCtaHour }