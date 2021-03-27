import { 
    CTA_PACKAGE_MONTHLY_YEARLY_LIST_REQUEST, 
    CTA_PACKAGE_MONTHLY_YEARLY_LIST_FAIL, 
    CTA_PACKAGE_MONTHLY_YEARLY_LIST_SUCCESS, 
    CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_SUCCESS, 
    CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_REQUEST, 
    CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_FAIL,
    CTA_PACKAGE_MONTHLY_YEARLY_SAVE_REQUEST,
    CTA_PACKAGE_MONTHLY_YEARLY_SAVE_SUCCESS,
    CTA_PACKAGE_MONTHLY_YEARLY_SAVE_FAIL,
    CTA_PACKAGE_MONTHLY_YEARLY_DELETE_REQUEST,
    CTA_PACKAGE_MONTHLY_YEARLY_DELETE_SUCCESS,
    CTA_PACKAGE_MONTHLY_YEARLY_DELETE_FAIL,

 } from '../constants/ctaPackageMonthlyYearlyConstants';


function ctaPackageMonthlyYearlyListReducer(state={ctaPackageMonthlyYearlys:[]},action){
    switch(action.type){
        case CTA_PACKAGE_MONTHLY_YEARLY_LIST_REQUEST:
            return { loading:true, ctaPackageMonthlyYearlys:[] };
        case CTA_PACKAGE_MONTHLY_YEARLY_LIST_SUCCESS:
            return { loading:false, ctaPackageMonthlyYearlys:action.payload };
        case CTA_PACKAGE_MONTHLY_YEARLY_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function ctaPackageMonthlyYearlyDetailsReducer(state={ctaPackageMonthlyYearly:{}},action){
    switch(action.type){
        case CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_SUCCESS:
            return { loading:false, ctaPackageMonthlyYearly:action.payload };
        case CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function ctaPackageMonthlyYearlySaveReducer(state={ctaPackageMonthlyYearly:{}},action){
    switch(action.type){
        case CTA_PACKAGE_MONTHLY_YEARLY_SAVE_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_MONTHLY_YEARLY_SAVE_SUCCESS:
            return { loading:false, success:true, ctaPackageMonthlyYearly:action.payload };
        case CTA_PACKAGE_MONTHLY_YEARLY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaPackageMonthlyYearlyDeleteReducer(state={ctaPackageMonthlyYearly:{}},action){
    switch(action.type){
        case CTA_PACKAGE_MONTHLY_YEARLY_DELETE_REQUEST:
            return { loading:true };
        case CTA_PACKAGE_MONTHLY_YEARLY_DELETE_SUCCESS:
            return { loading:false, success:true, ctaPackageMonthlyYearly:action.payload };
        case CTA_PACKAGE_MONTHLY_YEARLY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    ctaPackageMonthlyYearlyListReducer, 
    ctaPackageMonthlyYearlyDetailsReducer,
    ctaPackageMonthlyYearlySaveReducer,
    ctaPackageMonthlyYearlyDeleteReducer

 }; 
