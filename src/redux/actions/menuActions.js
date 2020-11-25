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
        dispatch({ type: MENU_LIST_SUCCESS, payload: data.data ? data.data : [] });
        console.log(data.data)
    }
    catch(error){
        dispatch({ type: MENU_LIST_FAIL, payload: error.message });

    }
};


const detailsMenu = (menuId)=> async (dispatch) =>{
    try{
        dispatch({type:MENU_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/Menu/" + menuId); 
        dispatch({type:MENU_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: MENU_DETAILS_FAIL, payload: error.message });
    }
};

const saveMenu = (menu) => async (dispatch) =>{
    try{
        dispatch({type: MENU_SAVE_REQUEST, payload:menu })
        if(!menu.id){
        //eslint-disable-next-line
        const formatHomePageData = delete menu.id;
        // console.log(homePageData)
        const { data } = await axiosWithToken.post("/Menu", menu)
        dispatch({type: MENU_SAVE_SUCCESS, payload: data });


        }else{
            // const { data } = await axiosWithToken.put("/HomePage/" + homePageData.id , homePageData);
            const { data } = await axiosWithToken.put("/Menu/", menu);
            dispatch({type: MENU_SAVE_SUCCESS, payload: data });            

        }
        

        
    } catch (error) {
        console.log(error)
        dispatch({ type: MENU_SAVE_FAIL, payload: error.message });
    }
};

const deleteMenu = (menuId)=> async (dispatch, getState) =>{
    console.log(menuId);
    console.log(typeof(menuId));
    try{
        dispatch({type:MENU_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/Menu/" + menuId); 
        if(data){
            dispatch({type:MENU_DELETE_SUCCESS, payload: data, success:true });
        }
    }
    catch(error){
        dispatch({ type: MENU_DELETE_FAIL, payload: error.message });
    }
};

export { listMenus, detailsMenu, saveMenu, deleteMenu }