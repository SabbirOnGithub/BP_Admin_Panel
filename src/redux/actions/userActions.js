import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAILED, 
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
} from "../constants/userConstants";
import {config} from "../../config";
import axios from 'axios';
import Cookie from 'js-cookie';
import { axiosWithoutToken } from "../../helpers/axios";

const BASE_API_URL = config.BASE_API_URL

const listUsers = () => async (dispatch)=>{
    try{
        dispatch({type: USER_LIST_REQUEST});
        const { data } = await axiosWithoutToken.get('/User');
        console.log(data)
        dispatch({ type: USER_LIST_SUCCESS, payload: data.data ? data.data : [] });
    }
    catch(error){
        dispatch({ type: USER_LIST_FAILED, payload: error.message });

    }
}


const registerUser = (name, email,password) => async(dispatch) => {
    dispatch({type:USER_REGISTER_REQUEST, payload:{name, email, password}});
    try{
        const {data} = await axios.post("/User", { name, email, password });
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        Cookie.set('userInfo', JSON.stringify(data));
    }
    catch(error){
        dispatch({ type:USER_REGISTER_FAILED, payload:error.message })
    }
};

const updateUser = ({ userId, name, email, password }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
    try {
        const { data } = await axios.put("/api/User/Update" + userId,
        { name, email, password }, {
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        }
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAILED, payload: error.message });
    }
};


// sign in method
const signin = (email,password) => async(dispatch) => {
    const username = email
    dispatch({type:USER_SIGNIN_REQUEST, payload:{ email, password }});
    try{
        const {data} = await axios.post(`${BASE_API_URL}/Auth/Login`, { username, password });
        if(data && data.data !== null){
            dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
            console.log(data.data.userInfo);
            // console.log(data.data.token);
            Cookie.set('userInfo', JSON.stringify(data.data.userInfo));
            Cookie.set('userToken', data.data.token);
        }else{
            dispatch({type:USER_SIGNIN_FAILED,payload:data.message})
        }
       
    }
    catch(error){
        dispatch({type:USER_SIGNIN_FAILED,payload:error.message})
    }
};

// sign-out in method
const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    Cookie.remove("userToken");
    dispatch({ type: USER_LOGOUT })
};
  



export { signin, registerUser, updateUser, logout, listUsers } ;