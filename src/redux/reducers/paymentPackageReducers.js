import { 
    PAYMENT_PACKAGE_LIST_REQUEST, 
    PAYMENT_PACKAGE_LIST_FAIL, 
    PAYMENT_PACKAGE_LIST_SUCCESS, 
    PAYMENT_PACKAGE_DETAILS_SUCCESS, 
    PAYMENT_PACKAGE_DETAILS_REQUEST, 
    PAYMENT_PACKAGE_DETAILS_FAIL,
    PAYMENT_PACKAGE_SAVE_REQUEST,
    PAYMENT_PACKAGE_SAVE_SUCCESS,
    PAYMENT_PACKAGE_SAVE_FAIL,
    PAYMENT_PACKAGE_DELETE_REQUEST,
    PAYMENT_PACKAGE_DELETE_SUCCESS,
    PAYMENT_PACKAGE_DELETE_FAIL,

 } from '../constants/paymentPackageConstants';


function paymentPackageListReducer(state={paymentPackages:[]},action){
    switch(action.type){
        case PAYMENT_PACKAGE_LIST_REQUEST:
            return { loading:true, paymentPackages:[] };
        case PAYMENT_PACKAGE_LIST_SUCCESS:
            return { loading:false, paymentPackages:action.payload };
        case PAYMENT_PACKAGE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function paymentPackageDetailsReducer(state={paymentPackage:{}},action){
    switch(action.type){
        case PAYMENT_PACKAGE_DETAILS_REQUEST:
            return { loading:true };
        case PAYMENT_PACKAGE_DETAILS_SUCCESS:
            return { loading:false, paymentPackage:action.payload };
        case PAYMENT_PACKAGE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function paymentPackageSaveReducer(state={paymentPackage:{}},action){
    switch(action.type){
        case PAYMENT_PACKAGE_SAVE_REQUEST:
            return { loading:true };
        case PAYMENT_PACKAGE_SAVE_SUCCESS:
            return { loading:false, success:true, paymentPackage:action.payload };
        case PAYMENT_PACKAGE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function paymentPackageDeleteReducer(state={paymentPackage:{}},action){
    switch(action.type){
        case PAYMENT_PACKAGE_DELETE_REQUEST:
            return { loading:true };
        case PAYMENT_PACKAGE_DELETE_SUCCESS:
            return { loading:false, success:true, paymentPackage:action.payload };
        case PAYMENT_PACKAGE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    paymentPackageListReducer, 
    paymentPackageDetailsReducer,
    paymentPackageSaveReducer,
    paymentPackageDeleteReducer

 }; 
