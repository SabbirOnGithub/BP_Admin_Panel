import { 
    MENU_LIST_REQUEST, 
    MENU_LIST_FAIL, 
    MENU_LIST_SUCCESS, 
    MENU_DETAILS_SUCCESS, 
    MENU_DETAILS_REQUEST, 
    MENU_DETAILS_FAIL,
    MENU_SAVE_REQUEST,
    MENU_SAVE_SUCCESS,
    MENU_SAVE_FAIL,
    MENU_DELETE_REQUEST,
    MENU_DELETE_SUCCESS,
    MENU_DELETE_FAIL,

 } from '../constants/menuConstants';


function menuListReducer(state={menus:[]},action){
    switch(action.type){
        case MENU_LIST_REQUEST:
            return { loading:true, menus:[] };
        case MENU_LIST_SUCCESS:
            return { loading:false, menus:action.payload };
        case MENU_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function menuDetailsReducer(state={menu:{}},action){
    switch(action.type){
        case MENU_DETAILS_REQUEST:
            return { loading:true };
        case MENU_DETAILS_SUCCESS:
            return { loading:false, menu:action.payload };
        case MENU_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function menuSaveReducer(state={menu:{}},action){
    switch(action.type){
        case MENU_SAVE_REQUEST:
            return { loading:true };
        case MENU_SAVE_SUCCESS:
            return { loading:false, success:true, menu:action.payload };
        case MENU_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function menuDeleteReducer(state={menu:{}},action){
    switch(action.type){
        case MENU_DELETE_REQUEST:
            return { loading:true };
        case MENU_DELETE_SUCCESS:
            return { loading:false, success:true, menu:action.payload };
        case MENU_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    menuListReducer, 
    menuDetailsReducer,
    menuSaveReducer,
    menuDeleteReducer

 }; 
