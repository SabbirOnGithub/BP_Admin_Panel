import { 
    ROLE_LIST_REQUEST, 
    ROLE_LIST_FAIL, 
    ROLE_LIST_SUCCESS, 
    ROLE_DETAILS_SUCCESS, 
    ROLE_DETAILS_REQUEST, 
    ROLE_DETAILS_FAIL,
    ROLE_SAVE_REQUEST,
    ROLE_SAVE_SUCCESS,
    ROLE_SAVE_FAIL,
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_FAIL,

 } from '../constants/roleConstants';


function roleListReducer(state={roles:[]},action){
    // console.log(action.payload)
    switch(action.type){
        case ROLE_LIST_REQUEST:
            return { loading:true, roles:[] };
        case ROLE_LIST_SUCCESS:
            return { loading:false, roles:action.payload };
        case ROLE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function roleDetailsReducer(state={role:{}},action){
    switch(action.type){
        case ROLE_DETAILS_REQUEST:
            return { loading:true };
        case ROLE_DETAILS_SUCCESS:
            return { loading:false, role:action.payload };
        case ROLE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function roleSaveReducer(state={role:{}},action){
    switch(action.type){
        case ROLE_SAVE_REQUEST:
            return { loading:true };
        case ROLE_SAVE_SUCCESS:
            return { loading:false, success:true, role:action.payload };
        case ROLE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function roleDeleteReducer(state={role:{}},action){
    switch(action.type){
        case ROLE_DELETE_REQUEST:
            return { loading:true };
        case ROLE_DELETE_SUCCESS:
            return { loading:false, success:true, role:action.payload };
        case ROLE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    roleListReducer, 
    roleDetailsReducer,
    roleSaveReducer,
    roleDeleteReducer
 }; 
