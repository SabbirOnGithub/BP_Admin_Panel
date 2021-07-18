import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_SAVE_REQUEST, 
    USER_SAVE_SUCCESS, 
    USER_SAVE_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_PASSWORD_RECOVERY_REQUEST,
    USER_PASSWORD_RECOVERY_SUCCESS,
    USER_PASSWORD_RECOVERY_FAIL,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_ACCEPT_CLIENT_LIST_REQUEST,
    USER_ACCEPT_CLIENT_LIST_SUCCESS,
    USER_ACCEPT_CLIENT_LIST_FAIL 
} from "../constants/userConstants";
import {config} from "../../config";
import Cookie from 'js-cookie';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from "../../helpers/axios";

const BASE_API_URL = config.BASE_API_URL

const listUsers = (item) => async (dispatch) => {

    if(item){
        // console.log(item)
        try {
            dispatch({ type: USER_LIST_REQUEST });
            const { data } = await axiosWithToken.post(`/User/search`, item);
            if (data.status === true) {
                dispatch({ type: USER_LIST_SUCCESS, payload: data?.data?.item1 ? data.data : [] });
                // console.log(data.data)
            } else {
                dispatch({ type: USER_LIST_FAIL, payload: data.message });
            }
            // console.log(data.data)
        }
        catch (error) {
            dispatch({ type: USER_LIST_FAIL, payload: error.message });
        }

    }else{
        try {
            dispatch({ type: USER_LIST_REQUEST });
            const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/User/searchAll`);
            if (data.status === true) {
                dispatch({ type: USER_LIST_SUCCESS, payload: data?.data?.item1 ? data.data.item1?.reverse() : [] });
                // console.log(data)
            } else {
                dispatch({ type: USER_LIST_FAIL, payload: data.message });
            }
            // console.log(data.data)
        }
        catch (error) {
            dispatch({ type: USER_LIST_FAIL, payload: error.message });
        }

    }
    
};
const listAcceptClientUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_ACCEPT_CLIENT_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/User/UserDropdownList`);
        if (data.status === true) {
            dispatch({ type: USER_ACCEPT_CLIENT_LIST_SUCCESS, payload: data?.data });
            // console.log(data)
        } else {
            dispatch({ type: USER_ACCEPT_CLIENT_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
        return data
    }
    catch (error) {
        dispatch({ type: USER_ACCEPT_CLIENT_LIST_FAIL, payload: error.message });
    }
    
};
const detailsUser = (id)=> async (dispatch) =>{
    if(id){
        try{
            dispatch({type:USER_DETAILS_REQUEST, payload: id});
            if(id){
                const { data } = await axiosWithToken.get("/User/detail/" + id); 
                dispatch({type:USER_DETAILS_SUCCESS, payload: data.data });
                // console.log(data)
            }
        }
        catch(error){
            dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
        }
    }else{
        // console.log('id not found')
    }
   
};

// register and update user
const saveUser = (item, id) => async (dispatch) => {
    // console.log(item)
    try {
        dispatch({ type: USER_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithToken.post("/User/AddUser", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: USER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: USER_SAVE_FAIL, payload: data.message });
            }
        } else {
            console.log('update')
            // Display the values
            // for (var value of item.values()) {
            //     console.log(value);
            // }
            const { data } = await axiosWithTokenAndMultipartData.put("/User/UpdateUser", item);
            if (data.status === true) {
                await Promise.all([
                    dispatch({type: USER_UPDATE_SUCCESS, payload:data.data}), // <-- async dispatch chaining in action
                    dispatch({ type: USER_SAVE_SUCCESS, payload: data })
                  ]);
                Cookie.set('userInfo', JSON.stringify({...JSON.parse(Cookie.get('userInfo')),...data.data, userImage:data?.data?.photo}))
                return data
            } else {
                dispatch({ type: USER_SAVE_FAIL, payload: data.message });
            }
        }

    } catch (error) {
        console.log(error)
        dispatch({ type: USER_SAVE_FAIL, payload: error.message });
    }
};

// no store used for this action
const saveRecoverPassword = (item, id) => async (dispatch) => {
    // console.log(item)
    try {
        dispatch({ type: USER_PASSWORD_RECOVERY_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithoutToken.post("/User/SendPasswordRecoveryCode", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: USER_PASSWORD_RECOVERY_SUCCESS, payload: data });
            } else {
                dispatch({ type: USER_PASSWORD_RECOVERY_FAIL, payload: data.message });
            }
            console.log(data)
            return data
        } else {
            console.log('update')
        }

    } catch (error) {
        console.log(error)
        dispatch({ type: USER_PASSWORD_RECOVERY_FAIL, payload: error.message });
    }
};

// no store used for this action
const saveResetPassword = (item, id) => async (dispatch) => {
    console.log(item)
    try {
        dispatch({ type: USER_RESET_PASSWORD_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithoutToken.post("/User/ResetPassword", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
            } else {
                dispatch({ type: USER_RESET_PASSWORD_FAIL, payload: data.message });
            }
            console.log(data)
            return data
        } 
    } catch (error) {
        console.log(error)
        dispatch({ type: USER_RESET_PASSWORD_FAIL, payload: error.message });
    }
};
const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/User/" + id);
        if (data) {
            dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: USER_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: error.message });
    }
};
// sign in method
const signin = (email,password) => async(dispatch) => {
    const username = email
    dispatch({type:USER_SIGNIN_REQUEST, payload:{ email, password }});
    try{
        const {data} = await axiosWithoutToken.post(`${BASE_API_URL}/Auth/Login`, { username, password });
        if(data && data.data !== null){
            dispatch({type:USER_SIGNIN_SUCCESS,payload:data.data});
            Cookie.set('userInfo', JSON.stringify(data.data));
            Cookie.set('userToken', data.data.token);
            // console.log(data.data);
        }else{
            dispatch({type:USER_SIGNIN_FAIL,payload:data.message})
        }
        // console.log(data)
       
    }
    catch(error){
        dispatch({type:USER_SIGNIN_FAIL,payload:error.message})
    }
};

// sign-out in method
const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    Cookie.remove("userToken");
    dispatch({ type: USER_LOGOUT })
};
  



export { signin, logout, listUsers, saveUser, detailsUser, deleteUser, saveRecoverPassword, saveResetPassword, listAcceptClientUsers } ;