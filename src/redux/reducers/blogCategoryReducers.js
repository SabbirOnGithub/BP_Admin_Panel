import { 
    BLOG_CATEGORY_LIST_REQUEST, 
    BLOG_CATEGORY_LIST_FAIL, 
    BLOG_CATEGORY_LIST_SUCCESS, 
    BLOG_CATEGORY_DETAILS_SUCCESS, 
    BLOG_CATEGORY_DETAILS_REQUEST, 
    BLOG_CATEGORY_DETAILS_FAIL,
    BLOG_CATEGORY_SAVE_REQUEST,
    BLOG_CATEGORY_SAVE_SUCCESS,
    BLOG_CATEGORY_SAVE_FAIL,
    BLOG_CATEGORY_DELETE_REQUEST,
    BLOG_CATEGORY_DELETE_SUCCESS,
    BLOG_CATEGORY_DELETE_FAIL,

 } from '../constants/blogCategoryConstants';


function blogCategoryListReducer(state={blogCategorys:[]},action){
    switch(action.type){
        case BLOG_CATEGORY_LIST_REQUEST:
            return { loading:true, blogCategorys:[] };
        case BLOG_CATEGORY_LIST_SUCCESS:
            return { loading:false, blogCategorys:action.payload };
        case BLOG_CATEGORY_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function blogCategoryDetailsReducer(state={blogCategory:{}},action){
    switch(action.type){
        case BLOG_CATEGORY_DETAILS_REQUEST:
            return { loading:true };
        case BLOG_CATEGORY_DETAILS_SUCCESS:
            return { loading:false, blogCategory:action.payload };
        case BLOG_CATEGORY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function blogCategorySaveReducer(state={blogCategory:{}},action){
    switch(action.type){
        case BLOG_CATEGORY_SAVE_REQUEST:
            return { loading:true };
        case BLOG_CATEGORY_SAVE_SUCCESS:
            return { loading:false, success:true, blogCategory:action.payload };
        case BLOG_CATEGORY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function blogCategoryDeleteReducer(state={blogCategory:{}},action){
    switch(action.type){
        case BLOG_CATEGORY_DELETE_REQUEST:
            return { loading:true };
        case BLOG_CATEGORY_DELETE_SUCCESS:
            return { loading:false, success:true, blogCategory:action.payload };
        case BLOG_CATEGORY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    blogCategoryListReducer, 
    blogCategoryDetailsReducer,
    blogCategorySaveReducer,
    blogCategoryDeleteReducer

 }; 
