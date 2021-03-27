import { 
    COMPANY_TYPE_LIST_REQUEST, 
    COMPANY_TYPE_LIST_FAIL, 
    COMPANY_TYPE_LIST_SUCCESS, 
    COMPANY_TYPE_DETAILS_SUCCESS, 
    COMPANY_TYPE_DETAILS_REQUEST, 
    COMPANY_TYPE_DETAILS_FAIL,
    COMPANY_TYPE_SAVE_REQUEST,
    COMPANY_TYPE_SAVE_SUCCESS,
    COMPANY_TYPE_SAVE_FAIL,
    COMPANY_TYPE_DELETE_REQUEST,
    COMPANY_TYPE_DELETE_SUCCESS,
    COMPANY_TYPE_DELETE_FAIL,

 } from '../constants/companyTypeConstants';


function companyTypeListReducer(state={companyTypes:[]},action){
    switch(action.type){
        case COMPANY_TYPE_LIST_REQUEST:
            return { loading:true, companyTypes:[] };
        case COMPANY_TYPE_LIST_SUCCESS:
            return { loading:false, companyTypes:action.payload };
        case COMPANY_TYPE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function companyTypeDetailsReducer(state={companyType:{}},action){
    switch(action.type){
        case COMPANY_TYPE_DETAILS_REQUEST:
            return { loading:true };
        case COMPANY_TYPE_DETAILS_SUCCESS:
            return { loading:false, companyType:action.payload };
        case COMPANY_TYPE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function companyTypeSaveReducer(state={companyType:{}},action){
    switch(action.type){
        case COMPANY_TYPE_SAVE_REQUEST:
            return { loading:true };
        case COMPANY_TYPE_SAVE_SUCCESS:
            return { loading:false, success:true, companyType:action.payload };
        case COMPANY_TYPE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function companyTypeDeleteReducer(state={companyType:{}},action){
    switch(action.type){
        case COMPANY_TYPE_DELETE_REQUEST:
            return { loading:true };
        case COMPANY_TYPE_DELETE_SUCCESS:
            return { loading:false, success:true, companyType:action.payload };
        case COMPANY_TYPE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    companyTypeListReducer, 
    companyTypeDetailsReducer,
    companyTypeSaveReducer,
    companyTypeDeleteReducer

 }; 
