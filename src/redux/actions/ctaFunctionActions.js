import { 
    CTA_FUNCTION_LIST_REQUEST, 
    CTA_FUNCTION_LIST_FAIL, 
    CTA_FUNCTION_LIST_SUCCESS, 
    CTA_FUNCTION_DETAILS_SUCCESS, 
    CTA_FUNCTION_DETAILS_REQUEST, 
    CTA_FUNCTION_DETAILS_FAIL,
    CTA_FUNCTION_SAVE_REQUEST,
    CTA_FUNCTION_SAVE_SUCCESS,
    CTA_FUNCTION_SAVE_FAIL,
    CTA_FUNCTION_MODEL_LIST_REQUEST,
    CTA_FUNCTION_MODEL_LIST_SUCCESS,
    CTA_FUNCTION_MODEL_LIST_FAIL,
    CTA_FUNCTION_DOCUMENT_LIST_REQUEST,
    CTA_FUNCTION_DOCUMENT_LIST_SUCCESS,
    CTA_FUNCTION_DOCUMENT_LIST_FAIL,
    CTA_FUNCTION_DOCUMENT_SAVE_REQUEST,
    CTA_FUNCTION_DOCUMENT_SAVE_SUCCESS,
    CTA_FUNCTION_DOCUMENT_SAVE_FAIL,
    CTA_FUNCTION_DOCUMENT_DELETE_REQUEST,
    CTA_FUNCTION_DOCUMENT_DELETE_SUCCESS,
    CTA_FUNCTION_DOCUMENT_DELETE_FAIL,
 } from '../constants/ctaFunctionConstants';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCtaFunctions = (item) => async (dispatch)=>{
    if(item){
        // console.log({item})
        // with serverside paginations
        try{
            dispatch({type: CTA_FUNCTION_LIST_REQUEST});
            const {data} = await axiosWithToken.post('/CtaFunction/search', item);
            console.log(data)
    
            if (data.status === true) {
                dispatch({ type: CTA_FUNCTION_LIST_SUCCESS, payload: data.data.item1 ? data.data : {} });
            }else{
                dispatch({ type: CTA_FUNCTION_LIST_FAIL, payload: data?.message });
            }
        }
        catch(error){
            dispatch({ type: CTA_FUNCTION_LIST_FAIL, payload: error.message });
        }
    }else{
            // withOut serverside paginations
            try{
                dispatch({type: CTA_FUNCTION_LIST_REQUEST});
                const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CtaFunction`);
                if (data.status === true) {
                    dispatch({ type: CTA_FUNCTION_LIST_SUCCESS, payload: data.data?.reverse() ? data.data : [] });
                }else{
                    dispatch({ type: CTA_FUNCTION_LIST_FAIL, payload: data.message });
                }
                // console.log(data.data)
            }
            catch(error){
                dispatch({ type: CTA_FUNCTION_LIST_FAIL, payload: error.message });
            }
    }
    
};

const detailsCtaFunction = (id)=> async (dispatch) =>{
    try{
        if(id){
            dispatch({type:CTA_FUNCTION_DETAILS_REQUEST});
            const { data } = await axiosWithoutToken.get("/CtaFunction/detail/" + id); 
            dispatch({type:CTA_FUNCTION_DETAILS_SUCCESS, payload: data.data });
            // console.log({data})
        }else{
            console.log('id not found')
        }
        
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: CTA_FUNCTION_DETAILS_FAIL, payload: error.message });
    }
};

const saveCtaFunction = (item) => async (dispatch) =>{
    console.log(item)
    try{
        dispatch({type: CTA_FUNCTION_SAVE_REQUEST, payload:item })
        if(!item.id){
            // console.log('create')
            // console.log(item)
            // for (var value of item.values()) {
            //     console.log(value);
            // }
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithToken.post("/CtaFunction", item)
            if (data.status === true) {
                dispatch({type: CTA_FUNCTION_SAVE_SUCCESS, payload: data })
                
                // console.log(data)
            }else{
                dispatch({ type: CTA_FUNCTION_SAVE_FAIL, payload: data.message })
            }
            return data
        }else{
            console.log('update')
            console.log(item)
            const { data } = await axiosWithToken.put("/CtaFunction", item);
            if (data.status === true) {
                dispatch({type: CTA_FUNCTION_SAVE_SUCCESS, payload: data.id });  
                return data
            }else{
                dispatch({ type: CTA_FUNCTION_SAVE_FAIL, payload: data.message });
            }
            // console.log(data)
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CTA_FUNCTION_SAVE_FAIL, payload: error.message });
    }
};

const listCtaFunctionModels = () => async (dispatch)=>{
    // id is menu id
    try{
        dispatch({type: CTA_FUNCTION_MODEL_LIST_REQUEST});
        const { data } = await axiosWithoutToken.get('/CtaFunction/CtaFunctionModel'); 
        
        dispatch({ type: CTA_FUNCTION_MODEL_LIST_SUCCESS, payload: data });
        // console.log(data)
    }
    catch(error){
        dispatch({ type: CTA_FUNCTION_MODEL_LIST_FAIL, payload: error.message });

    }
};

const listCtaFunctionDocuments = (id) => async (dispatch)=>{
    try{
        // console.log(id)
        dispatch({type: CTA_FUNCTION_DOCUMENT_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CtaDocument/GetCtaFunctionDocuments/${id}`);
        if (data.status === true) {
            dispatch({ type: CTA_FUNCTION_DOCUMENT_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: CTA_FUNCTION_DOCUMENT_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: CTA_FUNCTION_DOCUMENT_LIST_FAIL, payload: error.message });

    }
};

const saveCtaFunctionDocument = (item, id) => async (dispatch) =>{
    // console.log(item)
    try {
        dispatch({ type: CTA_FUNCTION_DOCUMENT_SAVE_REQUEST, payload: item })

        if (!id) {
            // for (var pair of item.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]); 
            // }
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/CtaDocument/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: CTA_FUNCTION_DOCUMENT_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: CTA_FUNCTION_DOCUMENT_SAVE_FAIL, payload: data.message });
            }

            return data;
        } 
    } catch (error) {
        console.log(error)
        dispatch({ type: CTA_FUNCTION_DOCUMENT_SAVE_FAIL, payload: error.message });
    }
};

const deleteCtaFunctionDocument = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CTA_FUNCTION_DOCUMENT_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CtaDocument/DeleteCtaDocument/" + id); 
        if (data.status === true) {
            dispatch({type:CTA_FUNCTION_DOCUMENT_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: CTA_FUNCTION_DOCUMENT_DELETE_FAIL, payload: data.message });
        }
        console.log(data)
    }
    catch(error){
        dispatch({ type: CTA_FUNCTION_DOCUMENT_DELETE_FAIL, payload: error.message });
    }
};

export { 
    listCtaFunctions, 
    detailsCtaFunction, 
    saveCtaFunction, 
    listCtaFunctionModels, 
    listCtaFunctionDocuments, 
    saveCtaFunctionDocument,
    deleteCtaFunctionDocument 
}