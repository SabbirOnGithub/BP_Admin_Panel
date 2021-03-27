import { 
    CONSULTING_TYPE_LIST_REQUEST, 
    CONSULTING_TYPE_LIST_FAIL, 
    CONSULTING_TYPE_LIST_SUCCESS, 
    CONSULTING_TYPE_DETAILS_SUCCESS, 
    CONSULTING_TYPE_DETAILS_REQUEST, 
    CONSULTING_TYPE_DETAILS_FAIL,
    CONSULTING_TYPE_SAVE_REQUEST,
    CONSULTING_TYPE_SAVE_SUCCESS,
    CONSULTING_TYPE_SAVE_FAIL,
    CONSULTING_TYPE_DELETE_REQUEST,
    CONSULTING_TYPE_DELETE_SUCCESS,
    CONSULTING_TYPE_DELETE_FAIL,

 } from '../constants/consultingTypeConstants';


function consultingTypeListReducer(state={consultingTypes:[]},action){
    switch(action.type){
        case CONSULTING_TYPE_LIST_REQUEST:
            return { loading:true, consultingTypes:[] };
        case CONSULTING_TYPE_LIST_SUCCESS:
            return { loading:false, consultingTypes:action.payload };
        case CONSULTING_TYPE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function consultingTypeDetailsReducer(state={consultingType:{}},action){
    switch(action.type){
        case CONSULTING_TYPE_DETAILS_REQUEST:
            return { loading:true };
        case CONSULTING_TYPE_DETAILS_SUCCESS:
            return { loading:false, consultingType:action.payload };
        case CONSULTING_TYPE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function consultingTypeSaveReducer(state={consultingType:{}},action){
    switch(action.type){
        case CONSULTING_TYPE_SAVE_REQUEST:
            return { loading:true };
        case CONSULTING_TYPE_SAVE_SUCCESS:
            return { loading:false, success:true, consultingType:action.payload };
        case CONSULTING_TYPE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function consultingTypeDeleteReducer(state={consultingType:{}},action){
    switch(action.type){
        case CONSULTING_TYPE_DELETE_REQUEST:
            return { loading:true };
        case CONSULTING_TYPE_DELETE_SUCCESS:
            return { loading:false, success:true, consultingType:action.payload };
        case CONSULTING_TYPE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    consultingTypeListReducer, 
    consultingTypeDetailsReducer,
    consultingTypeSaveReducer,
    consultingTypeDeleteReducer

 }; 
