import { 
    COURSE_BENEFIT_LIST_REQUEST, 
    COURSE_BENEFIT_LIST_FAIL, 
    COURSE_BENEFIT_LIST_SUCCESS, 
    COURSE_BENEFIT_DETAILS_SUCCESS, 
    COURSE_BENEFIT_DETAILS_REQUEST, 
    COURSE_BENEFIT_DETAILS_FAIL,
    COURSE_BENEFIT_SAVE_REQUEST,
    COURSE_BENEFIT_SAVE_SUCCESS,
    COURSE_BENEFIT_SAVE_FAIL,
    COURSE_BENEFIT_DELETE_REQUEST,
    COURSE_BENEFIT_DELETE_SUCCESS,
    COURSE_BENEFIT_DELETE_FAIL,

 } from '../constants/courseBenefitConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCourseBenefits = () => async (dispatch)=>{
    try{
        dispatch({type: COURSE_BENEFIT_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CourseBenefit`);
        if (data.status === true) {
            dispatch({ type: COURSE_BENEFIT_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: COURSE_BENEFIT_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: COURSE_BENEFIT_LIST_FAIL, payload: error.message });

    }
};


const detailsCourseBenefit = (id)=> async (dispatch) =>{
    try{
        dispatch({type:COURSE_BENEFIT_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CourseBenefit/" + id); 
        dispatch({type:COURSE_BENEFIT_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: COURSE_BENEFIT_DETAILS_FAIL, payload: error.message });
    }
};

const saveCourseBenefit = (item) => async (dispatch) =>{
    try{
        dispatch({type: COURSE_BENEFIT_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/CourseBenefit", item)
            if (data.status === true) {
                dispatch({type: COURSE_BENEFIT_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: COURSE_BENEFIT_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/CourseBenefit/", item);
            if (data.status === true) {
                dispatch({type: COURSE_BENEFIT_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: COURSE_BENEFIT_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: COURSE_BENEFIT_SAVE_FAIL, payload: error.message });
    }
};

const deleteCourseBenefit = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:COURSE_BENEFIT_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CourseBenefit/" + id); 
        if (data.status === true) {
            dispatch({type:COURSE_BENEFIT_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: COURSE_BENEFIT_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: COURSE_BENEFIT_DELETE_FAIL, payload: error.message });
    }
};

export { listCourseBenefits, detailsCourseBenefit, saveCourseBenefit, deleteCourseBenefit }