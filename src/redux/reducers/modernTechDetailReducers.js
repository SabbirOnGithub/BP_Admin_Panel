import { 
    MODERN_TECH_DETAIL_LIST_REQUEST, 
    MODERN_TECH_DETAIL_LIST_FAIL, 
    MODERN_TECH_DETAIL_LIST_SUCCESS,
    MODERN_TECH_DETAIL_DETAILS_REQUEST,
    MODERN_TECH_DETAIL_DETAILS_SUCCESS,
    MODERN_TECH_DETAIL_DETAILS_FAIL,
    MODERN_TECH_DETAIL_SAVE_REQUEST,
    MODERN_TECH_DETAIL_SAVE_SUCCESS,
    MODERN_TECH_DETAIL_SAVE_FAIL,
    MODERN_TECH_DETAIL_DELETE_REQUEST,
    MODERN_TECH_DETAIL_DELETE_SUCCESS,
    MODERN_TECH_DETAIL_DELETE_FAIL, 

 } from '../constants/modernTechDetailConstants';


function modernTechDetailListReducer(state={modernTechDetails:[]},action){
    switch(action.type){
        case MODERN_TECH_DETAIL_LIST_REQUEST:
            return { loading:true, modernTechDetails:[] };
        case MODERN_TECH_DETAIL_LIST_SUCCESS:
            return { loading:false, modernTechDetails:action.payload };
        case MODERN_TECH_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function modernTechDetailDetailsReducer(state={modernTechDetail:{}},action){
    switch(action.type){
        case MODERN_TECH_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case MODERN_TECH_DETAIL_DETAILS_SUCCESS:
            return { loading:false, modernTechDetail:action.payload };
        case MODERN_TECH_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function modernTechDetailSaveReducer(state={modernTechDetail:{}},action){
    switch(action.type){
        case MODERN_TECH_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case MODERN_TECH_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, modernTechDetail:action.payload };
        case MODERN_TECH_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function modernTechDetailDeleteReducer(state={modernTechDetail:{}},action){
    switch(action.type){
        case MODERN_TECH_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case MODERN_TECH_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, modernTechDetail:action.payload };
        case MODERN_TECH_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  modernTechDetailListReducer, modernTechDetailDetailsReducer, modernTechDetailSaveReducer, modernTechDetailDeleteReducer }; 
