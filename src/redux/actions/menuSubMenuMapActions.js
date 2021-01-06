import {
    MENU_SUBMENU_MAP_DELETE_FAIL,
    MENU_SUBMENU_MAP_DELETE_REQUEST,
    MENU_SUBMENU_MAP_DELETE_SUCCESS,
    MENU_SUBMENU_MAP_DETAILS_FAIL,
    MENU_SUBMENU_MAP_DETAILS_REQUEST,
    MENU_SUBMENU_MAP_DETAILS_SUCCESS,
    MENU_SUBMENU_MAP_LIST_FAIL,
    MENU_SUBMENU_MAP_LIST_REQUEST,
    MENU_SUBMENU_MAP_LIST_SUCCESS,
    MENU_SUBMENU_MAP_SAVE_FAIL,
    MENU_SUBMENU_MAP_SAVE_REQUEST,
    MENU_SUBMENU_MAP_SAVE_SUCCESS,

} from '../constants/menuSubMenuMapConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import { config } from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listMenuSubMenuMaps = () => async (dispatch) => {
    try {
        dispatch({ type: MENU_SUBMENU_MAP_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/MenuSubMenuMap`);
        if (data.status === true) {
            dispatch({ type: MENU_SUBMENU_MAP_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: MENU_SUBMENU_MAP_LIST_FAIL, payload: data.message });
        }
        console.log(data.data)
    }
    catch (error) {
        dispatch({ type: MENU_SUBMENU_MAP_LIST_FAIL, payload: error.message });
    }
};


const detailsMenuSubMenuMap = (id) => async (dispatch) => {
    try {
        dispatch({ type: MENU_SUBMENU_MAP_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/MenuSubMenuMap/" + id);
        dispatch({ type: MENU_SUBMENU_MAP_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: MENU_SUBMENU_MAP_DETAILS_FAIL, payload: error.message });
    }
};

const saveMenuSubMenuMap = (item, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MENU_SUBMENU_MAP_SAVE_REQUEST, payload: item })
        // const { userSignin: { userInfo } } = getState();

        if (!id) {
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithToken.post("/MenuSubMenuMap/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: MENU_SUBMENU_MAP_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: MENU_SUBMENU_MAP_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithToken.put("/MenuSubMenuMap/Update", item);
            if (data.status === true) {
                dispatch({ type: MENU_SUBMENU_MAP_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: MENU_SUBMENU_MAP_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: MENU_SUBMENU_MAP_SAVE_FAIL, payload: error.message });
    }
};

const deleteMenuSubMenuMap = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MENU_SUBMENU_MAP_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/MenuSubMenuMap/" + id);
        if (data.status === true) {
            dispatch({ type: MENU_SUBMENU_MAP_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: MENU_SUBMENU_MAP_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MENU_SUBMENU_MAP_DELETE_FAIL, payload: error.message });
    }
};

export { listMenuSubMenuMaps, detailsMenuSubMenuMap, saveMenuSubMenuMap, deleteMenuSubMenuMap }