import { 
    ROLE_RESOURCE_LIST_REQUEST, 
    ROLE_RESOURCE_LIST_FAIL, 
    ROLE_RESOURCE_LIST_SUCCESS, 
    ROLE_RESOURCE_DETAILS_SUCCESS, 
    ROLE_RESOURCE_DETAILS_REQUEST, 
    ROLE_RESOURCE_DETAILS_FAIL,
    ROLE_RESOURCE_SAVE_REQUEST,
    ROLE_RESOURCE_SAVE_SUCCESS,
    ROLE_RESOURCE_SAVE_FAIL,
    ROLE_RESOURCE_DELETE_REQUEST,
    ROLE_RESOURCE_DELETE_SUCCESS,
    ROLE_RESOURCE_DELETE_FAIL,

 } from '../constants/roleResourceConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL

// all user role resources
const listRoleResources = (item) => async (dispatch)=>{
    // console.log(item)
    if(item){
        try{
            dispatch({type: ROLE_RESOURCE_LIST_REQUEST});
            const {data} = await axiosWithToken.post('/RoleResource/search', item);
            if (data.status === true) {
                dispatch({ type: ROLE_RESOURCE_LIST_SUCCESS, payload: data.data.item1 ? data.data : {} });
            }else{
                dispatch({ type: ROLE_RESOURCE_LIST_FAIL, payload: data?.message });
            }
            // console.log(data.data)
        }
        catch(error){
            dispatch({ type: ROLE_RESOURCE_LIST_FAIL, payload: error.message });
        }

    }else{
        try{
            dispatch({type: ROLE_RESOURCE_LIST_REQUEST});
            const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/RoleResource`);
            if (data.status === true) {
                dispatch({ type: ROLE_RESOURCE_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
            }else{
                dispatch({ type: ROLE_RESOURCE_LIST_FAIL, payload: data.message });
            }
            // console.log(data.data)
        }
        catch(error){
            dispatch({ type: ROLE_RESOURCE_LIST_FAIL, payload: error.message });
        }
    }
    
};

// single user role resources
const detailsRoleResource = (id)=> async (dispatch) =>{
    
    try{
        dispatch({type:ROLE_RESOURCE_DETAILS_REQUEST, payload:[]});
        const { data } = await axiosWithoutToken.get("/RoleResource/GetResourcesByRole/" + id); 
        if (data.status === true) {
            dispatch({type:ROLE_RESOURCE_DETAILS_SUCCESS, payload: data.data ? data.data : [] });
        }
        else{
            dispatch({ type: ROLE_RESOURCE_DETAILS_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: ROLE_RESOURCE_DETAILS_FAIL, payload: error.message });
    }
};

const saveRoleResource = (item) => async (dispatch) =>{
    try{
        dispatch({type: ROLE_RESOURCE_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/RoleResource", item)
            if (data.status === true) {
                dispatch({type: ROLE_RESOURCE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: ROLE_RESOURCE_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/RoleResource/", item);
            if (data.status === true) {
                dispatch({type: ROLE_RESOURCE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: ROLE_RESOURCE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: ROLE_RESOURCE_SAVE_FAIL, payload: error.message });
    }
};

const deleteRoleResource = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:ROLE_RESOURCE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/RoleResource/" + id); 
        if (data.status === true) {
            dispatch({type:ROLE_RESOURCE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: ROLE_RESOURCE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: ROLE_RESOURCE_DELETE_FAIL, payload: error.message });
    }
};

export { listRoleResources, detailsRoleResource, saveRoleResource, deleteRoleResource }