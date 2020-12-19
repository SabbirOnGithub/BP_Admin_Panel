import {
    MENU_SECTION_DELETE_FAIL,
    MENU_SECTION_DELETE_REQUEST,
    MENU_SECTION_DELETE_SUCCESS,
    MENU_SECTION_DETAILS_FAIL,
    MENU_SECTION_DETAILS_REQUEST,
    MENU_SECTION_DETAILS_SUCCESS,
    MENU_SECTION_LIST_FAIL,
    MENU_SECTION_LIST_REQUEST,
    MENU_SECTION_LIST_SUCCESS,
    MENU_SECTION_SAVE_FAIL,
    MENU_SECTION_SAVE_REQUEST,
    MENU_SECTION_SAVE_SUCCESS,

} from '../constants/menuSectionConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import { config } from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listMenuSections = () => async (dispatch) => {
    try {
        dispatch({ type: MENU_SECTION_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/MenuSection`);
        if (data.status === true) {
            dispatch({ type: MENU_SECTION_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: MENU_SECTION_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MENU_SECTION_LIST_FAIL, payload: error.message });
    }
};


const detailsMenuSection = (id) => async (dispatch) => {
    try {
        dispatch({ type: MENU_SECTION_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/MenuSection/" + id);
        dispatch({ type: MENU_SECTION_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: MENU_SECTION_DETAILS_FAIL, payload: error.message });
    }
};

const saveMenuSection = (item, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MENU_SECTION_SAVE_REQUEST, payload: item })
        // const { userSignin: { userInfo } } = getState();

        if (!id) {
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithToken.post("/MenuSection/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: MENU_SECTION_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: MENU_SECTION_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithToken.put("/MenuSection/Update", item);
            if (data.status === true) {
                dispatch({ type: MENU_SECTION_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: MENU_SECTION_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: MENU_SECTION_SAVE_FAIL, payload: error.message });
    }
};

const deleteMenuSection = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MENU_SECTION_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/MenuSection/" + id);
        if (data.status === true) {
            dispatch({ type: MENU_SECTION_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: MENU_SECTION_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MENU_SECTION_DELETE_FAIL, payload: error.message });
    }
};

export { listMenuSections, detailsMenuSection, saveMenuSection, deleteMenuSection }