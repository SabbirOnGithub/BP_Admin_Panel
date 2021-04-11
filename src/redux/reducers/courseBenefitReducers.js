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


function courseBenefitListReducer(state={courseBenefits:[]},action){
    switch(action.type){
        case COURSE_BENEFIT_LIST_REQUEST:
            return { loading:true, courseBenefits:[] };
        case COURSE_BENEFIT_LIST_SUCCESS:
            return { loading:false, courseBenefits:action.payload };
        case COURSE_BENEFIT_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function courseBenefitDetailsReducer(state={courseBenefit:{}},action){
    switch(action.type){
        case COURSE_BENEFIT_DETAILS_REQUEST:
            return { loading:true };
        case COURSE_BENEFIT_DETAILS_SUCCESS:
            return { loading:false, courseBenefit:action.payload };
        case COURSE_BENEFIT_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function courseBenefitSaveReducer(state={courseBenefit:{}},action){
    switch(action.type){
        case COURSE_BENEFIT_SAVE_REQUEST:
            return { loading:true };
        case COURSE_BENEFIT_SAVE_SUCCESS:
            return { loading:false, success:true, courseBenefit:action.payload };
        case COURSE_BENEFIT_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function courseBenefitDeleteReducer(state={courseBenefit:{}},action){
    switch(action.type){
        case COURSE_BENEFIT_DELETE_REQUEST:
            return { loading:true };
        case COURSE_BENEFIT_DELETE_SUCCESS:
            return { loading:false, success:true, courseBenefit:action.payload };
        case COURSE_BENEFIT_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    courseBenefitListReducer, 
    courseBenefitDetailsReducer,
    courseBenefitSaveReducer,
    courseBenefitDeleteReducer

 }; 
