import { 
    HOMEPAGE_SLIDER_DELETE_FAIL,
    HOMEPAGE_SLIDER_DELETE_REQUEST,
    HOMEPAGE_SLIDER_DELETE_SUCCESS,
    HOMEPAGE_SLIDER_DETAILS_FAIL,
    HOMEPAGE_SLIDER_DETAILS_REQUEST,
    HOMEPAGE_SLIDER_DETAILS_SUCCESS,
    HOMEPAGE_SLIDER_LIST_FAIL,
    HOMEPAGE_SLIDER_LIST_REQUEST, 
    HOMEPAGE_SLIDER_LIST_SUCCESS, 
    HOMEPAGE_SLIDER_SAVE_FAIL, 
    HOMEPAGE_SLIDER_SAVE_REQUEST, 
    HOMEPAGE_SLIDER_SAVE_SUCCESS, 

} from '../constants/homePageSliderConstants';



function homePageSliderListReducer(state={homePageSliders:[]},action){
    switch(action.type){
        case HOMEPAGE_SLIDER_LIST_REQUEST:
            return { loading:true, homePageSliders:[] };
        case HOMEPAGE_SLIDER_LIST_SUCCESS:
            return { loading:false, homePageSliders:action.payload };
        case HOMEPAGE_SLIDER_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function homePageSliderDetailsReducer(state={homePageSlider:{}},action){
    switch(action.type){
        case HOMEPAGE_SLIDER_DETAILS_REQUEST:
            return { loading:true };
        case HOMEPAGE_SLIDER_DETAILS_SUCCESS:
            return { loading:false, homePageSlider:action.payload };
        case HOMEPAGE_SLIDER_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function homePageSliderSaveReducer(state={homePageSlider:{}},action){
    switch(action.type){
        case HOMEPAGE_SLIDER_SAVE_REQUEST:
            return { loading:true };
        case HOMEPAGE_SLIDER_SAVE_SUCCESS:
            return { loading:false, success:true, homePageSlider:action.payload };
        case HOMEPAGE_SLIDER_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function homePageSliderDeleteReducer(state={homePageSlider:{}},action){
    switch(action.type){
        case HOMEPAGE_SLIDER_DELETE_REQUEST:
            return { loading:true };
        case HOMEPAGE_SLIDER_DELETE_SUCCESS:
            return { loading:false, success:true, homePageSlider:action.payload };
        case HOMEPAGE_SLIDER_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    homePageSliderListReducer, 
    homePageSliderDetailsReducer,
    homePageSliderSaveReducer,
    homePageSliderDeleteReducer

 }; 
