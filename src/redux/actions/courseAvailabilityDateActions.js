import { 
    COURSE_AVAILABILITY_DATE_SAVE_REQUEST,
    COURSE_AVAILABILITY_DATE_SAVE_SUCCESS,
    COURSE_AVAILABILITY_DATE_SAVE_FAIL,

 } from '../constants/courseAvailabilityDateConstants';
import { axiosWithToken } from '../../helpers/axios';

// import {config} from "../../config";

// const BASE_API_URL = config.BASE_API_URL



const saveCourseAvailabilityDate = (item) => async (dispatch) =>{
    console.log(item)
    try{
        dispatch({type: COURSE_AVAILABILITY_DATE_SAVE_REQUEST, payload:item })
        if(!item.id){
            // console.log('create')
            // //eslint-disable-next-line
            // const formatData = delete item.id;
            // const { data } = await axiosWithTokenAndMultipartData.post("/CourseAvailabilityDate/Create", item)
            // if (data.status === true) {
            //     dispatch({type: COURSE_AVAILABILITY_DATE_SAVE_SUCCESS, payload: data });
            // }else{
            //     dispatch({ type: COURSE_AVAILABILITY_DATE_SAVE_FAIL, payload: data.message });
            // }
        }
        else{
            console.log('update')
            const { data } = await axiosWithToken.put("/CourseAvailabilityDate", item);
            if (data.status === true) {
                dispatch({type: COURSE_AVAILABILITY_DATE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: COURSE_AVAILABILITY_DATE_SAVE_FAIL, payload: data.message });
            }

            console.log(data)
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: COURSE_AVAILABILITY_DATE_SAVE_FAIL, payload: error.message });
    }
};



export {saveCourseAvailabilityDate }