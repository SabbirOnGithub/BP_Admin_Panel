import { 
    BLOG_SUB_CATEGORY_LIST_REQUEST, 
    BLOG_SUB_CATEGORY_LIST_FAIL, 
    BLOG_SUB_CATEGORY_LIST_SUCCESS, 
    BLOG_SUB_CATEGORY_DETAILS_SUCCESS, 
    BLOG_SUB_CATEGORY_DETAILS_REQUEST, 
    BLOG_SUB_CATEGORY_DETAILS_FAIL,
    BLOG_SUB_CATEGORY_SAVE_REQUEST,
    BLOG_SUB_CATEGORY_SAVE_SUCCESS,
    BLOG_SUB_CATEGORY_SAVE_FAIL,
    BLOG_SUB_CATEGORY_DELETE_REQUEST,
    BLOG_SUB_CATEGORY_DELETE_SUCCESS,
    BLOG_SUB_CATEGORY_DELETE_FAIL,

 } from '../constants/blogSubCategoryConstants';


function blogSubCategoryListReducer(state={blogSubCategorys:[]},action){
    switch(action.type){
        case BLOG_SUB_CATEGORY_LIST_REQUEST:
            return { loading:true, blogSubCategorys:[] };
        case BLOG_SUB_CATEGORY_LIST_SUCCESS:
            return { loading:false, blogSubCategorys:action.payload };
        case BLOG_SUB_CATEGORY_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function blogSubCategoryDetailsReducer(state={blogSubCategory:{}},action){
    switch(action.type){
        case BLOG_SUB_CATEGORY_DETAILS_REQUEST:
            return { loading:true };
        case BLOG_SUB_CATEGORY_DETAILS_SUCCESS:
            return { loading:false, blogSubCategory:action.payload };
        case BLOG_SUB_CATEGORY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function blogSubCategorySaveReducer(state={blogSubCategory:{}},action){
    switch(action.type){
        case BLOG_SUB_CATEGORY_SAVE_REQUEST:
            return { loading:true };
        case BLOG_SUB_CATEGORY_SAVE_SUCCESS:
            return { loading:false, success:true, blogSubCategory:action.payload };
        case BLOG_SUB_CATEGORY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function blogSubCategoryDeleteReducer(state={blogSubCategory:{}},action){
    switch(action.type){
        case BLOG_SUB_CATEGORY_DELETE_REQUEST:
            return { loading:true };
        case BLOG_SUB_CATEGORY_DELETE_SUCCESS:
            return { loading:false, success:true, blogSubCategory:action.payload };
        case BLOG_SUB_CATEGORY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    blogSubCategoryListReducer, 
    blogSubCategoryDetailsReducer,
    blogSubCategorySaveReducer,
    blogSubCategoryDeleteReducer

 }; 
