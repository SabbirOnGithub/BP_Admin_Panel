import { 
    CONSULTANCY_ASSIGNMENT_LIST_REQUEST, 
    CONSULTANCY_ASSIGNMENT_LIST_FAIL, 
    CONSULTANCY_ASSIGNMENT_LIST_SUCCESS, 
    CONSULTANCY_ASSIGNMENT_DETAILS_SUCCESS, 
    CONSULTANCY_ASSIGNMENT_DETAILS_REQUEST, 
    CONSULTANCY_ASSIGNMENT_DETAILS_FAIL,
    CONSULTANCY_ASSIGNMENT_SAVE_REQUEST,
    CONSULTANCY_ASSIGNMENT_SAVE_SUCCESS,
    CONSULTANCY_ASSIGNMENT_SAVE_FAIL,
    CONSULTANCY_ASSIGNMENT_DELETE_REQUEST,
    CONSULTANCY_ASSIGNMENT_DELETE_SUCCESS,
    CONSULTANCY_ASSIGNMENT_DELETE_FAIL,

 } from '../constants/consultancyAssignmentConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listConsultancyAssignments = () => async (dispatch)=>{
    try{
        dispatch({type: CONSULTANCY_ASSIGNMENT_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/ConsultancyAssignment`);
        if (data.status === true) {
            dispatch({ type: CONSULTANCY_ASSIGNMENT_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: CONSULTANCY_ASSIGNMENT_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: CONSULTANCY_ASSIGNMENT_LIST_FAIL, payload: error.message });

    }
};


const detailsConsultancyAssignment = (id)=> async (dispatch) =>{
    try{
        dispatch({type:CONSULTANCY_ASSIGNMENT_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/ConsultancyAssignment/" + id); 
        dispatch({type:CONSULTANCY_ASSIGNMENT_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: CONSULTANCY_ASSIGNMENT_DETAILS_FAIL, payload: error.message });
    }
};

const saveConsultancyAssignment = (item) => async (dispatch) =>{
    try{
        dispatch({type: CONSULTANCY_ASSIGNMENT_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/ConsultancyAssignment", item)
            if (data.status === true) {
                dispatch({type: CONSULTANCY_ASSIGNMENT_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: CONSULTANCY_ASSIGNMENT_SAVE_FAIL, payload: data.message });
            }
            // console.log(data)
            return data
        }else{
            const { data } = await axiosWithToken.put("/ConsultancyAssignment/", item);
            if (data.status === true) {
                dispatch({type: CONSULTANCY_ASSIGNMENT_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: CONSULTANCY_ASSIGNMENT_SAVE_FAIL, payload: data.message });
            }
            return data
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CONSULTANCY_ASSIGNMENT_SAVE_FAIL, payload: error.message });
    }
};

const deleteConsultancyAssignment = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CONSULTANCY_ASSIGNMENT_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/ConsultancyAssignment/" + id); 
        if (data.status === true) {
            dispatch({type:CONSULTANCY_ASSIGNMENT_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: CONSULTANCY_ASSIGNMENT_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: CONSULTANCY_ASSIGNMENT_DELETE_FAIL, payload: error.message });
    }
};

export { listConsultancyAssignments, detailsConsultancyAssignment, saveConsultancyAssignment, deleteConsultancyAssignment }