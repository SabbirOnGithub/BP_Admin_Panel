import { 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_REQUEST, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_FAIL, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_SUCCESS, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_SUCCESS, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_REQUEST, 
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_FAIL,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_REQUEST,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_SUCCESS,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_FAIL,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_REQUEST,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_SUCCESS,
    MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_FAIL,

 } from '../constants/menuSubMenuMapItemListItemConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listMenuSubMenuMapItemListItems = () => async (dispatch)=>{
    try{
        dispatch({type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/MenuSubMenuMapItemListItem`);
        console.log(data.data)

        if (data.status === true) {
            dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_LIST_FAIL, payload: error.message });

    }
};


const detailsMenuSubMenuMapItemListItem = (id)=> async (dispatch) =>{
    try{
        dispatch({type:MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/MenuSubMenuMapItemListItem/" + id); 
        dispatch({type:MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DETAILS_FAIL, payload: error.message });
    }
};

const saveMenuSubMenuMapItemListItem = (item) => async (dispatch) =>{
    try{
        dispatch({type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_REQUEST, payload:item })
        if(!item.id){
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithToken.post("/MenuSubMenuMapItemListItem", item)
            console.log(data)
            if (data.status === true) {
                dispatch({type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/MenuSubMenuMapItemListItem/", item);
            if (data.status === true) {
                dispatch({type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_SAVE_FAIL, payload: error.message });
    }
};

const deleteMenuSubMenuMapItemListItem = (id) => async (dispatch) =>{
    try{
        dispatch({type:MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/MenuSubMenuMapItemListItem/" + id); 
        if (data.status === true) {
            dispatch({type:MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: MENU_SUBMENU_MAP_ITEM_LIST_ITEM_DELETE_FAIL, payload: error.message });
    }
};

export { listMenuSubMenuMapItemListItems, detailsMenuSubMenuMapItemListItem, saveMenuSubMenuMapItemListItem, deleteMenuSubMenuMapItemListItem }