import { 
    CTA_PACKAGE_HOURLY_LIST_REQUEST, 
    CTA_PACKAGE_HOURLY_LIST_FAIL, 
    CTA_PACKAGE_HOURLY_LIST_SUCCESS, 
    CTA_PACKAGE_HOURLY_DETAILS_SUCCESS, 
    CTA_PACKAGE_HOURLY_DETAILS_REQUEST, 
    CTA_PACKAGE_HOURLY_DETAILS_FAIL,
    CTA_PACKAGE_HOURLY_SAVE_REQUEST,
    CTA_PACKAGE_HOURLY_SAVE_SUCCESS,
    CTA_PACKAGE_HOURLY_SAVE_FAIL,
    CTA_PACKAGE_HOURLY_DELETE_REQUEST,
    CTA_PACKAGE_HOURLY_DELETE_SUCCESS,
    CTA_PACKAGE_HOURLY_DELETE_FAIL,

 } from '../constants/ctaPackageHourlyConstants';


function ctaPackageHourlyListReducer(state={ctaPackageHourlys:[]},action){
    switch(action.type){
        case CTA_PACKAGE_HOURLY_LIST_REQUEST:
            return { loading:true, ctaPackageHourlys:[] };
        case CTA_PACKAGE_HOURLY_LIST_SUCCESS:
            return { loading:false, ctaPackageHourlys:action.payload };
        case CTA_PACKAGE_HOURLY_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function ctaPackageHourlyDetailsReducer(state={ctaPackageHourly:{}},action){
    switch(action.type){
        case CTA_PACKAGE_HOURLY_DETAILS_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_HOURLY_DETAILS_SUCCESS:
            return { loading:false, ctaPackageHourly:action.payload };
        case CTA_PACKAGE_HOURLY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function ctaPackageHourlySaveReducer(state={ctaPackageHourly:{}},action){
    switch(action.type){
        case CTA_PACKAGE_HOURLY_SAVE_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_HOURLY_SAVE_SUCCESS:
            return { loading:false, success:true, ctaPackageHourly:action.payload };
        case CTA_PACKAGE_HOURLY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaPackageHourlyDeleteReducer(state={ctaPackageHourly:{}},action){
    switch(action.type){
        case CTA_PACKAGE_HOURLY_DELETE_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_HOURLY_DELETE_SUCCESS:
            return { loading:false, success:true, ctaPackageHourly:action.payload };
        case CTA_PACKAGE_HOURLY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    ctaPackageHourlyListReducer, 
    ctaPackageHourlyDetailsReducer,
    ctaPackageHourlySaveReducer,
    ctaPackageHourlyDeleteReducer

 }; 
