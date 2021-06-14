import { 
    TECHNOLOGY_SERVICE_LIST_REQUEST, 
    TECHNOLOGY_SERVICE_LIST_FAIL, 
    TECHNOLOGY_SERVICE_LIST_SUCCESS, 
    TECHNOLOGY_SERVICE_DETAILS_SUCCESS, 
    TECHNOLOGY_SERVICE_DETAILS_REQUEST, 
    TECHNOLOGY_SERVICE_DETAILS_FAIL,
    TECHNOLOGY_SERVICE_SAVE_REQUEST,
    TECHNOLOGY_SERVICE_SAVE_SUCCESS,
    TECHNOLOGY_SERVICE_SAVE_FAIL,
    TECHNOLOGY_SERVICE_DELETE_REQUEST,
    TECHNOLOGY_SERVICE_DELETE_SUCCESS,
    TECHNOLOGY_SERVICE_DELETE_FAIL,

 } from '../constants/technologyServiceConstants';


function technologyServiceListReducer(state={technologyServices:[]},action){
    switch(action.type){
        case TECHNOLOGY_SERVICE_LIST_REQUEST:
            return { loading:true, technologyServices:[] };
        case TECHNOLOGY_SERVICE_LIST_SUCCESS:
            return { loading:false, technologyServices:action.payload };
        case TECHNOLOGY_SERVICE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function technologyServiceDetailsReducer(state={technologyService:{}},action){
    switch(action.type){
        case TECHNOLOGY_SERVICE_DETAILS_REQUEST:
            return { loading:true };
        case TECHNOLOGY_SERVICE_DETAILS_SUCCESS:
            return { loading:false, technologyService:action.payload };
        case TECHNOLOGY_SERVICE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function technologyServiceSaveReducer(state={technologyService:{}},action){
    switch(action.type){
        case TECHNOLOGY_SERVICE_SAVE_REQUEST:
            return { loading:true };
        case TECHNOLOGY_SERVICE_SAVE_SUCCESS:
            return { loading:false, success:true, technologyService:action.payload };
        case TECHNOLOGY_SERVICE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function technologyServiceDeleteReducer(state={technologyService:{}},action){
    switch(action.type){
        case TECHNOLOGY_SERVICE_DELETE_REQUEST:
            return { loading:true };
        case TECHNOLOGY_SERVICE_DELETE_SUCCESS:
            return { loading:false, success:true, technologyService:action.payload };
        case TECHNOLOGY_SERVICE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    technologyServiceListReducer, 
    technologyServiceDetailsReducer,
    technologyServiceSaveReducer,
    technologyServiceDeleteReducer

 }; 
