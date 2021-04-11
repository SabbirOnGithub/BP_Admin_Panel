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


function courseRequirementListReducer(state={courseRequirements:[]},action){
    switch(action.type){
        case COURSE_REQUIREMENT_LIST_REQUEST:
            return { loading:true, courseRequirements:[] };
        case COURSE_REQUIREMENT_LIST_SUCCESS:
            return { loading:false, courseRequirements:action.payload };
        case COURSE_REQUIREMENT_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function courseRequirementDetailsReducer(state={courseRequirement:{}},action){
    switch(action.type){
        case COURSE_REQUIREMENT_DETAILS_REQUEST:
            return { loading:true };
        case COURSE_REQUIREMENT_DETAILS_SUCCESS:
            return { loading:false, courseRequirement:action.payload };
        case COURSE_REQUIREMENT_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function courseRequirementSaveReducer(state={courseRequirement:{}},action){
    switch(action.type){
        case COURSE_REQUIREMENT_SAVE_REQUEST:
            return { loading:true };
        case COURSE_REQUIREMENT_SAVE_SUCCESS:
            return { loading:false, success:true, courseRequirement:action.payload };
        case COURSE_REQUIREMENT_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function courseRequirementDeleteReducer(state={courseRequirement:{}},action){
    switch(action.type){
        case COURSE_REQUIREMENT_DELETE_REQUEST:
            return { loading:true };
        case COURSE_REQUIREMENT_DELETE_SUCCESS:
            return { loading:false, success:true, courseRequirement:action.payload };
        case COURSE_REQUIREMENT_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    courseRequirementListReducer, 
    courseRequirementDetailsReducer,
    courseRequirementSaveReducer,
    courseRequirementDeleteReducer

 }; 
