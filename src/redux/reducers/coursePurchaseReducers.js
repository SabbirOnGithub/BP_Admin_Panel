import { 
    COURSE_PURCHASE_LIST_REQUEST, 
    COURSE_PURCHASE_LIST_FAIL, 
    COURSE_PURCHASE_LIST_SUCCESS, 
    COURSE_PURCHASE_DETAILS_SUCCESS, 
    COURSE_PURCHASE_DETAILS_REQUEST, 
    COURSE_PURCHASE_DETAILS_FAIL,
    COURSE_PURCHASE_SAVE_REQUEST,
    COURSE_PURCHASE_SAVE_SUCCESS,
    COURSE_PURCHASE_SAVE_FAIL,
    COURSE_PURCHASE_DELETE_REQUEST,
    COURSE_PURCHASE_DELETE_SUCCESS,
    COURSE_PURCHASE_DELETE_FAIL,
 } from '../constants/coursePurchaseConstants';


function coursePurchaseListReducer(state={coursePurchases:[]},action){
    switch(action.type){
        case COURSE_PURCHASE_LIST_REQUEST:
            return { loading:true, coursePurchases:[] };
        case COURSE_PURCHASE_LIST_SUCCESS:
            return { loading:false, coursePurchases:action.payload };
        case COURSE_PURCHASE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function coursePurchaseDetailsReducer(state={coursePurchase:{}},action){
    switch(action.type){
        case COURSE_PURCHASE_DETAILS_REQUEST:
            return { loading:true };
        case COURSE_PURCHASE_DETAILS_SUCCESS:
            return { loading:false, coursePurchase:action.payload };
        case COURSE_PURCHASE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function coursePurchaseSaveReducer(state={coursePurchase:{}},action){
    switch(action.type){
        case COURSE_PURCHASE_SAVE_REQUEST:
            return { loading:true };
        case COURSE_PURCHASE_SAVE_SUCCESS:
            return { loading:false, success:true, coursePurchase:action.payload };
        case COURSE_PURCHASE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function coursePurchaseDeleteReducer(state={coursePurchase:{}},action){
    switch(action.type){
        case COURSE_PURCHASE_DELETE_REQUEST:
            return { loading:true };
        case COURSE_PURCHASE_DELETE_SUCCESS:
            return { loading:false, success:true, coursePurchase:action.payload };
        case COURSE_PURCHASE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    coursePurchaseListReducer, 
    coursePurchaseDetailsReducer,
    coursePurchaseSaveReducer,
    coursePurchaseDeleteReducer
 }; 
