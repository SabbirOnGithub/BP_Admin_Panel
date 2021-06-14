import {
    TECHNOLOGY_PARTNER_DELETE_FAIL,
    TECHNOLOGY_PARTNER_DELETE_REQUEST,
    TECHNOLOGY_PARTNER_DELETE_SUCCESS,
    TECHNOLOGY_PARTNER_DETAILS_FAIL,
    TECHNOLOGY_PARTNER_DETAILS_REQUEST,
    TECHNOLOGY_PARTNER_DETAILS_SUCCESS,
    TECHNOLOGY_PARTNER_LIST_FAIL,
    TECHNOLOGY_PARTNER_LIST_REQUEST,
    TECHNOLOGY_PARTNER_LIST_SUCCESS,
    TECHNOLOGY_PARTNER_SAVE_FAIL,
    TECHNOLOGY_PARTNER_SAVE_REQUEST,
    TECHNOLOGY_PARTNER_SAVE_SUCCESS,

} from '../constants/technologyPartnerConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import { config } from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listTechnologyPartners = () => async (dispatch) => {
    try {
        dispatch({ type: TECHNOLOGY_PARTNER_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/TechnologyPartner`);
        if (data.status === true) {
            dispatch({ type: TECHNOLOGY_PARTNER_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        } else {
            dispatch({ type: TECHNOLOGY_PARTNER_LIST_FAIL, payload: data.message });
        }
        // console.log(data)
    }
    catch (error) {
        dispatch({ type: TECHNOLOGY_PARTNER_LIST_FAIL, payload: error.message });
    }
};


const detailsTechnologyPartner = (id) => async (dispatch) => {
    try {
        dispatch({ type: TECHNOLOGY_PARTNER_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/TechnologyPartner/" + id);
        dispatch({ type: TECHNOLOGY_PARTNER_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: TECHNOLOGY_PARTNER_DETAILS_FAIL, payload: error.message });
    }
};

const saveTechnologyPartner = (item, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TECHNOLOGY_PARTNER_SAVE_REQUEST, payload: item })
        // const { userSignin: { userInfo } } = getState();

        if (!id) {
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithToken.post("/TechnologyPartner/Create", item)
            if (data.status === true) {
                dispatch({ type: TECHNOLOGY_PARTNER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: TECHNOLOGY_PARTNER_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithToken.put("/TechnologyPartner/Update", item);
            if (data.status === true) {
                dispatch({ type: TECHNOLOGY_PARTNER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: TECHNOLOGY_PARTNER_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TECHNOLOGY_PARTNER_SAVE_FAIL, payload: error.message });
    }
};

const deleteTechnologyPartner = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TECHNOLOGY_PARTNER_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/TechnologyPartner/" + id);
        if (data.status === true) {
            dispatch({ type: TECHNOLOGY_PARTNER_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: TECHNOLOGY_PARTNER_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TECHNOLOGY_PARTNER_DELETE_FAIL, payload: error.message });
    }
};

export { listTechnologyPartners, detailsTechnologyPartner, saveTechnologyPartner, deleteTechnologyPartner }