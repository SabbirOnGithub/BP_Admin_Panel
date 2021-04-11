import { 
    Software_LIST_REQUEST, 
    Software_LIST_FAIL, 
    Software_LIST_SUCCESS, 
    Software_DETAILS_SUCCESS, 
    Software_DETAILS_REQUEST, 
    Software_DETAILS_FAIL,
    Software_SAVE_REQUEST,
    Software_SAVE_SUCCESS,
    Software_SAVE_FAIL,
    Software_DELETE_REQUEST,
    Software_DELETE_SUCCESS,
    Software_DELETE_FAIL,

 } from '../constants/softwareConstants';


function softwareListReducer(state={softwares:[]},action){
    switch(action.type){
        case Software_LIST_REQUEST:
            return { loading:true, softwares:[] };
        case Software_LIST_SUCCESS:
            return { loading:false, softwares:action.payload };
        case Software_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function softwareDetailsReducer(state={software:{}},action){
    switch(action.type){
        case Software_DETAILS_REQUEST:
            return { loading:true };
        case Software_DETAILS_SUCCESS:
            return { loading:false, software:action.payload };
        case Software_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function softwareSaveReducer(state={software:{}},action){
    switch(action.type){
        case Software_SAVE_REQUEST:
            return { loading:true };
        case Software_SAVE_SUCCESS:
            return { loading:false, success:true, software:action.payload };
        case Software_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function softwareDeleteReducer(state={software:{}},action){
    switch(action.type){
        case Software_DELETE_REQUEST:
            return { loading:true };
        case Software_DELETE_SUCCESS:
            return { loading:false, success:true, software:action.payload };
        case Software_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    softwareListReducer, 
    softwareDetailsReducer,
    softwareSaveReducer,
    softwareDeleteReducer

 }; 
