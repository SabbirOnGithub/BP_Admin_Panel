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


function techStackListReducer(state={techStacks:[]},action){
    switch(action.type){
        case TECH_STACK_LIST_REQUEST:
            return { loading:true, techStacks:[] };
        case TECH_STACK_LIST_SUCCESS:
            return { loading:false, techStacks:action.payload };
        case TECH_STACK_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function techStackDetailsReducer(state={techStack:{}},action){
    switch(action.type){
        case TECH_STACK_DETAILS_REQUEST:
            return { loading:true };
        case TECH_STACK_DETAILS_SUCCESS:
            return { loading:false, techStack:action.payload };
        case TECH_STACK_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function techStackSaveReducer(state={techStack:{}},action){
    switch(action.type){
        case TECH_STACK_SAVE_REQUEST:
            return { loading:true };
        case TECH_STACK_SAVE_SUCCESS:
            return { loading:false, success:true, techStack:action.payload };
        case TECH_STACK_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function techStackDeleteReducer(state={techStack:{}},action){
    switch(action.type){
        case TECH_STACK_DELETE_REQUEST:
            return { loading:true };
        case TECH_STACK_DELETE_SUCCESS:
            return { loading:false, success:true, techStack:action.payload };
        case TECH_STACK_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    techStackListReducer, 
    techStackDetailsReducer,
    techStackSaveReducer,
    techStackDeleteReducer

 }; 
