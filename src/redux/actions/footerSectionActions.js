import {
    FOOTER_SECTION_LIST_REQUEST,
    FOOTER_SECTION_LIST_FAIL,
    FOOTER_SECTION_LIST_SUCCESS,
    FOOTER_SECTION_DETAILS_SUCCESS,
    FOOTER_SECTION_DETAILS_REQUEST,
    FOOTER_SECTION_DETAILS_FAIL,
    FOOTER_SECTION_SAVE_REQUEST,
    FOOTER_SECTION_SAVE_SUCCESS,
    FOOTER_SECTION_SAVE_FAIL,
    FOOTER_SECTION_DELETE_REQUEST,
    FOOTER_SECTION_DELETE_SUCCESS,
    FOOTER_SECTION_DELETE_FAIL,

} from '../constants/footerSectionConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import { config } from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listFooterSections = () => async (dispatch) => {
    try {
        dispatch({ type: FOOTER_SECTION_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/FooterSection`);
        if (data.status === true) {
            dispatch({ type: FOOTER_SECTION_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: FOOTER_SECTION_LIST_FAIL, payload: data.message });
        }
        console.log(data.data)
    }
    catch (error) {
        dispatch({ type: FOOTER_SECTION_LIST_FAIL, payload: error.message });
    }
};


const detailsFooterSection = (footerSectionId) => async (dispatch) => {
    try {
        dispatch({ type: FOOTER_SECTION_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/FooterSection/detail/" + footerSectionId);
        dispatch({ type: FOOTER_SECTION_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: FOOTER_SECTION_DETAILS_FAIL, payload: error.message });
    }
};

const saveFooterSection = (footerSection) => async (dispatch) => {
    try {
        dispatch({ type: FOOTER_SECTION_SAVE_REQUEST, payload: footerSection })
        if (!footerSection.id) {
            //eslint-disable-next-line
            const formatHomePageData = delete footerSection.id;
            const { data } = await axiosWithToken.post("/FooterSection", footerSection)
            console.log(data)
            if (data.status === true) {
                dispatch({ type: FOOTER_SECTION_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: FOOTER_SECTION_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithToken.put("/FooterSection", footerSection);
            if (data.status === true) {
                dispatch({ type: FOOTER_SECTION_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: FOOTER_SECTION_SAVE_FAIL, payload: data.message });
            }
        }

    } catch (error) {
        console.log(error)
        dispatch({ type: FOOTER_SECTION_SAVE_FAIL, payload: error.message });
    }
};

const deleteFooterSection = (footerSectionId) => async (dispatch, getState) => {
    // console.log(footerSectionId);
    // console.log(typeof(footerSectionId));
    try {
        dispatch({ type: FOOTER_SECTION_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/FooterSection/" + footerSectionId);
        if (data.status === true) {
            dispatch({ type: FOOTER_SECTION_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: FOOTER_SECTION_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: FOOTER_SECTION_DELETE_FAIL, payload: error.message });
    }
};

export { listFooterSections, detailsFooterSection, saveFooterSection, deleteFooterSection }