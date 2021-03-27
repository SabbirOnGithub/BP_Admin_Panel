import { 
    CTA_PACKAGE_DAILY_LIST_REQUEST, 
    CTA_PACKAGE_DAILY_LIST_FAIL, 
    CTA_PACKAGE_DAILY_LIST_SUCCESS, 
    CTA_PACKAGE_DAILY_DETAILS_SUCCESS, 
    CTA_PACKAGE_DAILY_DETAILS_REQUEST, 
    CTA_PACKAGE_DAILY_DETAILS_FAIL,
    CTA_PACKAGE_DAILY_SAVE_REQUEST,
    CTA_PACKAGE_DAILY_SAVE_SUCCESS,
    CTA_PACKAGE_DAILY_SAVE_FAIL,
    CTA_PACKAGE_DAILY_DELETE_REQUEST,
    CTA_PACKAGE_DAILY_DELETE_SUCCESS,
    CTA_PACKAGE_DAILY_DELETE_FAIL,

 } from '../constants/ctaPackageDailyConstants';


function ctaPackageDailyListReducer(state={ctaPackageDailys:[]},action){
    switch(action.type){
        case CTA_PACKAGE_DAILY_LIST_REQUEST:
            return { loading:true, ctaPackageDailys:[] };
        case CTA_PACKAGE_DAILY_LIST_SUCCESS:
            return { loading:false, ctaPackageDailys:action.payload };
        case CTA_PACKAGE_DAILY_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function ctaPackageDailyDetailsReducer(state={ctaPackageDaily:{}},action){
    switch(action.type){
        case CTA_PACKAGE_DAILY_DETAILS_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_DAILY_DETAILS_SUCCESS:
            return { loading:false, ctaPackageDaily:action.payload };
        case CTA_PACKAGE_DAILY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function ctaPackageDailySaveReducer(state={ctaPackageDaily:{}},action){
    switch(action.type){
        case CTA_PACKAGE_DAILY_SAVE_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_DAILY_SAVE_SUCCESS:
            return { loading:false, success:true, ctaPackageDaily:action.payload };
        case CTA_PACKAGE_DAILY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaPackageDailyDeleteReducer(state={ctaPackageDaily:{}},action){
    switch(action.type){
        case CTA_PACKAGE_DAILY_DELETE_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_DAILY_DELETE_SUCCESS:
            return { loading:false, success:true, ctaPackageDaily:action.payload };
        case CTA_PACKAGE_DAILY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    ctaPackageDailyListReducer, 
    ctaPackageDailyDetailsReducer,
    ctaPackageDailySaveReducer,
    ctaPackageDailyDeleteReducer

 }; 
