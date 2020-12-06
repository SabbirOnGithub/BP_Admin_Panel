import { 
    TRAINING_DETAIL_LIST_REQUEST, 
    TRAINING_DETAIL_LIST_FAIL, 
    TRAINING_DETAIL_LIST_SUCCESS,
    TRAINING_DETAIL_DETAILS_REQUEST,
    TRAINING_DETAIL_DETAILS_SUCCESS,
    TRAINING_DETAIL_DETAILS_FAIL,
    TRAINING_DETAIL_SAVE_REQUEST,
    TRAINING_DETAIL_SAVE_SUCCESS,
    TRAINING_DETAIL_SAVE_FAIL,
    TRAINING_DETAIL_DELETE_REQUEST,
    TRAINING_DETAIL_DELETE_SUCCESS,
    TRAINING_DETAIL_DELETE_FAIL, 

 } from '../constants/trainingDetailConstants';


function trainingDetailListReducer(state={trainingDetails:[]},action){
    switch(action.type){
        case TRAINING_DETAIL_LIST_REQUEST:
            return { loading:true, trainingDetails:[] };
        case TRAINING_DETAIL_LIST_SUCCESS:
            return { loading:false, trainingDetails:action.payload };
        case TRAINING_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function trainingDetailDetailsReducer(state={trainingDetail:{}},action){
    switch(action.type){
        case TRAINING_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case TRAINING_DETAIL_DETAILS_SUCCESS:
            return { loading:false, trainingDetail:action.payload };
        case TRAINING_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function trainingDetailSaveReducer(state={trainingDetail:{}},action){
    switch(action.type){
        case TRAINING_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case TRAINING_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, trainingDetail:action.payload };
        case TRAINING_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function trainingDetailDeleteReducer(state={trainingDetail:{}},action){
    switch(action.type){
        case TRAINING_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case TRAINING_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, trainingDetail:action.payload };
        case TRAINING_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  trainingDetailListReducer, trainingDetailDetailsReducer, trainingDetailSaveReducer, trainingDetailDeleteReducer }; 
