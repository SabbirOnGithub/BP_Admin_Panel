import { 
    Software_LIST_REQUEST, 
    Software_LIST_FAIL, 
    Software_LIST_SUCCESS, 
    Software_DETAILS_SUCCESS, 
    Software_DETAILS_REQUEST, 
    Software_DETAILS_FAIL,
    Software_SAVE_REQUEST,
    Software_SAVE_SUCCESS,
    Software_SAVE_FAIL,
    Software_DELETE_REQUEST,
    Software_DELETE_SUCCESS,
    Software_DELETE_FAIL,

 } from '../constants/softwareConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listSoftwares = () => async (dispatch)=>{
    try{
        dispatch({type: Software_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/Software`);
        if (data.status === true) {
            dispatch({ type: Software_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: Software_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: Software_LIST_FAIL, payload: error.message });

    }
};


const detailsSoftware = (id)=> async (dispatch) =>{
    try{
        dispatch({type:Software_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/Software/" + id); 
        dispatch({type:Software_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: Software_DETAILS_FAIL, payload: error.message });
    }
};

const saveSoftware = (item) => async (dispatch) =>{
    try{
        dispatch({type: Software_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/Software", item)
            if (data.status === true) {
                dispatch({type: Software_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: Software_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/Software/", item);
            if (data.status === true) {
                dispatch({type: Software_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: Software_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: Software_SAVE_FAIL, payload: error.message });
    }
};

const deleteSoftware = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:Software_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/Software/" + id); 
        if (data.status === true) {
            dispatch({type:Software_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: Software_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: Software_DELETE_FAIL, payload: error.message });
    }
};

export { listSoftwares, detailsSoftware, saveSoftware, deleteSoftware }