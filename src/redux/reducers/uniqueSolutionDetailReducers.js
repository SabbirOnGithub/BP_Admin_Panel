import { 
    UNIQUE_SOLUTION_DETAIL_LIST_REQUEST, 
    UNIQUE_SOLUTION_DETAIL_LIST_FAIL, 
    UNIQUE_SOLUTION_DETAIL_LIST_SUCCESS,
    UNIQUE_SOLUTION_DETAIL_DETAILS_REQUEST,
    UNIQUE_SOLUTION_DETAIL_DETAILS_SUCCESS,
    UNIQUE_SOLUTION_DETAIL_DETAILS_FAIL,
    UNIQUE_SOLUTION_DETAIL_SAVE_REQUEST,
    UNIQUE_SOLUTION_DETAIL_SAVE_SUCCESS,
    UNIQUE_SOLUTION_DETAIL_SAVE_FAIL,
    UNIQUE_SOLUTION_DETAIL_DELETE_REQUEST,
    UNIQUE_SOLUTION_DETAIL_DELETE_SUCCESS,
    UNIQUE_SOLUTION_DETAIL_DELETE_FAIL, 

 } from '../constants/uniqueSolutionDetailConstants';


function uniqueSolutionDetailListReducer(state={uniqueSolutionDetails:[]},action){
    switch(action.type){
        case UNIQUE_SOLUTION_DETAIL_LIST_REQUEST:
            return { loading:true, uniqueSolutionDetails:[] };
        case UNIQUE_SOLUTION_DETAIL_LIST_SUCCESS:
            return { loading:false, uniqueSolutionDetails:action.payload };
        case UNIQUE_SOLUTION_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function uniqueSolutionDetailDetailsReducer(state={uniqueSolutionDetail:{}},action){
    switch(action.type){
        case UNIQUE_SOLUTION_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case UNIQUE_SOLUTION_DETAIL_DETAILS_SUCCESS:
            return { loading:false, uniqueSolutionDetail:action.payload };
        case UNIQUE_SOLUTION_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function uniqueSolutionDetailSaveReducer(state={uniqueSolutionDetail:{}},action){
    switch(action.type){
        case UNIQUE_SOLUTION_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case UNIQUE_SOLUTION_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, uniqueSolutionDetail:action.payload };
        case UNIQUE_SOLUTION_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function uniqueSolutionDetailDeleteReducer(state={uniqueSolutionDetail:{}},action){
    switch(action.type){
        case UNIQUE_SOLUTION_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case UNIQUE_SOLUTION_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, uniqueSolutionDetail:action.payload };
        case UNIQUE_SOLUTION_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  uniqueSolutionDetailListReducer, uniqueSolutionDetailDetailsReducer, uniqueSolutionDetailSaveReducer, uniqueSolutionDetailDeleteReducer }; 
