import { 
    SUBMENU_BUSINESS_CONTEXT_LIST_REQUEST, 
    SUBMENU_BUSINESS_CONTEXT_LIST_FAIL, 
    SUBMENU_BUSINESS_CONTEXT_LIST_SUCCESS,
    SUBMENU_BUSINESS_CONTEXT_DETAILS_REQUEST,
    SUBMENU_BUSINESS_CONTEXT_DETAILS_SUCCESS,
    SUBMENU_BUSINESS_CONTEXT_DETAILS_FAIL,
    SUBMENU_BUSINESS_CONTEXT_SAVE_REQUEST,
    SUBMENU_BUSINESS_CONTEXT_SAVE_SUCCESS,
    SUBMENU_BUSINESS_CONTEXT_SAVE_FAIL,
    SUBMENU_BUSINESS_CONTEXT_DELETE_REQUEST,
    SUBMENU_BUSINESS_CONTEXT_DELETE_SUCCESS,
    SUBMENU_BUSINESS_CONTEXT_DELETE_FAIL, 

 } from '../constants/subMenuBusinessContextConstants';


function subMenuBusinessContextListReducer(state={subMenuBusinessContexts:[]},action){
    switch(action.type){
        case SUBMENU_BUSINESS_CONTEXT_LIST_REQUEST:
            return { loading:true, subMenuBusinessContexts:[] };
        case SUBMENU_BUSINESS_CONTEXT_LIST_SUCCESS:
            return { loading:false, subMenuBusinessContexts:action.payload };
        case SUBMENU_BUSINESS_CONTEXT_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function subMenuBusinessContextDetailsReducer(state={subMenuBusinessContext:{}},action){
    switch(action.type){
        case SUBMENU_BUSINESS_CONTEXT_DETAILS_REQUEST:
            return { loading:true };
        case SUBMENU_BUSINESS_CONTEXT_DETAILS_SUCCESS:
            return { loading:false, subMenuBusinessContext:action.payload };
        case SUBMENU_BUSINESS_CONTEXT_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function subMenuBusinessContextSaveReducer(state={subMenuBusinessContext:{}},action){
    switch(action.type){
        case SUBMENU_BUSINESS_CONTEXT_SAVE_REQUEST:
            return { loading:true };
        case SUBMENU_BUSINESS_CONTEXT_SAVE_SUCCESS:
            return { loading:false, success:true, subMenuBusinessContext:action.payload };
        case SUBMENU_BUSINESS_CONTEXT_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function subMenuBusinessContextDeleteReducer(state={subMenuBusinessContext:{}},action){
    switch(action.type){
        case SUBMENU_BUSINESS_CONTEXT_DELETE_REQUEST:
            return { loading:true };
        case SUBMENU_BUSINESS_CONTEXT_DELETE_SUCCESS:
            return { loading:false, success:true, subMenuBusinessContext:action.payload };
        case SUBMENU_BUSINESS_CONTEXT_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  subMenuBusinessContextListReducer, subMenuBusinessContextDetailsReducer, subMenuBusinessContextSaveReducer, subMenuBusinessContextDeleteReducer }; 
