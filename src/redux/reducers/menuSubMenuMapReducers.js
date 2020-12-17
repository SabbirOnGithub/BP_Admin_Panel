import { 
    MENU_SUBMENU_MAP_DELETE_FAIL,
    MENU_SUBMENU_MAP_DELETE_REQUEST,
    MENU_SUBMENU_MAP_DELETE_SUCCESS,
    MENU_SUBMENU_MAP_DETAILS_FAIL,
    MENU_SUBMENU_MAP_DETAILS_REQUEST,
    MENU_SUBMENU_MAP_DETAILS_SUCCESS,
    MENU_SUBMENU_MAP_LIST_FAIL,
    MENU_SUBMENU_MAP_LIST_REQUEST, 
    MENU_SUBMENU_MAP_LIST_SUCCESS, 
    MENU_SUBMENU_MAP_SAVE_FAIL, 
    MENU_SUBMENU_MAP_SAVE_REQUEST, 
    MENU_SUBMENU_MAP_SAVE_SUCCESS, 

} from '../constants/menuSubMenuMapConstants';



function menuSubMenuMapListReducer(state={menuSubMenuMaps:[]},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_LIST_REQUEST:
            return { loading:true, menuSubMenuMaps:[] };
        case MENU_SUBMENU_MAP_LIST_SUCCESS:
            return { loading:false, menuSubMenuMaps:action.payload };
        case MENU_SUBMENU_MAP_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function menuSubMenuMapDetailsReducer(state={menuSubMenuMap:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_DETAILS_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_DETAILS_SUCCESS:
            return { loading:false, menuSubMenuMap:action.payload };
        case MENU_SUBMENU_MAP_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function menuSubMenuMapSaveReducer(state={menuSubMenuMap:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_SAVE_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_SAVE_SUCCESS:
            return { loading:false, success:true, menuSubMenuMap:action.payload };
        case MENU_SUBMENU_MAP_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function menuSubMenuMapDeleteReducer(state={menuSubMenuMap:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_DELETE_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_DELETE_SUCCESS:
            return { loading:false, success:true, menuSubMenuMap:action.payload };
        case MENU_SUBMENU_MAP_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    menuSubMenuMapListReducer, 
    menuSubMenuMapDetailsReducer,
    menuSubMenuMapSaveReducer,
    menuSubMenuMapDeleteReducer

 }; 
