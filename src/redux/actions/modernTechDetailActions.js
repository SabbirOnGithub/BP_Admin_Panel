import {
    MODERN_TECH_DETAIL_LIST_REQUEST,
    MODERN_TECH_DETAIL_LIST_FAIL,
    MODERN_TECH_DETAIL_LIST_SUCCESS,
    MODERN_TECH_DETAIL_DETAILS_REQUEST,
    MODERN_TECH_DETAIL_DETAILS_SUCCESS,
    MODERN_TECH_DETAIL_DETAILS_FAIL,
    MODERN_TECH_DETAIL_SAVE_REQUEST,
    MODERN_TECH_DETAIL_SAVE_SUCCESS,
    MODERN_TECH_DETAIL_SAVE_FAIL,
    MODERN_TECH_DETAIL_DELETE_REQUEST,
    MODERN_TECH_DETAIL_DELETE_SUCCESS,
    MODERN_TECH_DETAIL_DELETE_FAIL,

} from '../constants/modernTechDetailConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listModernTechDetails = () => async (dispatch) => {
    try {
        dispatch({ type: MODERN_TECH_DETAIL_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/ModernTechDetail');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: MODERN_TECH_DETAIL_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        } else {
            dispatch({ type: MODERN_TECH_DETAIL_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MODERN_TECH_DETAIL_LIST_FAIL, payload: error.message });
    }
}


const detailsModernTechDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: MODERN_TECH_DETAIL_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/ModernTechDetail/" + id);
        dispatch({ type: MODERN_TECH_DETAIL_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: MODERN_TECH_DETAIL_DETAILS_FAIL, payload: error.message });
    }
};

const saveModernTechDetail = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: MODERN_TECH_DETAIL_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/ModernTechDetail/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: MODERN_TECH_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: MODERN_TECH_DETAIL_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/ModernTechDetail/Update", item);
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: MODERN_TECH_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: MODERN_TECH_DETAIL_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: MODERN_TECH_DETAIL_SAVE_FAIL, payload: error.message });
    }
};

const deleteModernTechDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MODERN_TECH_DETAIL_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/ModernTechDetail/" + id);
        if (data) {
            dispatch({ type: MODERN_TECH_DETAIL_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: MODERN_TECH_DETAIL_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: MODERN_TECH_DETAIL_DELETE_FAIL, payload: error.message });
    }
};


export { listModernTechDetails, detailsModernTechDetail, saveModernTechDetail, deleteModernTechDetail }