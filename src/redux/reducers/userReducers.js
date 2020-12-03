const { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_FAILED, 
    USER_SIGNIN_SUCCESS, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAILED,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILED,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAILED,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL, 
} = require("../constants/userConstants");

function userListReducer(state={users:[]},action){
    switch(action.type){
        case USER_LIST_REQUEST:
            return { loading:true, users:[] };
        case USER_LIST_SUCCESS:
            return { loading:false, users:action.payload };
        case USER_LIST_FAILED:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function userDetailsReducer(state={user:{}},action){
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return { loading:true };
        case USER_DETAILS_SUCCESS:
            return { loading:false, user:action.payload };
        case USER_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function userUpdateReducer(state = {}, action) {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_UPDATE_FAILED:
        return { loading: false, error: action.payload };
      default: return state;
    }
};

function userDeleteReducer(state={userInfo:{}},action){
    switch(action.type){
        case USER_DELETE_REQUEST:
            return { loading:true };
        case USER_DELETE_SUCCESS:
            return { loading:false, success:true, userInfo:action.payload };
        case USER_DELETE_FAILED:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

const userSigninReducer = ( state={}, action ) =>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return{loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo:action.payload};
        case USER_SIGNIN_FAILED:
            return {loading: false, error:action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;

    }
};

const userRegisterReducer = ( state={}, action ) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return{loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo:action.payload};
        case USER_REGISTER_FAILED:
            return {loading: false, error:action.payload};
        default:
            return state;

    }
};

export { userSigninReducer, userRegisterReducer, userUpdateReducer, userListReducer, userDeleteReducer,userDetailsReducer };