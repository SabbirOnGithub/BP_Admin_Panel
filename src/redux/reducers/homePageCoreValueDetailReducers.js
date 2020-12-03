import { 
    HOME_PAGE_CORE_VALUE_DETAIL_LIST_REQUEST, 
    HOME_PAGE_CORE_VALUE_DETAIL_LIST_FAIL, 
    HOME_PAGE_CORE_VALUE_DETAIL_LIST_SUCCESS,
    HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_REQUEST,
    HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_SUCCESS,
    HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_FAIL,
    HOME_PAGE_CORE_VALUE_DETAIL_SAVE_REQUEST,
    HOME_PAGE_CORE_VALUE_DETAIL_SAVE_SUCCESS,
    HOME_PAGE_CORE_VALUE_DETAIL_SAVE_FAIL,
    HOME_PAGE_CORE_VALUE_DETAIL_DELETE_REQUEST,
    HOME_PAGE_CORE_VALUE_DETAIL_DELETE_SUCCESS,
    HOME_PAGE_CORE_VALUE_DETAIL_DELETE_FAIL, 

 } from '../constants/homePageCoreValueDetailConstants';


function homePageCoreValueDetailListReducer(state={homePageCoreValueDetails:[]},action){
    switch(action.type){
        case HOME_PAGE_CORE_VALUE_DETAIL_LIST_REQUEST:
            return { loading:true, homePageCoreValueDetails:[] };
        case HOME_PAGE_CORE_VALUE_DETAIL_LIST_SUCCESS:
            return { loading:false, homePageCoreValueDetails:action.payload };
        case HOME_PAGE_CORE_VALUE_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function homePageCoreValueDetailDetailsReducer(state={homePageCoreValueDetail:{}},action){
    switch(action.type){
        case HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_SUCCESS:
            return { loading:false, homePageCoreValueDetail:action.payload };
        case HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function homePageCoreValueDetailSaveReducer(state={homePageCoreValueDetail:{}},action){
    switch(action.type){
        case HOME_PAGE_CORE_VALUE_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case HOME_PAGE_CORE_VALUE_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, homePageCoreValueDetail:action.payload };
        case HOME_PAGE_CORE_VALUE_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function homePageCoreValueDetailDeleteReducer(state={homePageCoreValueDetail:{}},action){
    switch(action.type){
        case HOME_PAGE_CORE_VALUE_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case HOME_PAGE_CORE_VALUE_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, homePageCoreValueDetail:action.payload };
        case HOME_PAGE_CORE_VALUE_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  homePageCoreValueDetailListReducer, homePageCoreValueDetailDetailsReducer, homePageCoreValueDetailSaveReducer, homePageCoreValueDetailDeleteReducer }; 
