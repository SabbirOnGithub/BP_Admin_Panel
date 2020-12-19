import { 
    MENU_SECTION_DETAIL_DELETE_FAIL,
    MENU_SECTION_DETAIL_DELETE_REQUEST,
    MENU_SECTION_DETAIL_DELETE_SUCCESS,
    MENU_SECTION_DETAIL_DETAILS_FAIL,
    MENU_SECTION_DETAIL_DETAILS_REQUEST,
    MENU_SECTION_DETAIL_DETAILS_SUCCESS,
    MENU_SECTION_DETAIL_LIST_FAIL,
    MENU_SECTION_DETAIL_LIST_REQUEST, 
    MENU_SECTION_DETAIL_LIST_SUCCESS, 
    MENU_SECTION_DETAIL_SAVE_FAIL, 
    MENU_SECTION_DETAIL_SAVE_REQUEST, 
    MENU_SECTION_DETAIL_SAVE_SUCCESS, 

} from '../constants/menuSectionDetailConstants';



function menuSectionDetailListReducer(state={menuSectionDetails:[]},action){
    switch(action.type){
        case MENU_SECTION_DETAIL_LIST_REQUEST:
            return { loading:true, menuSectionDetails:[] };
        case MENU_SECTION_DETAIL_LIST_SUCCESS:
            return { loading:false, menuSectionDetails:action.payload };
        case MENU_SECTION_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function menuSectionDetailDetailsReducer(state={menuSectionDetail:{}},action){
    switch(action.type){
        case MENU_SECTION_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case MENU_SECTION_DETAIL_DETAILS_SUCCESS:
            return { loading:false, menuSectionDetail:action.payload };
        case MENU_SECTION_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function menuSectionDetailSaveReducer(state={menuSectionDetail:{}},action){
    switch(action.type){
        case MENU_SECTION_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case MENU_SECTION_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, menuSectionDetail:action.payload };
        case MENU_SECTION_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function menuSectionDetailDeleteReducer(state={menuSectionDetail:{}},action){
    switch(action.type){
        case MENU_SECTION_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case MENU_SECTION_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, menuSectionDetail:action.payload };
        case MENU_SECTION_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    menuSectionDetailListReducer, 
    menuSectionDetailDetailsReducer,
    menuSectionDetailSaveReducer,
    menuSectionDetailDeleteReducer
 }; 
