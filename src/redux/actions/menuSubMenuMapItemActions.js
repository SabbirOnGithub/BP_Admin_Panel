import { 
    MENU_SUBMENU_MAP_ITEM_LIST_REQUEST, 
    MENU_SUBMENU_MAP_ITEM_LIST_FAIL, 
    MENU_SUBMENU_MAP_ITEM_LIST_SUCCESS, 
    MENU_SUBMENU_MAP_ITEM_DETAILS_SUCCESS, 
    MENU_SUBMENU_MAP_ITEM_DETAILS_REQUEST, 
    MENU_SUBMENU_MAP_ITEM_DETAILS_FAIL,
    MENU_SUBMENU_MAP_ITEM_SAVE_REQUEST,
    MENU_SUBMENU_MAP_ITEM_SAVE_SUCCESS,
    MENU_SUBMENU_MAP_ITEM_SAVE_FAIL,
    MENU_SUBMENU_MAP_ITEM_DELETE_REQUEST,
    MENU_SUBMENU_MAP_ITEM_DELETE_SUCCESS,
    MENU_SUBMENU_MAP_ITEM_DELETE_FAIL,

 } from '../constants/menuSubMenuMapItemConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listMenuSubMenuMapItems = () => async (dispatch)=>{
    try{
        dispatch({type: MENU_SUBMENU_MAP_ITEM_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/MenuSubMenuMapItem`);
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_FAIL, payload: error.message });

    }
};


const detailsMenuSubMenuMapItem = (id)=> async (dispatch) =>{
    try{
        dispatch({type:MENU_SUBMENU_MAP_ITEM_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/MenuSubMenuMapItem/" + id); 
        dispatch({type:MENU_SUBMENU_MAP_ITEM_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: MENU_SUBMENU_MAP_ITEM_DETAILS_FAIL, payload: error.message });
    }
};

const saveMenuSubMenuMapItem = (item) => async (dispatch) =>{
    try{
        dispatch({type: MENU_SUBMENU_MAP_ITEM_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithToken.post("/MenuSubMenuMapItem", item)
            if (data.status === true) {
                dispatch({type: MENU_SUBMENU_MAP_ITEM_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: MENU_SUBMENU_MAP_ITEM_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/MenuSubMenuMapItem/", item);
            if (data.status === true) {
                dispatch({type: MENU_SUBMENU_MAP_ITEM_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: MENU_SUBMENU_MAP_ITEM_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: MENU_SUBMENU_MAP_ITEM_SAVE_FAIL, payload: error.message });
    }
};

const deleteMenuSubMenuMapItem = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:MENU_SUBMENU_MAP_ITEM_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/MenuSubMenuMapItem/" + id); 
        if (data.status === true) {
            dispatch({type:MENU_SUBMENU_MAP_ITEM_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: MENU_SUBMENU_MAP_ITEM_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: MENU_SUBMENU_MAP_ITEM_DELETE_FAIL, payload: error.message });
    }
};

export { listMenuSubMenuMapItems, detailsMenuSubMenuMapItem, saveMenuSubMenuMapItem, deleteMenuSubMenuMapItem }