import { 
    CONTACT_US_MESSEAGE_LIST_REQUEST, 
    CONTACT_US_MESSEAGE_LIST_FAIL, 
    CONTACT_US_MESSEAGE_LIST_SUCCESS, 
    CONTACT_US_MESSEAGE_DETAILS_SUCCESS, 
    CONTACT_US_MESSEAGE_DETAILS_REQUEST, 
    CONTACT_US_MESSEAGE_DETAILS_FAIL,
    CONTACT_US_MESSEAGE_SAVE_REQUEST,
    CONTACT_US_MESSEAGE_SAVE_SUCCESS,
    CONTACT_US_MESSEAGE_SAVE_FAIL,
    CONTACT_US_MESSEAGE_DELETE_REQUEST,
    CONTACT_US_MESSEAGE_DELETE_SUCCESS,
    CONTACT_US_MESSEAGE_DELETE_FAIL,
 } from '../constants/contactUsMessageConstants';


function contactUsMessageListReducer(state={contactUsMessages:[]},action){
    switch(action.type){
        case CONTACT_US_MESSEAGE_LIST_REQUEST:
            return { loading:true, contactUsMessages:[] };
        case CONTACT_US_MESSEAGE_LIST_SUCCESS:
            return { loading:false, contactUsMessages:action.payload };
        case CONTACT_US_MESSEAGE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function contactUsMessageDetailsReducer(state={contactUsMessage:{}},action){
    switch(action.type){
        case CONTACT_US_MESSEAGE_DETAILS_REQUEST:
            return { loading:true };
        case CONTACT_US_MESSEAGE_DETAILS_SUCCESS:
            return { loading:false, contactUsMessage:action.payload };
        case CONTACT_US_MESSEAGE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function contactUsMessageSaveReducer(state={contactUsMessage:{}},action){
    switch(action.type){
        case CONTACT_US_MESSEAGE_SAVE_REQUEST:
            return { loading:true };
        case CONTACT_US_MESSEAGE_SAVE_SUCCESS:
            return { loading:false, success:true, contactUsMessage:action.payload };
        case CONTACT_US_MESSEAGE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function contactUsMessageDeleteReducer(state={contactUsMessage:{}},action){
    switch(action.type){
        case CONTACT_US_MESSEAGE_DELETE_REQUEST:
            return { loading:true };
        case CONTACT_US_MESSEAGE_DELETE_SUCCESS:
            return { loading:false, success:true, contactUsMessage:action.payload };
        case CONTACT_US_MESSEAGE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    contactUsMessageListReducer, 
    contactUsMessageDetailsReducer,
    contactUsMessageSaveReducer,
    contactUsMessageDeleteReducer
 }; 
