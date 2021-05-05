import { 
    COURSE_REQUIREMENT_LIST_REQUEST, 
    COURSE_REQUIREMENT_LIST_FAIL, 
    COURSE_REQUIREMENT_LIST_SUCCESS, 
    COURSE_REQUIREMENT_DETAILS_SUCCESS, 
    COURSE_REQUIREMENT_DETAILS_REQUEST, 
    COURSE_REQUIREMENT_DETAILS_FAIL,
    COURSE_REQUIREMENT_SAVE_REQUEST,
    COURSE_REQUIREMENT_SAVE_SUCCESS,
    COURSE_REQUIREMENT_SAVE_FAIL,
    COURSE_REQUIREMENT_DELETE_REQUEST,
    COURSE_REQUIREMENT_DELETE_SUCCESS,
    COURSE_REQUIREMENT_DELETE_FAIL,

 } from '../constants/courseRequirementConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCourseRequirements = () => async (dispatch)=>{
    try{
        dispatch({type: COURSE_REQUIREMENT_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CourseRequirement`);
        if (data.status === true) {
            dispatch({ type: COURSE_REQUIREMENT_LIST_SUCCESS, payload: data.data?.reverse() ? data.data : [] });
        }else{
            dispatch({ type: COURSE_REQUIREMENT_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: COURSE_REQUIREMENT_LIST_FAIL, payload: error.message });

    }
};


const detailsCourseRequirement = (id)=> async (dispatch) =>{
    try{
        dispatch({type:COURSE_REQUIREMENT_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CourseRequirement/" + id); 
        dispatch({type:COURSE_REQUIREMENT_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: COURSE_REQUIREMENT_DETAILS_FAIL, payload: error.message });
    }
};

const saveCourseRequirement = (item) => async (dispatch) =>{
    try{
        dispatch({type: COURSE_REQUIREMENT_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/CourseRequirement", item)
            if (data.status === true) {
                dispatch({type: COURSE_REQUIREMENT_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: COURSE_REQUIREMENT_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/CourseRequirement/", item);
            if (data.status === true) {
                dispatch({type: COURSE_REQUIREMENT_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: COURSE_REQUIREMENT_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: COURSE_REQUIREMENT_SAVE_FAIL, payload: error.message });
    }
};

const deleteCourseRequirement = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:COURSE_REQUIREMENT_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CourseRequirement/" + id); 
        if (data.status === true) {
            dispatch({type:COURSE_REQUIREMENT_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: COURSE_REQUIREMENT_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: COURSE_REQUIREMENT_DELETE_FAIL, payload: error.message });
    }
};

export { listCourseRequirements, detailsCourseRequirement, saveCourseRequirement, deleteCourseRequirement }