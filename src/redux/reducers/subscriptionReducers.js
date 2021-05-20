import { 
    SUBSCRIPTION_LIST_REQUEST, 
    SUBSCRIPTION_LIST_FAIL, 
    SUBSCRIPTION_LIST_SUCCESS, 
    SUBSCRIPTION_DETAILS_SUCCESS, 
    SUBSCRIPTION_DETAILS_REQUEST, 
    SUBSCRIPTION_DETAILS_FAIL,
    SUBSCRIPTION_SAVE_REQUEST,
    SUBSCRIPTION_SAVE_SUCCESS,
    SUBSCRIPTION_SAVE_FAIL,
    SUBSCRIPTION_DELETE_REQUEST,
    SUBSCRIPTION_DELETE_SUCCESS,
    SUBSCRIPTION_DELETE_FAIL,

 } from '../constants/subscriptionConstants';


function subscriptionListReducer(state={subscriptions:[]},action){
    switch(action.type){
        case SUBSCRIPTION_LIST_REQUEST:
            return { loading:true, subscriptions:[] };
        case SUBSCRIPTION_LIST_SUCCESS:
            return { loading:false, subscriptions:action.payload };
        case SUBSCRIPTION_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function subscriptionDetailsReducer(state={subscription:{}},action){
    switch(action.type){
        case SUBSCRIPTION_DETAILS_REQUEST:
            return { loading:true };
        case SUBSCRIPTION_DETAILS_SUCCESS:
            return { loading:false, subscription:action.payload };
        case SUBSCRIPTION_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function subscriptionSaveReducer(state={subscription:{}},action){
    switch(action.type){
        case SUBSCRIPTION_SAVE_REQUEST:
            return { loading:true };
        case SUBSCRIPTION_SAVE_SUCCESS:
            return { loading:false, success:true, subscription:action.payload };
        case SUBSCRIPTION_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function subscriptionDeleteReducer(state={subscription:{}},action){
    switch(action.type){
        case SUBSCRIPTION_DELETE_REQUEST:
            return { loading:true };
        case SUBSCRIPTION_DELETE_SUCCESS:
            return { loading:false, success:true, subscription:action.payload };
        case SUBSCRIPTION_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    subscriptionListReducer, 
    subscriptionDetailsReducer,
    subscriptionSaveReducer,
    subscriptionDeleteReducer

 }; 
