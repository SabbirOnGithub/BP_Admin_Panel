import { 
    CTA_FUNCTION_LIST_REQUEST, 
    CTA_FUNCTION_LIST_FAIL, 
    CTA_FUNCTION_LIST_SUCCESS, 
    CTA_FUNCTION_DETAILS_SUCCESS, 
    CTA_FUNCTION_DETAILS_REQUEST, 
    CTA_FUNCTION_DETAILS_FAIL,
    CTA_FUNCTION_SAVE_REQUEST,
    CTA_FUNCTION_SAVE_SUCCESS,
    CTA_FUNCTION_SAVE_FAIL,
    CTA_FUNCTION_MODEL_LIST_REQUEST,
    CTA_FUNCTION_MODEL_LIST_SUCCESS,
    CTA_FUNCTION_MODEL_LIST_FAIL,
    CTA_FUNCTION_DOCUMENT_LIST_REQUEST,
    CTA_FUNCTION_DOCUMENT_LIST_SUCCESS,
    CTA_FUNCTION_DOCUMENT_LIST_FAIL,
    CTA_FUNCTION_DOCUMENT_SAVE_REQUEST,
    CTA_FUNCTION_DOCUMENT_SAVE_SUCCESS,
    CTA_FUNCTION_DOCUMENT_SAVE_FAIL,
    CTA_FUNCTION_DOCUMENT_DELETE_REQUEST,
    CTA_FUNCTION_DOCUMENT_DELETE_SUCCESS,
    CTA_FUNCTION_DOCUMENT_DELETE_FAIL,
    CONSULTANCY_SUMMERY_DETAILS_REQUEST,
    CONSULTANCY_SUMMERY_DETAILS_SUCCESS,
    CONSULTANCY_SUMMERY_DETAILS_FAIL

 } from '../constants/ctaFunctionConstants';

 function ctaFunctionListReducer(state={ctaFunctions:{}},action){
    switch(action.type){
        case CTA_FUNCTION_LIST_REQUEST:
            return { loading:true, ctaFunctions:{} };
        case CTA_FUNCTION_LIST_SUCCESS:
            return { loading:false, ctaFunctions:action.payload };
        case CTA_FUNCTION_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

 // function ctaFunctionListReducer(state={ctaFunctions:[]},action){
//     switch(action.type){
//         case CTA_FUNCTION_LIST_REQUEST:
//             return { loading:true, ctaFunctions:[] };
//         case CTA_FUNCTION_LIST_SUCCESS:
//             return { loading:false, ctaFunctions:action.payload };
//         case CTA_FUNCTION_LIST_FAIL:
//             return { loading:false, error: action.payload };
//         default:
//             return state;
//     }
// };


function ctaFunctionDetailsReducer(state={ctaFunction:{}},action){
    switch(action.type){
        case CTA_FUNCTION_DETAILS_REQUEST:
            return { loading:true };
        case CTA_FUNCTION_DETAILS_SUCCESS:
            return { loading:false, ctaFunction:action.payload };
        case CTA_FUNCTION_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaFunctionSaveReducer(state={ctaFunction:{}},action){
    switch(action.type){
        case CTA_FUNCTION_SAVE_REQUEST:
            return { loading:true };
        case CTA_FUNCTION_SAVE_SUCCESS:
            return { loading:false, success:true, ctaFunction:action.payload };
        case CTA_FUNCTION_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function ctaFunctionModelListReducer(state={ctaFunctionModels:{}},action){
    switch(action.type){
        case CTA_FUNCTION_MODEL_LIST_REQUEST:
            return { loading:true, ctaFunctionModels:{} };
        case CTA_FUNCTION_MODEL_LIST_SUCCESS:
            return { loading:false, ctaFunctionModels:action.payload };
        case CTA_FUNCTION_MODEL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function ctaFunctionDocumentListReducer(state={ctaFunctionDocuments:[]},action){
    switch(action.type){
        case CTA_FUNCTION_DOCUMENT_LIST_REQUEST:
            return { loading:true, ctaFunctionDocuments:[] };
        case CTA_FUNCTION_DOCUMENT_LIST_SUCCESS:
            return { loading:false, ctaFunctionDocuments:action.payload };
        case CTA_FUNCTION_DOCUMENT_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaFunctionDocumentSaveReducer(state={ctaFunctionDocument:{}},action){
    switch(action.type){
        case CTA_FUNCTION_DOCUMENT_SAVE_REQUEST:
            return { loading:true };
        case CTA_FUNCTION_DOCUMENT_SAVE_SUCCESS:
            return { loading:false, success:true, ctaFunctionDocument:action.payload };
        case CTA_FUNCTION_DOCUMENT_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function ctaFunctionDocumentDeleteReducer(state={ctaFunctionDocument:{}},action){
    switch(action.type){
        case CTA_FUNCTION_DOCUMENT_DELETE_REQUEST:
            return { loading:true };
        case CTA_FUNCTION_DOCUMENT_DELETE_SUCCESS:
            return { loading:false, success:true, ctaFunctionDocument:action.payload };
        case CTA_FUNCTION_DOCUMENT_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function consultationSummeryDetailsReducer(state={consultationSummery:{}},action){
    switch(action.type){
        case CONSULTANCY_SUMMERY_DETAILS_REQUEST:
            return { loading:true };
        case CONSULTANCY_SUMMERY_DETAILS_SUCCESS:
            return { loading:false, consultationSummery:action.payload };
        case CONSULTANCY_SUMMERY_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};
export { 
    ctaFunctionListReducer, 
    ctaFunctionDetailsReducer,
    ctaFunctionSaveReducer,
    ctaFunctionModelListReducer,
    ctaFunctionDocumentListReducer,
    ctaFunctionDocumentSaveReducer,
    ctaFunctionDocumentDeleteReducer,
    consultationSummeryDetailsReducer
 }; 
