import { 
    ROLE_RESOURCE_LIST_REQUEST, 
    ROLE_RESOURCE_LIST_FAIL, 
    ROLE_RESOURCE_LIST_SUCCESS, 
    ROLE_RESOURCE_DETAILS_SUCCESS, 
    ROLE_RESOURCE_DETAILS_REQUEST, 
    ROLE_RESOURCE_DETAILS_FAIL,
    ROLE_RESOURCE_SAVE_REQUEST,
    ROLE_RESOURCE_SAVE_SUCCESS,
    ROLE_RESOURCE_SAVE_FAIL,
    ROLE_RESOURCE_DELETE_REQUEST,
    ROLE_RESOURCE_DELETE_SUCCESS,
    ROLE_RESOURCE_DELETE_FAIL,

 } from '../constants/roleResourceConstants';


function roleResourceListReducer(state={roleResources:[]},action){
    switch(action.type){
        case ROLE_RESOURCE_LIST_REQUEST:
            return { loading:true, roleResources:[] };
        case ROLE_RESOURCE_LIST_SUCCESS:
            return { loading:false, roleResources:action.payload };
        case ROLE_RESOURCE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function roleResourceDetailsReducer(state={roleResource:{}},action){
    switch(action.type){
        case ROLE_RESOURCE_DETAILS_REQUEST:
            return { loading:true };
        case ROLE_RESOURCE_DETAILS_SUCCESS:
            return { loading:false, roleResource:action.payload };
        case ROLE_RESOURCE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function roleResourceSaveReducer(state={roleResource:{}},action){
    switch(action.type){
        case ROLE_RESOURCE_SAVE_REQUEST:
            return { loading:true };
        case ROLE_RESOURCE_SAVE_SUCCESS:
            return { loading:false, success:true, roleResource:action.payload };
        case ROLE_RESOURCE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function roleResourceDeleteReducer(state={roleResource:{}},action){
    switch(action.type){
        case ROLE_RESOURCE_DELETE_REQUEST:
            return { loading:true };
        case ROLE_RESOURCE_DELETE_SUCCESS:
            return { loading:false, success:true, roleResource:action.payload };
        case ROLE_RESOURCE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    roleResourceListReducer, 
    roleResourceDetailsReducer,
    roleResourceSaveReducer,
    roleResourceDeleteReducer

 }; 
