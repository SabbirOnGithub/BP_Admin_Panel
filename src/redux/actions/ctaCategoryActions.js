import { 
    CTA_CATEGORY_LIST_REQUEST, 
    CTA_CATEGORY_LIST_FAIL, 
    CTA_CATEGORY_LIST_SUCCESS, 
    CTA_CATEGORY_DETAILS_SUCCESS, 
    CTA_CATEGORY_DETAILS_REQUEST, 
    CTA_CATEGORY_DETAILS_FAIL,
    CTA_CATEGORY_SAVE_REQUEST,
    CTA_CATEGORY_SAVE_SUCCESS,
    CTA_CATEGORY_SAVE_FAIL,
    CTA_CATEGORY_DELETE_REQUEST,
    CTA_CATEGORY_DELETE_SUCCESS,
    CTA_CATEGORY_DELETE_FAIL,

 } from '../constants/ctaCategoryConstants';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCtaCategorys = () => async (dispatch)=>{
    try{
        dispatch({type: CTA_CATEGORY_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CtaCategory`);
        if (data.status === true) {
            dispatch({ type: CTA_CATEGORY_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: CTA_CATEGORY_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: CTA_CATEGORY_LIST_FAIL, payload: error.message });

    }
};


const detailsCtaCategory = (id)=> async (dispatch) =>{
    try{
        dispatch({type:CTA_CATEGORY_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CtaCategory/" + id); 
        dispatch({type:CTA_CATEGORY_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: CTA_CATEGORY_DETAILS_FAIL, payload: error.message });
    }
};

const saveCtaCategory = (item, id) => async (dispatch) =>{
    try{
        dispatch({type: CTA_CATEGORY_SAVE_REQUEST, payload:item })
        if(!id){
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/CtaCategory/Create", item)
            if (data.status === true) {
                dispatch({type: CTA_CATEGORY_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: CTA_CATEGORY_SAVE_FAIL, payload: data.message });
            }
        }else{
            console.log('update')
            const { data } = await axiosWithTokenAndMultipartData.put("/CtaCategory/Update", item);
            if (data.status === true) {
                dispatch({type: CTA_CATEGORY_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: CTA_CATEGORY_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CTA_CATEGORY_SAVE_FAIL, payload: error.message });
    }
};

const deleteCtaCategory = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CTA_CATEGORY_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CtaCategory/" + id); 
        if (data.status === true) {
            dispatch({type:CTA_CATEGORY_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: CTA_CATEGORY_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: CTA_CATEGORY_DELETE_FAIL, payload: error.message });
    }
};

export { listCtaCategorys, detailsCtaCategory, saveCtaCategory, deleteCtaCategory }