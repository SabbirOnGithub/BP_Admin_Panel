import { 
    MENU_SECTION_DELETE_FAIL,
    MENU_SECTION_DELETE_REQUEST,
    MENU_SECTION_DELETE_SUCCESS,
    MENU_SECTION_DETAILS_FAIL,
    MENU_SECTION_DETAILS_REQUEST,
    MENU_SECTION_DETAILS_SUCCESS,
    MENU_SECTION_LIST_FAIL,
    MENU_SECTION_LIST_REQUEST, 
    MENU_SECTION_LIST_SUCCESS, 
    MENU_SECTION_SAVE_FAIL, 
    MENU_SECTION_SAVE_REQUEST, 
    MENU_SECTION_SAVE_SUCCESS, 

} from '../constants/menuSectionConstants';



function menuSectionListReducer(state={menuSections:[]},action){
    switch(action.type){
        case MENU_SECTION_LIST_REQUEST:
            return { loading:true, menuSections:[] };
        case MENU_SECTION_LIST_SUCCESS:
            return { loading:false, menuSections:action.payload };
        case MENU_SECTION_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function menuSectionDetailsReducer(state={menuSection:{}},action){
    switch(action.type){
        case MENU_SECTION_DETAILS_REQUEST:
            return { loading:true };
        case MENU_SECTION_DETAILS_SUCCESS:
            return { loading:false, menuSection:action.payload };
        case MENU_SECTION_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function menuSectionSaveReducer(state={menuSection:{}},action){
    switch(action.type){
        case MENU_SECTION_SAVE_REQUEST:
            return { loading:true };
        case MENU_SECTION_SAVE_SUCCESS:
            return { loading:false, success:true, menuSection:action.payload };
        case MENU_SECTION_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function menuSectionDeleteReducer(state={menuSection:{}},action){
    switch(action.type){
        case MENU_SECTION_DELETE_REQUEST:
            return { loading:true };
        case MENU_SECTION_DELETE_SUCCESS:
            return { loading:false, success:true, menuSection:action.payload };
        case MENU_SECTION_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    menuSectionListReducer, 
    menuSectionDetailsReducer,
    menuSectionSaveReducer,
    menuSectionDeleteReducer
 }; 
