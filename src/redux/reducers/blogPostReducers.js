import { 
    BLOG_POST_LIST_REQUEST, 
    BLOG_POST_LIST_FAIL, 
    BLOG_POST_LIST_SUCCESS, 
    BLOG_POST_DETAILS_SUCCESS, 
    BLOG_POST_DETAILS_REQUEST, 
    BLOG_POST_DETAILS_FAIL,
    BLOG_POST_SAVE_REQUEST,
    BLOG_POST_SAVE_SUCCESS,
    BLOG_POST_SAVE_FAIL,
    BLOG_POST_DELETE_REQUEST,
    BLOG_POST_DELETE_SUCCESS,
    BLOG_POST_DELETE_FAIL,
 } from '../constants/blogPostConstants';


function blogPostListReducer(state={blogPosts:[]},action){
    switch(action.type){
        case BLOG_POST_LIST_REQUEST:
            return { loading:true, blogPosts:[] };
        case BLOG_POST_LIST_SUCCESS:
            return { loading:false, blogPosts:action.payload };
        case BLOG_POST_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function blogPostDetailsReducer(state={blogPost:{}},action){
    switch(action.type){
        case BLOG_POST_DETAILS_REQUEST:
            return { loading:true };
        case BLOG_POST_DETAILS_SUCCESS:
            return { loading:false, blogPost:action.payload };
        case BLOG_POST_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function blogPostSaveReducer(state={blogPost:{}},action){
    switch(action.type){
        case BLOG_POST_SAVE_REQUEST:
            return { loading:true };
        case BLOG_POST_SAVE_SUCCESS:
            return { loading:false, success:true, blogPost:action.payload };
        case BLOG_POST_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function blogPostDeleteReducer(state={blogPost:{}},action){
    switch(action.type){
        case BLOG_POST_DELETE_REQUEST:
            return { loading:true };
        case BLOG_POST_DELETE_SUCCESS:
            return { loading:false, success:true, blogPost:action.payload };
        case BLOG_POST_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    blogPostListReducer, 
    blogPostDetailsReducer,
    blogPostSaveReducer,
    blogPostDeleteReducer
 }; 
