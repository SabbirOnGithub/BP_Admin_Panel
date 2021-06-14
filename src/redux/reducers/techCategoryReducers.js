import { 
    TECH_CATEGORY_LIST_REQUEST, 
    TECH_CATEGORY_LIST_FAIL, 
    TECH_CATEGORY_LIST_SUCCESS,
    TECH_CATEGORY_DETAILS_REQUEST,
    TECH_CATEGORY_DETAILS_SUCCESS,
    TECH_CATEGORY_DETAILS_FAIL,
    TECH_CATEGORY_SAVE_REQUEST,
    TECH_CATEGORY_SAVE_SUCCESS,
    TECH_CATEGORY_SAVE_FAIL,
    TECH_CATEGORY_DELETE_REQUEST,
    TECH_CATEGORY_DELETE_SUCCESS,
    TECH_CATEGORY_DELETE_FAIL, 

 } from '../constants/techCategoryConstants';


function techCategoryListReducer(state={techCategorys:[]},action){
    switch(action.type){
        case TECH_CATEGORY_LIST_REQUEST:
            return { loading:true, techCategorys:[] };
        case TECH_CATEGORY_LIST_SUCCESS:
            return { loading:false, techCategorys:action.payload };
        case TECH_CATEGORY_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function techCategoryDetailsReducer(state={techCategory:{}},action){
    switch(action.type){
        case TECH_CATEGORY_DETAILS_REQUEST:
            return { loading:true };
        case TECH_CATEGORY_DETAILS_SUCCESS:
            return { loading:false, techCategory:action.payload };
        case TECH_CATEGORY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function techCategorySaveReducer(state={techCategory:{}},action){
    switch(action.type){
        case TECH_CATEGORY_SAVE_REQUEST:
            return { loading:true };
        case TECH_CATEGORY_SAVE_SUCCESS:
            return { loading:false, success:true, techCategory:action.payload };
        case TECH_CATEGORY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function techCategoryDeleteReducer(state={techCategory:{}},action){
    switch(action.type){
        case TECH_CATEGORY_DELETE_REQUEST:
            return { loading:true };
        case TECH_CATEGORY_DELETE_SUCCESS:
            return { loading:false, success:true, techCategory:action.payload };
        case TECH_CATEGORY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  techCategoryListReducer, techCategoryDetailsReducer, techCategorySaveReducer, techCategoryDeleteReducer }; 
