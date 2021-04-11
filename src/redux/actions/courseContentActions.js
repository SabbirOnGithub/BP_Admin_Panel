import { 
    COURSE_CONTENT_LIST_REQUEST, 
    COURSE_CONTENT_LIST_FAIL, 
    COURSE_CONTENT_LIST_SUCCESS, 
    COURSE_CONTENT_DETAILS_SUCCESS, 
    COURSE_CONTENT_DETAILS_REQUEST, 
    COURSE_CONTENT_DETAILS_FAIL,
    COURSE_CONTENT_SAVE_REQUEST,
    COURSE_CONTENT_SAVE_SUCCESS,
    COURSE_CONTENT_SAVE_FAIL,
    COURSE_CONTENT_DELETE_REQUEST,
    COURSE_CONTENT_DELETE_SUCCESS,
    COURSE_CONTENT_DELETE_FAIL,

 } from '../constants/courseContentConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCourseContents = () => async (dispatch)=>{
    try{
        dispatch({type: COURSE_CONTENT_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CourseContent`);
        if (data.status === true) {
            dispatch({ type: COURSE_CONTENT_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: COURSE_CONTENT_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: COURSE_CONTENT_LIST_FAIL, payload: error.message });

    }
};


const detailsCourseContent = (id)=> async (dispatch) =>{
    try{
        dispatch({type:COURSE_CONTENT_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CourseContent/" + id); 
        dispatch({type:COURSE_CONTENT_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: COURSE_CONTENT_DETAILS_FAIL, payload: error.message });
    }
};

const saveCourseContent = (item) => async (dispatch) =>{
    try{
        dispatch({type: COURSE_CONTENT_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/CourseContent", item)
            if (data.status === true) {
                dispatch({type: COURSE_CONTENT_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: COURSE_CONTENT_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/CourseContent/", item);
            if (data.status === true) {
                dispatch({type: COURSE_CONTENT_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: COURSE_CONTENT_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: COURSE_CONTENT_SAVE_FAIL, payload: error.message });
    }
};

const deleteCourseContent = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:COURSE_CONTENT_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CourseContent/" + id); 
        if (data.status === true) {
            dispatch({type:COURSE_CONTENT_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: COURSE_CONTENT_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: COURSE_CONTENT_DELETE_FAIL, payload: error.message });
    }
};

export { listCourseContents, detailsCourseContent, saveCourseContent, deleteCourseContent }