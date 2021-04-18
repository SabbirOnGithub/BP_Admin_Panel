import { 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_REQUEST, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_FAIL, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_SUCCESS, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_SUCCESS, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_REQUEST, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_FAIL,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_REQUEST,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_SUCCESS,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_FAIL,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_REQUEST,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_SUCCESS,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_FAIL,

 } from '../constants/softwareTrainingTypeAndLengthConstants';


function softwareTrainingTypeAndLengthListReducer(state={softwareTrainingTypeAndLengths:[]},action){
    switch(action.type){
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_REQUEST:
            return { loading:true, softwareTrainingTypeAndLengths:[] };
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_SUCCESS:
            return { loading:false, softwareTrainingTypeAndLengths:action.payload };
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function softwareTrainingTypeAndLengthDetailsReducer(state={softwareTrainingTypeAndLength:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_SUCCESS:
            return { loading:false, softwareTrainingTypeAndLength:action.payload };
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function softwareTrainingTypeAndLengthSaveReducer(state={softwareTrainingTypeAndLength:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_SUCCESS:
            return { loading:false, success:true, softwareTrainingTypeAndLength:action.payload };
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function softwareTrainingTypeAndLengthDeleteReducer(state={softwareTrainingTypeAndLength:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_SUCCESS:
            return { loading:false, success:true, softwareTrainingTypeAndLength:action.payload };
        case SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    softwareTrainingTypeAndLengthListReducer, 
    softwareTrainingTypeAndLengthDetailsReducer,
    softwareTrainingTypeAndLengthSaveReducer,
    softwareTrainingTypeAndLengthDeleteReducer

 }; 
