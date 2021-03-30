import { 
    CONSULTATION_OVERVIEW_LIST_REQUEST, 
    CONSULTATION_OVERVIEW_LIST_FAIL, 
    CONSULTATION_OVERVIEW_LIST_SUCCESS,
    CONSULTATION_OVERVIEW_DETAILS_REQUEST,
    CONSULTATION_OVERVIEW_DETAILS_SUCCESS,
    CONSULTATION_OVERVIEW_DETAILS_FAIL,
    CONSULTATION_OVERVIEW_SAVE_REQUEST,
    CONSULTATION_OVERVIEW_SAVE_SUCCESS,
    CONSULTATION_OVERVIEW_SAVE_FAIL,
    CONSULTATION_OVERVIEW_DELETE_REQUEST,
    CONSULTATION_OVERVIEW_DELETE_SUCCESS,
    CONSULTATION_OVERVIEW_DELETE_FAIL, 

 } from '../constants/consultationOverviewConstants';


function consultationOverviewListReducer(state={consultationOverviews:[]},action){
    switch(action.type){
        case CONSULTATION_OVERVIEW_LIST_REQUEST:
            return { loading:true, consultationOverviews:[] };
        case CONSULTATION_OVERVIEW_LIST_SUCCESS:
            return { loading:false, consultationOverviews:action.payload };
        case CONSULTATION_OVERVIEW_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function consultationOverviewDetailsReducer(state={consultationOverview:{}},action){
    switch(action.type){
        case CONSULTATION_OVERVIEW_DETAILS_REQUEST:
            return { loading:true };
        case CONSULTATION_OVERVIEW_DETAILS_SUCCESS:
            return { loading:false, consultationOverview:action.payload };
        case CONSULTATION_OVERVIEW_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function consultationOverviewSaveReducer(state={consultationOverview:{}},action){
    switch(action.type){
        case CONSULTATION_OVERVIEW_SAVE_REQUEST:
            return { loading:true };
        case CONSULTATION_OVERVIEW_SAVE_SUCCESS:
            return { loading:false, success:true, consultationOverview:action.payload };
        case CONSULTATION_OVERVIEW_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function consultationOverviewDeleteReducer(state={consultationOverview:{}},action){
    switch(action.type){
        case CONSULTATION_OVERVIEW_DELETE_REQUEST:
            return { loading:true };
        case CONSULTATION_OVERVIEW_DELETE_SUCCESS:
            return { loading:false, success:true, consultationOverview:action.payload };
        case CONSULTATION_OVERVIEW_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  consultationOverviewListReducer, consultationOverviewDetailsReducer, consultationOverviewSaveReducer, consultationOverviewDeleteReducer }; 
