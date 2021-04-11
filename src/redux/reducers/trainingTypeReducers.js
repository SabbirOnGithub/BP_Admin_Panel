import { 
    TRAINING_TYPE_LIST_REQUEST, 
    TRAINING_TYPE_LIST_FAIL, 
    TRAINING_TYPE_LIST_SUCCESS, 
    TRAINING_TYPE_DETAILS_SUCCESS, 
    TRAINING_TYPE_DETAILS_REQUEST, 
    TRAINING_TYPE_DETAILS_FAIL,
    TRAINING_TYPE_SAVE_REQUEST,
    TRAINING_TYPE_SAVE_SUCCESS,
    TRAINING_TYPE_SAVE_FAIL,
    TRAINING_TYPE_DELETE_REQUEST,
    TRAINING_TYPE_DELETE_SUCCESS,
    TRAINING_TYPE_DELETE_FAIL,

 } from '../constants/trainingTypeConstants';


function trainingTypeListReducer(state={trainingTypes:[]},action){
    switch(action.type){
        case TRAINING_TYPE_LIST_REQUEST:
            return { loading:true, trainingTypes:[] };
        case TRAINING_TYPE_LIST_SUCCESS:
            return { loading:false, trainingTypes:action.payload };
        case TRAINING_TYPE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function trainingTypeDetailsReducer(state={trainingType:{}},action){
    switch(action.type){
        case TRAINING_TYPE_DETAILS_REQUEST:
            return { loading:true };
        case TRAINING_TYPE_DETAILS_SUCCESS:
            return { loading:false, trainingType:action.payload };
        case TRAINING_TYPE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function trainingTypeSaveReducer(state={trainingType:{}},action){
    switch(action.type){
        case TRAINING_TYPE_SAVE_REQUEST:
            return { loading:true };
        case TRAINING_TYPE_SAVE_SUCCESS:
            return { loading:false, success:true, trainingType:action.payload };
        case TRAINING_TYPE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function trainingTypeDeleteReducer(state={trainingType:{}},action){
    switch(action.type){
        case TRAINING_TYPE_DELETE_REQUEST:
            return { loading:true };
        case TRAINING_TYPE_DELETE_SUCCESS:
            return { loading:false, success:true, trainingType:action.payload };
        case TRAINING_TYPE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    trainingTypeListReducer, 
    trainingTypeDetailsReducer,
    trainingTypeSaveReducer,
    trainingTypeDeleteReducer

 }; 
