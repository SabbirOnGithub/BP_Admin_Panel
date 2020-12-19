import {
    MENU_SUBMENU_MAP_DETAIL_DELETE_FAIL,
    MENU_SUBMENU_MAP_DETAIL_DELETE_REQUEST,
    MENU_SUBMENU_MAP_DETAIL_DELETE_SUCCESS,
    MENU_SUBMENU_MAP_DETAIL_DETAILS_FAIL,
    MENU_SUBMENU_MAP_DETAIL_DETAILS_REQUEST,
    MENU_SUBMENU_MAP_DETAIL_DETAILS_SUCCESS,
    MENU_SUBMENU_MAP_DETAIL_LIST_FAIL,
    MENU_SUBMENU_MAP_DETAIL_LIST_REQUEST,
    MENU_SUBMENU_MAP_DETAIL_LIST_SUCCESS,
    MENU_SUBMENU_MAP_DETAIL_SAVE_FAIL,
    MENU_SUBMENU_MAP_DETAIL_SAVE_REQUEST,
    MENU_SUBMENU_MAP_DETAIL_SAVE_SUCCESS,

} from '../constants/menuSubMenuMapDetailConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import { config } from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listMenuSubMenuMapDetails = () => async (dispatch) => {
    try {
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/MenuSubMenuMapDetail`);
        if (data.status === true) {
            dispatch({ type: MENU_SUBMENU_MAP_DETAIL_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: MENU_SUBMENU_MAP_DETAIL_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_LIST_FAIL, payload: error.message });
    }
};


const detailsMenuSubMenuMapDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/MenuSubMenuMapDetail/" + id);
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_DETAILS_FAIL, payload: error.message });
    }
};

const saveMenuSubMenuMapDetail = (item, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_SAVE_REQUEST, payload: item })
        // const { userSignin: { userInfo } } = getState();

        if (!id) {
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithToken.post("/MenuSubMenuMapDetail/Create", item)
            if (data.status === true) {
                dispatch({ type: MENU_SUBMENU_MAP_DETAIL_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: MENU_SUBMENU_MAP_DETAIL_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithToken.put("/MenuSubMenuMapDetail/Update", item);
            if (data.status === true) {
                dispatch({ type: MENU_SUBMENU_MAP_DETAIL_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: MENU_SUBMENU_MAP_DETAIL_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_SAVE_FAIL, payload: error.message });
    }
};

const deleteMenuSubMenuMapDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/MenuSubMenuMapDetail/" + id);
        if (data.status === true) {
            dispatch({ type: MENU_SUBMENU_MAP_DETAIL_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: MENU_SUBMENU_MAP_DETAIL_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MENU_SUBMENU_MAP_DETAIL_DELETE_FAIL, payload: error.message });
    }
};

export { listMenuSubMenuMapDetails, detailsMenuSubMenuMapDetail, saveMenuSubMenuMapDetail, deleteMenuSubMenuMapDetail }