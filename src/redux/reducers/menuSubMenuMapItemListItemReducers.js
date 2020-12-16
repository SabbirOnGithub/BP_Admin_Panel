import { 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_REQUEST, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_FAIL, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_SUCCESS, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_SUCCESS, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_REQUEST, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_FAIL,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_REQUEST,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_SUCCESS,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_FAIL,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_REQUEST,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_SUCCESS,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_FAIL,

 } from '../constants/menuSubMenuMapItemListItemConstants';


function menuSubMenuMapItemListItemListReducer(state={menuSubMenuMapItemListItems:[]},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_REQUEST:
            return { loading:true, menuSubMenuMapItemListItems:[] };
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_SUCCESS:
            return { loading:false, menuSubMenuMapItemListItems:action.payload };
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function menuSubMenuMapItemListItemDetailsReducer(state={menuSubMenuMapItemListItem:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_SUCCESS:
            return { loading:false, menuSubMenuMapItemListItem:action.payload };
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function menuSubMenuMapItemListItemSaveReducer(state={menuSubMenuMapItemListItem:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_SUCCESS:
            return { loading:false, success:true, menuSubMenuMapItemListItem:action.payload };
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function menuSubMenuMapItemListItemDeleteReducer(state={menuSubMenuMapItemListItem:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_SUCCESS:
            return { loading:false, success:true, menuSubMenuMapItemListItem:action.payload };
        case MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    menuSubMenuMapItemListItemListReducer, 
    menuSubMenuMapItemListItemDetailsReducer,
    menuSubMenuMapItemListItemSaveReducer,
    menuSubMenuMapItemListItemDeleteReducer

 }; 
