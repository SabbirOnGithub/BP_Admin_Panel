import { 
    TECH_STACK_LIST_REQUEST, 
    TECH_STACK_LIST_FAIL, 
    TECH_STACK_LIST_SUCCESS, 
    TECH_STACK_DETAILS_SUCCESS, 
    TECH_STACK_DETAILS_REQUEST, 
    TECH_STACK_DETAILS_FAIL,
    TECH_STACK_SAVE_REQUEST,
    TECH_STACK_SAVE_SUCCESS,
    TECH_STACK_SAVE_FAIL,
    TECH_STACK_DELETE_REQUEST,
    TECH_STACK_DELETE_SUCCESS,
    TECH_STACK_DELETE_FAIL,

 } from '../constants/techStackConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listTechStacks = () => async (dispatch)=>{
    try{
        dispatch({type: TECH_STACK_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/TechStack`);
        if (data.status === true) {
            dispatch({ type: TECH_STACK_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: TECH_STACK_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: TECH_STACK_LIST_FAIL, payload: error.message });

    }
};


const detailsTechStack = (id)=> async (dispatch) =>{
    try{
        dispatch({type:TECH_STACK_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/TechStack/" + id); 
        dispatch({type:TECH_STACK_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TECH_STACK_DETAILS_FAIL, payload: error.message });
    }
};

const saveTechStack = (item) => async (dispatch) =>{
    try{
        dispatch({type: TECH_STACK_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/TechStack", item)
            if (data.status === true) {
                dispatch({type: TECH_STACK_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: TECH_STACK_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/TechStack/", item);
            if (data.status === true) {
                dispatch({type: TECH_STACK_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: TECH_STACK_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TECH_STACK_SAVE_FAIL, payload: error.message });
    }
};

const deleteTechStack = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:TECH_STACK_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/TechStack/" + id); 
        if (data.status === true) {
            dispatch({type:TECH_STACK_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: TECH_STACK_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: TECH_STACK_DELETE_FAIL, payload: error.message });
    }
};

export { listTechStacks, detailsTechStack, saveTechStack, deleteTechStack }