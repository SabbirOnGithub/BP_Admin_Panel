import {SUBMENU_LIST_REQUEST, 
    SUBMENU_LIST_SUCCESS, 
    SUBMENU_LIST_FAIL,
    SUBMENU_DETAILS_REQUEST,
    SUBMENU_DETAILS_SUCCESS,
    SUBMENU_DETAILS_FAIL,
    SUBMENU_SAVE_REQUEST,
    SUBMENU_SAVE_SUCCESS,
    SUBMENU_SAVE_FAIL,
    SUBMENU_DELETE_REQUEST,
    SUBMENU_DELETE_SUCCESS,
    SUBMENU_DELETE_FAIL, 
  } from '../constants/subMenuConstants';


function subMenuListReducer(state={subMenus:[]},action){
    switch(action.type){
        case SUBMENU_LIST_REQUEST:
            return { loading:true, subMenus:[] };
        case SUBMENU_LIST_SUCCESS:
            return { loading:false, subMenus:action.payload };
        case SUBMENU_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function subMenuDetailsReducer(state={subMenu:{}},action){
    switch(action.type){
        case SUBMENU_DETAILS_REQUEST:
            return { loading:true };
        case SUBMENU_DETAILS_SUCCESS:
            return { loading:false, subMenu:action.payload };
        case SUBMENU_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function subMenuSaveReducer(state={subMenu:{}},action){
    switch(action.type){
        case SUBMENU_SAVE_REQUEST:
            return { loading:true };
        case SUBMENU_SAVE_SUCCESS:
            return { loading:false, success:true, subMenu:action.payload };
        case SUBMENU_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function subMenuDeleteReducer(state={subMenu:{}},action){
    switch(action.type){
        case SUBMENU_DELETE_REQUEST:
            return { loading:true };
        case SUBMENU_DELETE_SUCCESS:
            return { loading:false, success:true, subMenu:action.payload };
        case SUBMENU_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  subMenuListReducer, subMenuDetailsReducer, subMenuSaveReducer, subMenuDeleteReducer }; 
