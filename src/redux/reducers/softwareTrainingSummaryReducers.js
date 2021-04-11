import { 
    SOFTWARE_TRAINING_SUMMARY_LIST_REQUEST, 
    SOFTWARE_TRAINING_SUMMARY_LIST_FAIL, 
    SOFTWARE_TRAINING_SUMMARY_LIST_SUCCESS, 
    SOFTWARE_TRAINING_SUMMARY_DETAILS_SUCCESS, 
    SOFTWARE_TRAINING_SUMMARY_DETAILS_REQUEST, 
    SOFTWARE_TRAINING_SUMMARY_DETAILS_FAIL,
    SOFTWARE_TRAINING_SUMMARY_SAVE_REQUEST,
    SOFTWARE_TRAINING_SUMMARY_SAVE_SUCCESS,
    SOFTWARE_TRAINING_SUMMARY_SAVE_FAIL,
    SOFTWARE_TRAINING_SUMMARY_DELETE_REQUEST,
    SOFTWARE_TRAINING_SUMMARY_DELETE_SUCCESS,
    SOFTWARE_TRAINING_SUMMARY_DELETE_FAIL,

 } from '../constants/softwareTrainingSummaryConstants';


function softwareTrainingSummaryListReducer(state={softwareTrainingSummarys:[]},action){
    switch(action.type){
        case SOFTWARE_TRAINING_SUMMARY_LIST_REQUEST:
            return { loading:true, softwareTrainingSummarys:[] };
        case SOFTWARE_TRAINING_SUMMARY_LIST_SUCCESS:
            return { loading:false, softwareTrainingSummarys:action.payload };
        case SOFTWARE_TRAINING_SUMMARY_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function softwareTrainingSummaryDetailsReducer(state={softwareTrainingSummary:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_SUMMARY_DETAILS_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_SUMMARY_DETAILS_SUCCESS:
            return { loading:false, softwareTrainingSummary:action.payload };
        case SOFTWARE_TRAINING_SUMMARY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function softwareTrainingSummarySaveReducer(state={softwareTrainingSummary:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_SUMMARY_SAVE_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_SUMMARY_SAVE_SUCCESS:
            return { loading:false, success:true, softwareTrainingSummary:action.payload };
        case SOFTWARE_TRAINING_SUMMARY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function softwareTrainingSummaryDeleteReducer(state={softwareTrainingSummary:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_SUMMARY_DELETE_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_SUMMARY_DELETE_SUCCESS:
            return { loading:false, success:true, softwareTrainingSummary:action.payload };
        case SOFTWARE_TRAINING_SUMMARY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    softwareTrainingSummaryListReducer, 
    softwareTrainingSummaryDetailsReducer,
    softwareTrainingSummarySaveReducer,
    softwareTrainingSummaryDeleteReducer

 }; 
