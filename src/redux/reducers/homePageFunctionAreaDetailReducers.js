import { 
    HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_REQUEST, 
    HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_FAIL, 
    HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_SUCCESS,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_REQUEST,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_SUCCESS,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_FAIL,
    HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_REQUEST,
    HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_SUCCESS,
    HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_FAIL,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_REQUEST,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_SUCCESS,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_FAIL, 

 } from '../constants/homePageFunctionAreaDetailConstants';


function homePageFunctionAreaDetailListReducer(state={homePageFunctionAreaDetails:[]},action){
    switch(action.type){
        case HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_REQUEST:
            return { loading:true, homePageFunctionAreaDetails:[] };
        case HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_SUCCESS:
            return { loading:false, homePageFunctionAreaDetails:action.payload };
        case HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function homePageFunctionAreaDetailDetailsReducer(state={homePageFunctionAreaDetail:{}},action){
    switch(action.type){
        case HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_SUCCESS:
            return { loading:false, homePageFunctionAreaDetail:action.payload };
        case HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function homePageFunctionAreaDetailSaveReducer(state={homePageFunctionAreaDetail:{}},action){
    switch(action.type){
        case HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, homePageFunctionAreaDetail:action.payload };
        case HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function homePageFunctionAreaDetailDeleteReducer(state={homePageFunctionAreaDetail:{}},action){
    switch(action.type){
        case HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, homePageFunctionAreaDetail:action.payload };
        case HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  homePageFunctionAreaDetailListReducer, homePageFunctionAreaDetailDetailsReducer, homePageFunctionAreaDetailSaveReducer, homePageFunctionAreaDetailDeleteReducer }; 
