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
    CTA_CATEGORY_MODEL_LIST_REQUEST,
    CTA_CATEGORY_MODEL_LIST_SUCCESS,
    CTA_CATEGORY_MODEL_LIST_FAIL,
    CTA_CATEGORY_DOCUMENT_SAVE_REQUEST,
    CTA_CATEGORY_DOCUMENT_SAVE_SUCCESS,
    CTA_CATEGORY_DOCUMENT_SAVE_FAIL
 } from '../constants/ctaCategoryConstants';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCtaCategorys = () => async (dispatch)=>{
    try{
        dispatch({type: CTA_CATEGORY_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CtaCategory`);
        if (data.status === true) {
            dispatch({ type: CTA_CATEGORY_LIST_SUCCESS, payload: data.data?.reverse() ? data.data : [] });
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
        const { data } = await axiosWithoutToken.get("/CtaCategory/detail/" + id); 
        dispatch({type:CTA_CATEGORY_DETAILS_SUCCESS, payload: data.data });
        // console.log(data)
    }
    catch(error){
        dispatch({ type: CTA_CATEGORY_DETAILS_FAIL, payload: error.message });
    }
};

const saveCtaCategory = (item) => async (dispatch) =>{
    try{
        dispatch({type: CTA_CATEGORY_SAVE_REQUEST, payload:item })
        if(!item.id){
            console.log('create')
            // console.log(item)
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithToken.post("/CtaCategory", item)
            if (data.status === true) {
                dispatch({type: CTA_CATEGORY_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: CTA_CATEGORY_SAVE_FAIL, payload: data.message });
            }
            // console.log(data)
        }else{
            console.log('update')
            // console.log(item)
            const { data } = await axiosWithToken.put("/CtaCategory", item);
            if (data.status === true) {
                dispatch({type: CTA_CATEGORY_SAVE_SUCCESS, payload: data.id });            
            }else{
                dispatch({ type: CTA_CATEGORY_SAVE_FAIL, payload: data.message });
            }
            // console.log(data)
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


const listCtaCategoryModels = (id) => async (dispatch)=>{
    // id is menu id
    try{
        dispatch({type: CTA_CATEGORY_MODEL_LIST_REQUEST});
        const { data } = await axiosWithoutToken.get("/CtaCategory/CtaCategoryModel/?menuId=" + id); 
        
        dispatch({ type: CTA_CATEGORY_MODEL_LIST_SUCCESS, payload: data });
        // console.log(data)
        return data
    }
    catch(error){
        dispatch({ type: CTA_CATEGORY_MODEL_LIST_FAIL, payload: error.message });

    }
};

const saveCtaCategoryDocument = (item, id) => async (dispatch) =>{
    console.log('doc submit')
    try {
        dispatch({ type: CTA_CATEGORY_DOCUMENT_SAVE_REQUEST, payload: item })

        if (!id) {
            for (var pair of item.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/CtaDocument/Create", item)
            console.log(data)
            if (data.status === true) {
                dispatch({ type: CTA_CATEGORY_DOCUMENT_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: CTA_CATEGORY_DOCUMENT_SAVE_FAIL, payload: data.message });
            }
        } 
        // else {
        //     const { data } = await axiosWithTokenAndMultipartData.put("/HomeConsultationTopic/Update", item);
        //     if (data.status === true) {
        //         dispatch({ type: HOME_CONSULTATION_TOPIC_SAVE_SUCCESS, payload: data });
        //     } else {
        //         dispatch({ type: HOME_CONSULTATION_TOPIC_SAVE_FAIL, payload: data.message });
        //     }
        // }
    } catch (error) {
        console.log(error)
        dispatch({ type: CTA_CATEGORY_DOCUMENT_SAVE_FAIL, payload: error.message });
    }
};

export { listCtaCategorys, detailsCtaCategory, saveCtaCategory, deleteCtaCategory, listCtaCategoryModels, saveCtaCategoryDocument } 

