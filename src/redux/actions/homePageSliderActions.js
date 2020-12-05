import {
    HOMEPAGE_SLIDER_DELETE_FAIL,
    HOMEPAGE_SLIDER_DELETE_REQUEST,
    HOMEPAGE_SLIDER_DELETE_SUCCESS,
    HOMEPAGE_SLIDER_DETAILS_FAIL,
    HOMEPAGE_SLIDER_DETAILS_REQUEST,
    HOMEPAGE_SLIDER_DETAILS_SUCCESS,
    HOMEPAGE_SLIDER_LIST_FAIL,
    HOMEPAGE_SLIDER_LIST_REQUEST,
    HOMEPAGE_SLIDER_LIST_SUCCESS,
    HOMEPAGE_SLIDER_SAVE_FAIL,
    HOMEPAGE_SLIDER_SAVE_REQUEST,
    HOMEPAGE_SLIDER_SAVE_SUCCESS,

} from '../constants/homePageSliderConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import { config } from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listHomePageSliders = () => async (dispatch) => {
    try {
        dispatch({ type: HOMEPAGE_SLIDER_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/HomepageSlider`);
        if (data.status === true) {
            dispatch({ type: HOMEPAGE_SLIDER_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: HOMEPAGE_SLIDER_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch (error) {
        dispatch({ type: HOMEPAGE_SLIDER_LIST_FAIL, payload: error.message });
    }
};


const detailsHomePageSlider = (homePageSliderId) => async (dispatch) => {
    try {
        dispatch({ type: HOMEPAGE_SLIDER_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/HomepageSlider/" + homePageSliderId);
        dispatch({ type: HOMEPAGE_SLIDER_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: HOMEPAGE_SLIDER_DETAILS_FAIL, payload: error.message });
    }
};

const saveHomePageSlider = (homePageSlider, homePageSliderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: HOMEPAGE_SLIDER_SAVE_REQUEST, payload: homePageSlider })
        // const { userSignin: { userInfo } } = getState();

        if (!homePageSliderId) {
            //eslint-disable-next-line
            const formatHomePageData = delete homePageSlider.id;
            const { data } = await axiosWithToken.post("/HomepageSlider/Create", homePageSlider)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: HOMEPAGE_SLIDER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: HOMEPAGE_SLIDER_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithToken.put("/HomepageSlider/Update", homePageSlider);
            if (data.status === true) {
                dispatch({ type: HOMEPAGE_SLIDER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: HOMEPAGE_SLIDER_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: HOMEPAGE_SLIDER_SAVE_FAIL, payload: error.message });
    }
};

const deleteHomePageSlider = (homePageSliderId) => async (dispatch, getState) => {
    // console.log(homePageSliderId);
    // console.log(typeof (homePageSliderId));
    try {
        dispatch({ type: HOMEPAGE_SLIDER_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/HomepageSlider/" + homePageSliderId);
        if (data.status === true) {
            dispatch({ type: HOMEPAGE_SLIDER_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: HOMEPAGE_SLIDER_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: HOMEPAGE_SLIDER_DELETE_FAIL, payload: error.message });
    }
};

export { listHomePageSliders, detailsHomePageSlider, saveHomePageSlider, deleteHomePageSlider }