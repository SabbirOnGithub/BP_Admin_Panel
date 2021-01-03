import { 
    MENU_LIST_REQUEST, 
    MENU_LIST_FAIL, 
    MENU_LIST_SUCCESS, 
    MENU_DETAILS_SUCCESS, 
    MENU_DETAILS_REQUEST, 
    MENU_DETAILS_FAIL,
    MENU_SAVE_REQUEST,
    MENU_SAVE_SUCCESS,
    MENU_SAVE_FAIL,
    MENU_DELETE_REQUEST,
    MENU_DELETE_SUCCESS,
    MENU_DELETE_FAIL,

 } from '../constants/menuConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listMenus = () => async (dispatch)=>{
    try{
        dispatch({type: MENU_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/Menu`);
        if (data.status === true) {
            dispatch({ type: MENU_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: MENU_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: MENU_LIST_FAIL, payload: error.message });

    }
};


const detailsMenu = (id)=> async (dispatch) =>{
    try{
        dispatch({type:MENU_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/Menu/" + id); 
        dispatch({type:MENU_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: MENU_DETAILS_FAIL, payload: error.message });
    }
};

const saveMenu = (item) => async (dispatch) =>{
    try{
        dispatch({type: MENU_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/Menu", item)
            if (data.status === true) {
                dispatch({type: MENU_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: MENU_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/Menu/", item);
            if (data.status === true) {
                dispatch({type: MENU_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: MENU_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: MENU_SAVE_FAIL, payload: error.message });
    }
};

const deleteMenu = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:MENU_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/Menu/" + id); 
        if (data.status === true) {
            dispatch({type:MENU_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: MENU_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: MENU_DELETE_FAIL, payload: error.message });
    }
};

export { listMenus, detailsMenu, saveMenu, deleteMenu }