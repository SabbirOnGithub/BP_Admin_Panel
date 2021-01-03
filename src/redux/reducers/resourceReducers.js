import { 
    RESOURCE_LIST_REQUEST, 
    RESOURCE_LIST_FAIL, 
    RESOURCE_LIST_SUCCESS, 
    RESOURCE_DETAILS_SUCCESS, 
    RESOURCE_DETAILS_REQUEST, 
    RESOURCE_DETAILS_FAIL,
    RESOURCE_SAVE_REQUEST,
    RESOURCE_SAVE_SUCCESS,
    RESOURCE_SAVE_FAIL,
    RESOURCE_DELETE_REQUEST,
    RESOURCE_DELETE_SUCCESS,
    RESOURCE_DELETE_FAIL,

 } from '../constants/resourceConstants';


function resourceListReducer(state={resources:[]},action){
    switch(action.type){
        case RESOURCE_LIST_REQUEST:
            return { loading:true, resources:[] };
        case RESOURCE_LIST_SUCCESS:
            return { loading:false, resources:action.payload };
        case RESOURCE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function resourceDetailsReducer(state={resource:{}},action){
    switch(action.type){
        case RESOURCE_DETAILS_REQUEST:
            return { loading:true };
        case RESOURCE_DETAILS_SUCCESS:
            return { loading:false, resource:action.payload };
        case RESOURCE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function resourceSaveReducer(state={resource:{}},action){
    switch(action.type){
        case RESOURCE_SAVE_REQUEST:
            return { loading:true };
        case RESOURCE_SAVE_SUCCESS:
            return { loading:false, success:true, resource:action.payload };
        case RESOURCE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function resourceDeleteReducer(state={resource:{}},action){
    switch(action.type){
        case RESOURCE_DELETE_REQUEST:
            return { loading:true };
        case RESOURCE_DELETE_SUCCESS:
            return { loading:false, success:true, resource:action.payload };
        case RESOURCE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    resourceListReducer, 
    resourceDetailsReducer,
    resourceSaveReducer,
    resourceDeleteReducer

 }; 
