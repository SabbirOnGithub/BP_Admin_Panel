import { 
    MENU_SUBMENU_MAP_ITEM_LIST_REQUEST, 
    MENU_SUBMENU_MAP_ITEM_LIST_FAIL, 
    MENU_SUBMENU_MAP_ITEM_LIST_SUCCESS, 
    MENU_SUBMENU_MAP_ITEM_DETAILS_SUCCESS, 
    MENU_SUBMENU_MAP_ITEM_DETAILS_REQUEST, 
    MENU_SUBMENU_MAP_ITEM_DETAILS_FAIL,
    MENU_SUBMENU_MAP_ITEM_SAVE_REQUEST,
    MENU_SUBMENU_MAP_ITEM_SAVE_SUCCESS,
    MENU_SUBMENU_MAP_ITEM_SAVE_FAIL,
    MENU_SUBMENU_MAP_ITEM_DELETE_REQUEST,
    MENU_SUBMENU_MAP_ITEM_DELETE_SUCCESS,
    MENU_SUBMENU_MAP_ITEM_DELETE_FAIL,

 } from '../constants/menuSubMenuMapItemConstants';


function menuSubMenuMapItemListReducer(state={menuSubMenuMapItems:[]},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_ITEM_LIST_REQUEST:
            return { loading:true, menuSubMenuMapItems:[] };
        case MENU_SUBMENU_MAP_ITEM_LIST_SUCCESS:
            return { loading:false, menuSubMenuMapItems:action.payload };
        case MENU_SUBMENU_MAP_ITEM_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function menuSubMenuMapItemDetailsReducer(state={menuSubMenuMapItem:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_ITEM_DETAILS_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_ITEM_DETAILS_SUCCESS:
            return { loading:false, menuSubMenuMapItem:action.payload };
        case MENU_SUBMENU_MAP_ITEM_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function menuSubMenuMapItemSaveReducer(state={menuSubMenuMapItem:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_ITEM_SAVE_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_ITEM_SAVE_SUCCESS:
            return { loading:false, success:true, menuSubMenuMapItem:action.payload };
        case MENU_SUBMENU_MAP_ITEM_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function menuSubMenuMapItemDeleteReducer(state={menuSubMenuMapItem:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_ITEM_DELETE_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_ITEM_DELETE_SUCCESS:
            return { loading:false, success:true, menuSubMenuMapItem:action.payload };
        case MENU_SUBMENU_MAP_ITEM_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    menuSubMenuMapItemListReducer, 
    menuSubMenuMapItemDetailsReducer,
    menuSubMenuMapItemSaveReducer,
    menuSubMenuMapItemDeleteReducer
 }; 
