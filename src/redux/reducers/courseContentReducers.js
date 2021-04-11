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


function courseContentListReducer(state={courseContents:[]},action){
    switch(action.type){
        case COURSE_CONTENT_LIST_REQUEST:
            return { loading:true, courseContents:[] };
        case COURSE_CONTENT_LIST_SUCCESS:
            return { loading:false, courseContents:action.payload };
        case COURSE_CONTENT_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function courseContentDetailsReducer(state={courseContent:{}},action){
    switch(action.type){
        case COURSE_CONTENT_DETAILS_REQUEST:
            return { loading:true };
        case COURSE_CONTENT_DETAILS_SUCCESS:
            return { loading:false, courseContent:action.payload };
        case COURSE_CONTENT_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function courseContentSaveReducer(state={courseContent:{}},action){
    switch(action.type){
        case COURSE_CONTENT_SAVE_REQUEST:
            return { loading:true };
        case COURSE_CONTENT_SAVE_SUCCESS:
            return { loading:false, success:true, courseContent:action.payload };
        case COURSE_CONTENT_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function courseContentDeleteReducer(state={courseContent:{}},action){
    switch(action.type){
        case COURSE_CONTENT_DELETE_REQUEST:
            return { loading:true };
        case COURSE_CONTENT_DELETE_SUCCESS:
            return { loading:false, success:true, courseContent:action.payload };
        case COURSE_CONTENT_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    courseContentListReducer, 
    courseContentDetailsReducer,
    courseContentSaveReducer,
    courseContentDeleteReducer

 }; 
