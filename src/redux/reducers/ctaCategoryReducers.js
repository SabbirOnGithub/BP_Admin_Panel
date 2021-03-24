import { 
    CTA_CATEGORY_LIST_REQUEST, 
    CTA_CATEGORY_LIST_FAIL, 
    CTA_CATEGORY_LIST_SUCCESS, 
    CTA_CATEGORY_DETAILS_SUCCESS, 
    CTA_CATEGORY_DETAILS_REQUEST, 
    CTA_CATEGORY_DETAILS_FAIL,
    CTA_CATEGORY_SAVE_REQUEST,
    CTA_CATEGORY_SAVE_SUCCESS,
    CTA_CATEGORY_SAVE_FAIL,
    CTA_CATEGORY_DELETE_REQUEST,
    CTA_CATEGORY_DELETE_SUCCESS,
    CTA_CATEGORY_DELETE_FAIL,
    CTA_CATEGORY_MODEL_LIST_REQUEST,
    CTA_CATEGORY_MODEL_LIST_SUCCESS,
    CTA_CATEGORY_MODEL_LIST_FAIL,
    CTA_CATEGORY_DOCUMENT_SAVE_FAIL,
    CTA_CATEGORY_DOCUMENT_SAVE_SUCCESS,
    CTA_CATEGORY_DOCUMENT_SAVE_REQUEST
 } from '../constants/ctaCategoryConstants';


function ctaCategoryListReducer(state={ctaCategorys:[]},action){
    switch(action.type){
        case CTA_CATEGORY_LIST_REQUEST:
            return { loading:true, ctaCategorys:[] };
        case CTA_CATEGORY_LIST_SUCCESS:
            return { loading:false, ctaCategorys:action.payload };
        case CTA_CATEGORY_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function ctaCategoryDetailsReducer(state={ctaCategory:{}},action){
    switch(action.type){
        case CTA_CATEGORY_DETAILS_REQUEST:
            return { loading:true };
        case CTA_CATEGORY_DETAILS_SUCCESS:
            return { loading:false, ctaCategory:action.payload };
        case CTA_CATEGORY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function ctaCategorySaveReducer(state={ctaCategory:{}},action){
    switch(action.type){
        case CTA_CATEGORY_SAVE_REQUEST:
            return { loading:true };
        case CTA_CATEGORY_SAVE_SUCCESS:
            return { loading:false, success:true, ctaCategory:action.payload };
        case CTA_CATEGORY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaCategoryDocumentSaveReducer(state={ctaCategoryDocument:{}},action){
    switch(action.type){
        case CTA_CATEGORY_DOCUMENT_SAVE_REQUEST:
            return { loading:true };
        case CTA_CATEGORY_DOCUMENT_SAVE_SUCCESS:
            return { loading:false, success:true, ctaCategoryDocument:action.payload };
        case CTA_CATEGORY_DOCUMENT_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaCategoryDeleteReducer(state={ctaCategory:{}},action){
    switch(action.type){
        case CTA_CATEGORY_DELETE_REQUEST:
            return { loading:true };
        case CTA_CATEGORY_DELETE_SUCCESS:
            return { loading:false, success:true, ctaCategory:action.payload };
        case CTA_CATEGORY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaCategoryModelListReducer(state={ctaCategoryModels:{}},action){
    switch(action.type){
        case CTA_CATEGORY_MODEL_LIST_REQUEST:
            return { loading:true, ctaCategoryModels:{} };
        case CTA_CATEGORY_MODEL_LIST_SUCCESS:
            return { loading:false, ctaCategoryModels:action.payload };
        case CTA_CATEGORY_MODEL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    ctaCategoryListReducer, 
    ctaCategoryDetailsReducer,
    ctaCategorySaveReducer,
    ctaCategoryDeleteReducer,
    ctaCategoryModelListReducer,
    ctaCategoryDocumentSaveReducer
 }; 
