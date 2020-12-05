import {
    HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_REQUEST,
    HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_FAIL,
    HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_SUCCESS,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_REQUEST,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_SUCCESS,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_FAIL,
    HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_REQUEST,
    HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_SUCCESS,
    HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_FAIL,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_REQUEST,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_SUCCESS,
    HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_FAIL,

} from '../constants/homePageFunctionAreaDetailConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listHomePageFunctionAreaDetails = () => async (dispatch) => {
    try {
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/HomePageFunctionAreaDetails');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_LIST_FAIL, payload: error.message });
    }
}


const detailsHomePageFunctionAreaDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/HomePageFunctionAreaDetails/" + id);
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_DETAILS_FAIL, payload: error.message });
    }
};

const saveHomePageFunctionAreaDetail = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/HomePageFunctionAreaDetails/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/HomePageFunctionAreaDetails/Update", item);
            console.log(data)
            if (data.status === true) {
                dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_SAVE_FAIL, payload: error.message });
    }
};

const deleteHomePageFunctionAreaDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/HomePageFunctionAreaDetails/" + id);
        if (data.status === true) {
            dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: HOME_PAGE_FUNCTION_AREA_DETAIL_DELETE_FAIL, payload: error.message });
    }
};


export { listHomePageFunctionAreaDetails, detailsHomePageFunctionAreaDetail, saveHomePageFunctionAreaDetail, deleteHomePageFunctionAreaDetail }