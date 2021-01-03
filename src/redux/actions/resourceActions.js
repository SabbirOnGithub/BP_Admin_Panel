import { 
    RESOURCE_LIST_REQUEST, 
    RESOURCE_LIST_FAIL, 
    RESOURCE_LIST_SUCCESS, 
    RESOURCE_DETAILS_SUCCESS, 
    RESOURCE_DETAILS_REQUEST, 
    RESOURCE_DETAILS_FAIL,
    RESOURCE_SAVE_REQUEST,
    RESOURCE_SAVE_SUCCESS,
    RESOURCE_SAVE_FAIL,
    RESOURCE_DELETE_REQUEST,
    RESOURCE_DELETE_SUCCESS,
    RESOURCE_DELETE_FAIL,

 } from '../constants/resourceConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listResources = () => async (dispatch)=>{
    try{
        dispatch({type: RESOURCE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/Resource`);
        if (data.status === true) {
            dispatch({ type: RESOURCE_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: RESOURCE_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: RESOURCE_LIST_FAIL, payload: error.message });

    }
};


const detailsResource = (id)=> async (dispatch) =>{
    try{
        dispatch({type:RESOURCE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/Resource/" + id); 
        dispatch({type:RESOURCE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: RESOURCE_DETAILS_FAIL, payload: error.message });
    }
};

const saveResource = (item) => async (dispatch) =>{
    try{
        dispatch({type: RESOURCE_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithToken.post("/Resource", item)
            if (data.status === true) {
                dispatch({type: RESOURCE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: RESOURCE_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/Resource", item);
            if (data.status === true) {
                dispatch({type: RESOURCE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: RESOURCE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: RESOURCE_SAVE_FAIL, payload: error.message });
    }
};

const deleteResource = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:RESOURCE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/Resource/" + id); 
        if (data.status === true) {
            dispatch({type:RESOURCE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: RESOURCE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: RESOURCE_DELETE_FAIL, payload: error.message });
    }
};

export { listResources, detailsResource, saveResource, deleteResource }