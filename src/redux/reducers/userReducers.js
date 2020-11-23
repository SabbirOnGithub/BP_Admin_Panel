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
} = require("../constants/userConstants");

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
  
export { userSigninReducer, userRegisterReducer, userUpdateReducer };