import { 
    CONTACT_US_MESSEAGE_LIST_REQUEST, 
    CONTACT_US_MESSEAGE_LIST_FAIL, 
    CONTACT_US_MESSEAGE_LIST_SUCCESS, 
    CONTACT_US_MESSEAGE_DETAILS_SUCCESS, 
    CONTACT_US_MESSEAGE_DETAILS_REQUEST, 
    CONTACT_US_MESSEAGE_DETAILS_FAIL,
    CONTACT_US_MESSEAGE_SAVE_REQUEST,
    CONTACT_US_MESSEAGE_SAVE_SUCCESS,
    CONTACT_US_MESSEAGE_SAVE_FAIL,
    CONTACT_US_MESSEAGE_DELETE_REQUEST,
    CONTACT_US_MESSEAGE_DELETE_SUCCESS,
    CONTACT_US_MESSEAGE_DELETE_FAIL,

 } from '../constants/contactUsMessageConstants';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listContactUsMessages = () => async (dispatch)=>{
    try{
        dispatch({type: CONTACT_US_MESSEAGE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/ContactUsMessage`);
        if (data.status === true) {
            dispatch({ type: CONTACT_US_MESSEAGE_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: CONTACT_US_MESSEAGE_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: CONTACT_US_MESSEAGE_LIST_FAIL, payload: error.message });

    }
};


const detailsContactUsMessage = (id)=> async (dispatch) =>{
    try{
        dispatch({type:CONTACT_US_MESSEAGE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/ContactUsMessage/" + id); 
        dispatch({type:CONTACT_US_MESSEAGE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: CONTACT_US_MESSEAGE_DETAILS_FAIL, payload: error.message });
    }
};

const saveContactUsMessage = (item, id) => async (dispatch) =>{
    try{
        dispatch({type: CONTACT_US_MESSEAGE_SAVE_REQUEST, payload:item })
        if(!id){
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/ContactUsMessage/Create", item)
            if (data.status === true) {
                dispatch({type: CONTACT_US_MESSEAGE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: CONTACT_US_MESSEAGE_SAVE_FAIL, payload: data.message });
            }
        }else{
            console.log('update')
            const { data } = await axiosWithTokenAndMultipartData.put("/ContactUsMessage/Update", item);
            if (data.status === true) {
                dispatch({type: CONTACT_US_MESSEAGE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: CONTACT_US_MESSEAGE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CONTACT_US_MESSEAGE_SAVE_FAIL, payload: error.message });
    }
};

const deleteContactUsMessage = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CONTACT_US_MESSEAGE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/ContactUsMessage/" + id); 
        if (data.status === true) {
            dispatch({type:CONTACT_US_MESSEAGE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: CONTACT_US_MESSEAGE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: CONTACT_US_MESSEAGE_DELETE_FAIL, payload: error.message });
    }
};

export { listContactUsMessages, detailsContactUsMessage, saveContactUsMessage, deleteContactUsMessage }