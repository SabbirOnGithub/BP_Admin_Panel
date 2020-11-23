import {HOMEPAGE_LIST_REQUEST, 
    HOMEPAGE_LIST_SUCCESS, 
    HOMEPAGE_LIST_FAIL, 
    HOMEPAGE_DETAILS_SUCCESS, 
    HOMEPAGE_DETAILS_REQUEST, 
    HOMEPAGE_DETAILS_FAIL,
    HOMEPAGE_SAVE_REQUEST,
    HOMEPAGE_SAVE_SUCCESS,
    HOMEPAGE_SAVE_FAIL,
    HOMEPAGE_DELETE_REQUEST,
    HOMEPAGE_DELETE_SUCCESS,
    HOMEPAGE_DELETE_FAIL,
  } from '../constants/homePageConstants';


function homePageDataListReducer(state={homePageDatas:[]},action){
    switch(action.type){
        case HOMEPAGE_LIST_REQUEST:
            return { loading:true, homePageDatas:[] };
        case HOMEPAGE_LIST_SUCCESS:
            return { loading:false, homePageDatas:action.payload };
        case HOMEPAGE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function homePageDataDetailsReducer(state={homePageData:{}},action){
    switch(action.type){
        case HOMEPAGE_DETAILS_REQUEST:
            return { loading:true };
        case HOMEPAGE_DETAILS_SUCCESS:
            return { loading:false, product:action.payload };
        case HOMEPAGE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function homePageDataSaveReducer(state={homePageData:{}},action){
    switch(action.type){
        case HOMEPAGE_SAVE_REQUEST:
            return { loading:true };
        case HOMEPAGE_SAVE_SUCCESS:
            return { loading:false, success:true, homePageData:action.payload };
        case HOMEPAGE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function homePageDataDeleteReducer(state={homePageData:{}},action){
    switch(action.type){
        case HOMEPAGE_DELETE_REQUEST:
            return { loading:true };
        case HOMEPAGE_DELETE_SUCCESS:
            return { loading:false, success:true, homePageData:action.payload };
        case HOMEPAGE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    homePageDataListReducer, 
    homePageDataDetailsReducer,
    homePageDataSaveReducer,
    homePageDataDeleteReducer

 }; 
