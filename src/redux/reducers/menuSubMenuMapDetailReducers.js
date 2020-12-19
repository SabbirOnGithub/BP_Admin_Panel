import { 
    MENU_SUBMENU_MAP_DETAIL_DELETE_FAIL,
    MENU_SUBMENU_MAP_DETAIL_DELETE_REQUEST,
    MENU_SUBMENU_MAP_DETAIL_DELETE_SUCCESS,
    MENU_SUBMENU_MAP_DETAIL_DETAILS_FAIL,
    MENU_SUBMENU_MAP_DETAIL_DETAILS_REQUEST,
    MENU_SUBMENU_MAP_DETAIL_DETAILS_SUCCESS,
    MENU_SUBMENU_MAP_DETAIL_LIST_FAIL,
    MENU_SUBMENU_MAP_DETAIL_LIST_REQUEST, 
    MENU_SUBMENU_MAP_DETAIL_LIST_SUCCESS, 
    MENU_SUBMENU_MAP_DETAIL_SAVE_FAIL, 
    MENU_SUBMENU_MAP_DETAIL_SAVE_REQUEST, 
    MENU_SUBMENU_MAP_DETAIL_SAVE_SUCCESS, 

} from '../constants/menuSubMenuMapDetailConstants';



function menuSubMenuMapDetailListReducer(state={menuSubMenuMapDetails:[]},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_DETAIL_LIST_REQUEST:
            return { loading:true, menuSubMenuMapDetails:[] };
        case MENU_SUBMENU_MAP_DETAIL_LIST_SUCCESS:
            return { loading:false, menuSubMenuMapDetails:action.payload };
        case MENU_SUBMENU_MAP_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function menuSubMenuMapDetailDetailsReducer(state={menuSubMenuMapDetail:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_DETAIL_DETAILS_SUCCESS:
            return { loading:false, menuSubMenuMapDetail:action.payload };
        case MENU_SUBMENU_MAP_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function menuSubMenuMapDetailSaveReducer(state={menuSubMenuMapDetail:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, menuSubMenuMapDetail:action.payload };
        case MENU_SUBMENU_MAP_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function menuSubMenuMapDetailDeleteReducer(state={menuSubMenuMapDetail:{}},action){
    switch(action.type){
        case MENU_SUBMENU_MAP_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case MENU_SUBMENU_MAP_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, menuSubMenuMapDetail:action.payload };
        case MENU_SUBMENU_MAP_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    menuSubMenuMapDetailListReducer, 
    menuSubMenuMapDetailDetailsReducer,
    menuSubMenuMapDetailSaveReducer,
    menuSubMenuMapDetailDeleteReducer
 }; 
