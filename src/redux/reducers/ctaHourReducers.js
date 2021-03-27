import { 
    CTA_HOUR_LIST_REQUEST, 
    CTA_HOUR_LIST_FAIL, 
    CTA_HOUR_LIST_SUCCESS, 
    CTA_HOUR_DETAILS_SUCCESS, 
    CTA_HOUR_DETAILS_REQUEST, 
    CTA_HOUR_DETAILS_FAIL,
    CTA_HOUR_SAVE_REQUEST,
    CTA_HOUR_SAVE_SUCCESS,
    CTA_HOUR_SAVE_FAIL,
    CTA_HOUR_DELETE_REQUEST,
    CTA_HOUR_DELETE_SUCCESS,
    CTA_HOUR_DELETE_FAIL,

 } from '../constants/ctaHourConstants';


function ctaHourListReducer(state={ctaHours:[]},action){
    switch(action.type){
        case CTA_HOUR_LIST_REQUEST:
            return { loading:true, ctaHours:[] };
        case CTA_HOUR_LIST_SUCCESS:
            return { loading:false, ctaHours:action.payload };
        case CTA_HOUR_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function ctaHourDetailsReducer(state={ctaHour:{}},action){
    switch(action.type){
        case CTA_HOUR_DETAILS_REQUEST:
            return { loading:true };
        case CTA_HOUR_DETAILS_SUCCESS:
            return { loading:false, ctaHour:action.payload };
        case CTA_HOUR_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function ctaHourSaveReducer(state={ctaHour:{}},action){
    switch(action.type){
        case CTA_HOUR_SAVE_REQUEST:
            return { loading:true };
        case CTA_HOUR_SAVE_SUCCESS:
            return { loading:false, success:true, ctaHour:action.payload };
        case CTA_HOUR_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaHourDeleteReducer(state={ctaHour:{}},action){
    switch(action.type){
        case CTA_HOUR_DELETE_REQUEST:
            return { loading:true };
        case CTA_HOUR_DELETE_SUCCESS:
            return { loading:false, success:true, ctaHour:action.payload };
        case CTA_HOUR_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    ctaHourListReducer, 
    ctaHourDetailsReducer,
    ctaHourSaveReducer,
    ctaHourDeleteReducer

 }; 
