import {
    ROLE_LIST_REQUEST,
    ROLE_LIST_FAIL,
    ROLE_LIST_SUCCESS,
    ROLE_DETAILS_SUCCESS,
    ROLE_DETAILS_REQUEST,
    ROLE_DETAILS_FAIL,
    ROLE_SAVE_REQUEST,
    ROLE_SAVE_SUCCESS,
    ROLE_SAVE_FAIL,
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_FAIL,

} from '../constants/roleConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import { config } from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listRoles = () => async (dispatch) => {
    try {
        dispatch({ type: ROLE_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/Role`);
        if (data.status === true) {
            dispatch({ type: ROLE_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: ROLE_LIST_FAIL, payload: data.message });
        }
        console.log(data.data)
    }
    catch (error) {
        dispatch({ type: ROLE_LIST_FAIL, payload: error.message });
    }
};


const detailsRole = (roleId) => async (dispatch) => {
    try {
        dispatch({ type: ROLE_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/Role/detail/" + roleId);
        dispatch({ type: ROLE_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: ROLE_DETAILS_FAIL, payload: error.message });
    }
};

const saveRole = (item) => async (dispatch) => {
    try {
        dispatch({ type: ROLE_SAVE_REQUEST, payload: item })
        if (!item.id) {
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithToken.post("/Role", item)
            console.log(data)
            if (data.status === true) {
                dispatch({ type: ROLE_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: ROLE_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithToken.put("/Role", item);
            if (data.status === true) {
                dispatch({ type: ROLE_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: ROLE_SAVE_FAIL, payload: data.message });
            }
        }

    } catch (error) {
        console.log(error)
        dispatch({ type: ROLE_SAVE_FAIL, payload: error.message });
    }
};

const deleteRole = (roleId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROLE_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/Role/" + roleId);
        if (data.status === true) {
            dispatch({ type: ROLE_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: ROLE_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: ROLE_DELETE_FAIL, payload: error.message });
    }
};

export { listRoles, detailsRole, saveRole, deleteRole }