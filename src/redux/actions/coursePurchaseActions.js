import { 
    COURSE_PURCHASE_LIST_REQUEST, 
    COURSE_PURCHASE_LIST_FAIL, 
    COURSE_PURCHASE_LIST_SUCCESS, 
    COURSE_PURCHASE_DETAILS_SUCCESS, 
    COURSE_PURCHASE_DETAILS_REQUEST, 
    COURSE_PURCHASE_DETAILS_FAIL,
    COURSE_PURCHASE_SAVE_REQUEST,
    COURSE_PURCHASE_SAVE_SUCCESS,
    COURSE_PURCHASE_SAVE_FAIL,
    COURSE_PURCHASE_DELETE_REQUEST,
    COURSE_PURCHASE_DELETE_SUCCESS,
    COURSE_PURCHASE_DELETE_FAIL,

 } from '../constants/coursePurchaseConstants';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCoursePurchases = (item) => async (dispatch)=>{
    if(item){
        // console.log(item)
        try{
            dispatch({type: COURSE_PURCHASE_LIST_REQUEST});
            const {data} = await axiosWithToken.post(`/CoursePurchase/search`, item);
            if (data.status === true) {
                dispatch({ type: COURSE_PURCHASE_LIST_SUCCESS, payload: data.data.item1 ? data.data : [] });
            }else{
                dispatch({ type: COURSE_PURCHASE_LIST_FAIL, payload: data.message });
            }
            // console.log(data.data)
        }
        catch(error){
            dispatch({ type: COURSE_PURCHASE_LIST_FAIL, payload: error.message });
        }

    }else{
        try{
            dispatch({type: COURSE_PURCHASE_LIST_REQUEST});
            const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CoursePurchase`);
            if (data.status === true) {
                dispatch({ type: COURSE_PURCHASE_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
            }else{
                dispatch({ type: COURSE_PURCHASE_LIST_FAIL, payload: data.message });
            }
            // console.log(data.data)
        }
        catch(error){
            dispatch({ type: COURSE_PURCHASE_LIST_FAIL, payload: error.message });
        }
    }
  
};


const detailsCoursePurchase = (id)=> async (dispatch) =>{
    // console.log(id)
    try{
        dispatch({type:COURSE_PURCHASE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CoursePurchase/detail/" + id); 
        if(data.status===true){
            dispatch({type:COURSE_PURCHASE_DETAILS_SUCCESS, payload: data.data ? data.data : {}});
        }
        // console.log(data)

        return data
    }
    catch(error){
        dispatch({ type: COURSE_PURCHASE_DETAILS_FAIL, payload: error.message });
    }
};

const saveCoursePurchase = (item, id) => async (dispatch) =>{
    try{
        dispatch({type: COURSE_PURCHASE_SAVE_REQUEST, payload:item })
        if(!id){
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/CoursePurchase/Create", item)
            if (data.status === true) {
                dispatch({type: COURSE_PURCHASE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: COURSE_PURCHASE_SAVE_FAIL, payload: data.message });
            }
        }else{
            console.log('update')
            const { data } = await axiosWithTokenAndMultipartData.put("/CoursePurchase/Update", item);
            if (data.status === true) {
                dispatch({type: COURSE_PURCHASE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: COURSE_PURCHASE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: COURSE_PURCHASE_SAVE_FAIL, payload: error.message });
    }
};

const deleteCoursePurchase = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:COURSE_PURCHASE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CoursePurchase/" + id); 
        if (data.status === true) {
            dispatch({type:COURSE_PURCHASE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: COURSE_PURCHASE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: COURSE_PURCHASE_DELETE_FAIL, payload: error.message });
    }
};

export { listCoursePurchases, detailsCoursePurchase, saveCoursePurchase, deleteCoursePurchase }