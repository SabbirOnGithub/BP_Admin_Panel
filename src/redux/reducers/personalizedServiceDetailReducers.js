import { 
    PERSONALIZED_SERVICE_DETAIL_LIST_REQUEST, 
    PERSONALIZED_SERVICE_DETAIL_LIST_FAIL, 
    PERSONALIZED_SERVICE_DETAIL_LIST_SUCCESS,
    PERSONALIZED_SERVICE_DETAIL_DETAILS_REQUEST,
    PERSONALIZED_SERVICE_DETAIL_DETAILS_SUCCESS,
    PERSONALIZED_SERVICE_DETAIL_DETAILS_FAIL,
    PERSONALIZED_SERVICE_DETAIL_SAVE_REQUEST,
    PERSONALIZED_SERVICE_DETAIL_SAVE_SUCCESS,
    PERSONALIZED_SERVICE_DETAIL_SAVE_FAIL,
    PERSONALIZED_SERVICE_DETAIL_DELETE_REQUEST,
    PERSONALIZED_SERVICE_DETAIL_DELETE_SUCCESS,
    PERSONALIZED_SERVICE_DETAIL_DELETE_FAIL, 

 } from '../constants/personalizedServiceDetailConstants';


function personalizedServiceDetailListReducer(state={personalizedServiceDetails:[]},action){
    switch(action.type){
        case PERSONALIZED_SERVICE_DETAIL_LIST_REQUEST:
            return { loading:true, personalizedServiceDetails:[] };
        case PERSONALIZED_SERVICE_DETAIL_LIST_SUCCESS:
            return { loading:false, personalizedServiceDetails:action.payload };
        case PERSONALIZED_SERVICE_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function personalizedServiceDetailDetailsReducer(state={personalizedServiceDetail:{}},action){
    switch(action.type){
        case PERSONALIZED_SERVICE_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case PERSONALIZED_SERVICE_DETAIL_DETAILS_SUCCESS:
            return { loading:false, personalizedServiceDetail:action.payload };
        case PERSONALIZED_SERVICE_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function personalizedServiceDetailSaveReducer(state={personalizedServiceDetail:{}},action){
    switch(action.type){
        case PERSONALIZED_SERVICE_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case PERSONALIZED_SERVICE_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, personalizedServiceDetail:action.payload };
        case PERSONALIZED_SERVICE_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function personalizedServiceDetailDeleteReducer(state={personalizedServiceDetail:{}},action){
    switch(action.type){
        case PERSONALIZED_SERVICE_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case PERSONALIZED_SERVICE_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, personalizedServiceDetail:action.payload };
        case PERSONALIZED_SERVICE_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  personalizedServiceDetailListReducer, personalizedServiceDetailDetailsReducer, personalizedServiceDetailSaveReducer, personalizedServiceDetailDeleteReducer }; 
