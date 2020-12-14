import { 
    SUBMENU_BEST_PRACTICE_LIST_REQUEST, 
    SUBMENU_BEST_PRACTICE_LIST_FAIL, 
    SUBMENU_BEST_PRACTICE_LIST_SUCCESS,
    SUBMENU_BEST_PRACTICE_DETAILS_REQUEST,
    SUBMENU_BEST_PRACTICE_DETAILS_SUCCESS,
    SUBMENU_BEST_PRACTICE_DETAILS_FAIL,
    SUBMENU_BEST_PRACTICE_SAVE_REQUEST,
    SUBMENU_BEST_PRACTICE_SAVE_SUCCESS,
    SUBMENU_BEST_PRACTICE_SAVE_FAIL,
    SUBMENU_BEST_PRACTICE_DELETE_REQUEST,
    SUBMENU_BEST_PRACTICE_DELETE_SUCCESS,
    SUBMENU_BEST_PRACTICE_DELETE_FAIL, 

 } from '../constants/submenuBestPracticeConstants';


function submenuBestPracticeListReducer(state={submenuBestPractices:[]},action){
    switch(action.type){
        case SUBMENU_BEST_PRACTICE_LIST_REQUEST:
            return { loading:true, submenuBestPractices:[] };
        case SUBMENU_BEST_PRACTICE_LIST_SUCCESS:
            return { loading:false, submenuBestPractices:action.payload };
        case SUBMENU_BEST_PRACTICE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function submenuBestPracticeDetailsReducer(state={submenuBestPractice:{}},action){
    switch(action.type){
        case SUBMENU_BEST_PRACTICE_DETAILS_REQUEST:
            return { loading:true };
        case SUBMENU_BEST_PRACTICE_DETAILS_SUCCESS:
            return { loading:false, submenuBestPractice:action.payload };
        case SUBMENU_BEST_PRACTICE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function submenuBestPracticeSaveReducer(state={submenuBestPractice:{}},action){
    switch(action.type){
        case SUBMENU_BEST_PRACTICE_SAVE_REQUEST:
            return { loading:true };
        case SUBMENU_BEST_PRACTICE_SAVE_SUCCESS:
            return { loading:false, success:true, submenuBestPractice:action.payload };
        case SUBMENU_BEST_PRACTICE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function submenuBestPracticeDeleteReducer(state={submenuBestPractice:{}},action){
    switch(action.type){
        case SUBMENU_BEST_PRACTICE_DELETE_REQUEST:
            return { loading:true };
        case SUBMENU_BEST_PRACTICE_DELETE_SUCCESS:
            return { loading:false, success:true, submenuBestPractice:action.payload };
        case SUBMENU_BEST_PRACTICE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  submenuBestPracticeListReducer, submenuBestPracticeDetailsReducer, submenuBestPracticeSaveReducer, submenuBestPracticeDeleteReducer }; 
