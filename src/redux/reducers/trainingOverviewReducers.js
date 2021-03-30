import { 
    TRAINING_OVERVIEW_LIST_REQUEST, 
    TRAINING_OVERVIEW_LIST_FAIL, 
    TRAINING_OVERVIEW_LIST_SUCCESS,
    TRAINING_OVERVIEW_DETAILS_REQUEST,
    TRAINING_OVERVIEW_DETAILS_SUCCESS,
    TRAINING_OVERVIEW_DETAILS_FAIL,
    TRAINING_OVERVIEW_SAVE_REQUEST,
    TRAINING_OVERVIEW_SAVE_SUCCESS,
    TRAINING_OVERVIEW_SAVE_FAIL,
    TRAINING_OVERVIEW_DELETE_REQUEST,
    TRAINING_OVERVIEW_DELETE_SUCCESS,
    TRAINING_OVERVIEW_DELETE_FAIL, 

 } from '../constants/trainingOverviewConstants';


function trainingOverviewListReducer(state={trainingOverviews:[]},action){
    switch(action.type){
        case TRAINING_OVERVIEW_LIST_REQUEST:
            return { loading:true, trainingOverviews:[] };
        case TRAINING_OVERVIEW_LIST_SUCCESS:
            return { loading:false, trainingOverviews:action.payload };
        case TRAINING_OVERVIEW_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function trainingOverviewDetailsReducer(state={trainingOverview:{}},action){
    switch(action.type){
        case TRAINING_OVERVIEW_DETAILS_REQUEST:
            return { loading:true };
        case TRAINING_OVERVIEW_DETAILS_SUCCESS:
            return { loading:false, trainingOverview:action.payload };
        case TRAINING_OVERVIEW_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function trainingOverviewSaveReducer(state={trainingOverview:{}},action){
    switch(action.type){
        case TRAINING_OVERVIEW_SAVE_REQUEST:
            return { loading:true };
        case TRAINING_OVERVIEW_SAVE_SUCCESS:
            return { loading:false, success:true, trainingOverview:action.payload };
        case TRAINING_OVERVIEW_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function trainingOverviewDeleteReducer(state={trainingOverview:{}},action){
    switch(action.type){
        case TRAINING_OVERVIEW_DELETE_REQUEST:
            return { loading:true };
        case TRAINING_OVERVIEW_DELETE_SUCCESS:
            return { loading:false, success:true, trainingOverview:action.payload };
        case TRAINING_OVERVIEW_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  trainingOverviewListReducer, trainingOverviewDetailsReducer, trainingOverviewSaveReducer, trainingOverviewDeleteReducer }; 
