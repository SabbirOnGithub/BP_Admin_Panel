import { 
    MENU_HERO_SLIDER_DELETE_FAIL,
    MENU_HERO_SLIDER_DELETE_REQUEST,
    MENU_HERO_SLIDER_DELETE_SUCCESS,
    MENU_HERO_SLIDER_DETAILS_FAIL,
    MENU_HERO_SLIDER_DETAILS_REQUEST,
    MENU_HERO_SLIDER_DETAILS_SUCCESS,
    MENU_HERO_SLIDER_LIST_FAIL,
    MENU_HERO_SLIDER_LIST_REQUEST, 
    MENU_HERO_SLIDER_LIST_SUCCESS, 
    MENU_HERO_SLIDER_SAVE_FAIL, 
    MENU_HERO_SLIDER_SAVE_REQUEST, 
    MENU_HERO_SLIDER_SAVE_SUCCESS, 

} from '../constants/menuHeroSliderConstants';



function menuHeroSliderListReducer(state={menuHeroSliders:[]},action){
    switch(action.type){
        case MENU_HERO_SLIDER_LIST_REQUEST:
            return { loading:true, menuHeroSliders:[] };
        case MENU_HERO_SLIDER_LIST_SUCCESS:
            return { loading:false, menuHeroSliders:action.payload };
        case MENU_HERO_SLIDER_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function menuHeroSliderDetailsReducer(state={menuHeroSlider:{}},action){
    switch(action.type){
        case MENU_HERO_SLIDER_DETAILS_REQUEST:
            return { loading:true };
        case MENU_HERO_SLIDER_DETAILS_SUCCESS:
            return { loading:false, menuHeroSlider:action.payload };
        case MENU_HERO_SLIDER_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function menuHeroSliderSaveReducer(state={menuHeroSlider:{}},action){
    switch(action.type){
        case MENU_HERO_SLIDER_SAVE_REQUEST:
            return { loading:true };
        case MENU_HERO_SLIDER_SAVE_SUCCESS:
            return { loading:false, success:true, menuHeroSlider:action.payload };
        case MENU_HERO_SLIDER_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function menuHeroSliderDeleteReducer(state={menuHeroSlider:{}},action){
    switch(action.type){
        case MENU_HERO_SLIDER_DELETE_REQUEST:
            return { loading:true };
        case MENU_HERO_SLIDER_DELETE_SUCCESS:
            return { loading:false, success:true, menuHeroSlider:action.payload };
        case MENU_HERO_SLIDER_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    menuHeroSliderListReducer, 
    menuHeroSliderDetailsReducer,
    menuHeroSliderSaveReducer,
    menuHeroSliderDeleteReducer
 }; 
