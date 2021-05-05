import {
    MENU_HERO_SLIDER_DELETE_FAIL,
    MENU_HERO_SLIDER_DELETE_REQUEST,
    MENU_HERO_SLIDER_DELETE_SUCCESS,
    MENU_HERO_SLIDER_DETAILS_FAIL,
    MENU_HERO_SLIDER_DETAILS_REQUEST,
    MENU_HERO_SLIDER_DETAILS_SUCCESS,
    MENU_HERO_SLIDER_LIST_FAIL,
    MENU_HERO_SLIDER_LIST_REQUEST,
    MENU_HERO_SLIDER_LIST_SUCCESS,
    MENU_HERO_SLIDER_SAVE_FAIL,
    MENU_HERO_SLIDER_SAVE_REQUEST,
    MENU_HERO_SLIDER_SAVE_SUCCESS,

} from '../constants/menuHeroSliderConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import { config } from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listMenuHeroSliders = () => async (dispatch) => {
    try {
        dispatch({ type: MENU_HERO_SLIDER_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/MenuHeroSlider`);
        if (data.status === true) {
            dispatch({ type: MENU_HERO_SLIDER_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        } else {
            dispatch({ type: MENU_HERO_SLIDER_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MENU_HERO_SLIDER_LIST_FAIL, payload: error.message });
    }
};


const detailsMenuHeroSlider = (id) => async (dispatch) => {
    try {
        dispatch({ type: MENU_HERO_SLIDER_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/MenuHeroSlider/" + id);
        dispatch({ type: MENU_HERO_SLIDER_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: MENU_HERO_SLIDER_DETAILS_FAIL, payload: error.message });
    }
};

const saveMenuHeroSlider = (item, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MENU_HERO_SLIDER_SAVE_REQUEST, payload: item })
        // const { userSignin: { userInfo } } = getState();

        if (!id) {
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithToken.post("/MenuHeroSlider/Create", item)
            if (data.status === true) {
                dispatch({ type: MENU_HERO_SLIDER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: MENU_HERO_SLIDER_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithToken.put("/MenuHeroSlider/Update", item);
            if (data.status === true) {
                dispatch({ type: MENU_HERO_SLIDER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: MENU_HERO_SLIDER_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: MENU_HERO_SLIDER_SAVE_FAIL, payload: error.message });
    }
};

const deleteMenuHeroSlider = (id) => async (dispatch, getState) => {
    
    try {
        dispatch({ type: MENU_HERO_SLIDER_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/MenuHeroSlider/" + id);
        if (data.status === true) {
            dispatch({ type: MENU_HERO_SLIDER_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: MENU_HERO_SLIDER_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MENU_HERO_SLIDER_DELETE_FAIL, payload: error.message });
    }
};

export { listMenuHeroSliders, detailsMenuHeroSlider, saveMenuHeroSlider, deleteMenuHeroSlider }