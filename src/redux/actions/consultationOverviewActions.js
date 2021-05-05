import {
    CONSULTATION_OVERVIEW_LIST_REQUEST,
    CONSULTATION_OVERVIEW_LIST_FAIL,
    CONSULTATION_OVERVIEW_LIST_SUCCESS,
    CONSULTATION_OVERVIEW_DETAILS_REQUEST,
    CONSULTATION_OVERVIEW_DETAILS_SUCCESS,
    CONSULTATION_OVERVIEW_DETAILS_FAIL,
    CONSULTATION_OVERVIEW_SAVE_REQUEST,
    CONSULTATION_OVERVIEW_SAVE_SUCCESS,
    CONSULTATION_OVERVIEW_SAVE_FAIL,
    CONSULTATION_OVERVIEW_DELETE_REQUEST,
    CONSULTATION_OVERVIEW_DELETE_SUCCESS,
    CONSULTATION_OVERVIEW_DELETE_FAIL,

} from '../constants/consultationOverviewConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listConsultationOverview = () => async (dispatch) => {
    try {
        dispatch({ type: CONSULTATION_OVERVIEW_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/ConsultationOverview');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: CONSULTATION_OVERVIEW_LIST_SUCCESS, payload: data.data?.reverse() ? data.data : [] });
        } else {
            dispatch({ type: CONSULTATION_OVERVIEW_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: CONSULTATION_OVERVIEW_LIST_FAIL, payload: error.message });
    }
}


const detailsConsultationOverview = (id) => async (dispatch) => {
    try {
        dispatch({ type: CONSULTATION_OVERVIEW_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/ConsultationOverview/" + id);
        dispatch({ type: CONSULTATION_OVERVIEW_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CONSULTATION_OVERVIEW_DETAILS_FAIL, payload: error.message });
    }
};

const saveConsultationOverview = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: CONSULTATION_OVERVIEW_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/ConsultationOverview/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: CONSULTATION_OVERVIEW_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: CONSULTATION_OVERVIEW_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/ConsultationOverview/Update", item);
            console.log(data)
            if (data.status === true) {
                dispatch({ type: CONSULTATION_OVERVIEW_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: CONSULTATION_OVERVIEW_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CONSULTATION_OVERVIEW_SAVE_FAIL, payload: error.message });
    }
};

const deleteConsultationOverview = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONSULTATION_OVERVIEW_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/ConsultationOverview/" + id);
        if (data.status === true) {
            dispatch({ type: CONSULTATION_OVERVIEW_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: CONSULTATION_OVERVIEW_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: CONSULTATION_OVERVIEW_DELETE_FAIL, payload: error.message });
    }
};


export { listConsultationOverview, detailsConsultationOverview, saveConsultationOverview, deleteConsultationOverview }