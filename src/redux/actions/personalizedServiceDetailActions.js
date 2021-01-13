import {
    PERSONALIZED_SERVICE_DETAIL_LIST_REQUEST,
    PERSONALIZED_SERVICE_DETAIL_LIST_FAIL,
    PERSONALIZED_SERVICE_DETAIL_LIST_SUCCESS,
    PERSONALIZED_SERVICE_DETAIL_DETAILS_REQUEST,
    PERSONALIZED_SERVICE_DETAIL_DETAILS_SUCCESS,
    PERSONALIZED_SERVICE_DETAIL_DETAILS_FAIL,
    PERSONALIZED_SERVICE_DETAIL_SAVE_REQUEST,
    PERSONALIZED_SERVICE_DETAIL_SAVE_SUCCESS,
    PERSONALIZED_SERVICE_DETAIL_SAVE_FAIL,
    PERSONALIZED_SERVICE_DETAIL_DELETE_REQUEST,
    PERSONALIZED_SERVICE_DETAIL_DELETE_SUCCESS,
    PERSONALIZED_SERVICE_DETAIL_DELETE_FAIL,

} from '../constants/personalizedServiceDetailConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listPersonalizedServiceDetails = () => async (dispatch) => {
    try {
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/PersonalizedServiceDetail');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: PERSONALIZED_SERVICE_DETAIL_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: PERSONALIZED_SERVICE_DETAIL_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_LIST_FAIL, payload: error.message });
    }
}


const detailsPersonalizedServiceDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/PersonalizedServiceDetail/" + id);
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_DETAILS_FAIL, payload: error.message });
    }
};

const savePersonalizedServiceDetail = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/PersonalizedServiceDetail/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: PERSONALIZED_SERVICE_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: PERSONALIZED_SERVICE_DETAIL_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/PersonalizedServiceDetail/Update", item);
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: PERSONALIZED_SERVICE_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: PERSONALIZED_SERVICE_DETAIL_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_SAVE_FAIL, payload: error.message });
    }
};

const deletePersonalizedServiceDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/PersonalizedServiceDetail/" + id);
        if (data) {
            dispatch({ type: PERSONALIZED_SERVICE_DETAIL_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: PERSONALIZED_SERVICE_DETAIL_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: PERSONALIZED_SERVICE_DETAIL_DELETE_FAIL, payload: error.message });
    }
};


export { listPersonalizedServiceDetails, detailsPersonalizedServiceDetail, savePersonalizedServiceDetail, deletePersonalizedServiceDetail }