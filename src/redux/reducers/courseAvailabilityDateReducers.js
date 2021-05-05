import { 
    COURSE_AVAILABILITY_DATE_SAVE_REQUEST,
    COURSE_AVAILABILITY_DATE_SAVE_SUCCESS,
    COURSE_AVAILABILITY_DATE_SAVE_FAIL,
 } from '../constants/courseAvailabilityDateConstants';


function courseAvailabilityDateSaveReducer(state={courseAvailabilityDate:{}},action){
    switch(action.type){
        case COURSE_AVAILABILITY_DATE_SAVE_REQUEST:
            return { loading:true };
        case COURSE_AVAILABILITY_DATE_SAVE_SUCCESS:
            return { loading:false, success:true, courseAvailabilityDate:action.payload };
        case COURSE_AVAILABILITY_DATE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    courseAvailabilityDateSaveReducer,

 }; 
