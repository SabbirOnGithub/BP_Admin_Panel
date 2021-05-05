import {
    HOME_CONSULTATION_TOPIC_LIST_REQUEST,
    HOME_CONSULTATION_TOPIC_LIST_FAIL,
    HOME_CONSULTATION_TOPIC_LIST_SUCCESS,
    HOME_CONSULTATION_TOPIC_DETAILS_REQUEST,
    HOME_CONSULTATION_TOPIC_DETAILS_SUCCESS,
    HOME_CONSULTATION_TOPIC_DETAILS_FAIL,
    HOME_CONSULTATION_TOPIC_SAVE_REQUEST,
    HOME_CONSULTATION_TOPIC_SAVE_SUCCESS,
    HOME_CONSULTATION_TOPIC_SAVE_FAIL,
    HOME_CONSULTATION_TOPIC_DELETE_REQUEST,
    HOME_CONSULTATION_TOPIC_DELETE_SUCCESS,
    HOME_CONSULTATION_TOPIC_DELETE_FAIL,
} from '../constants/homeConsultationTopicConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listHomeConsultationTopics = () => async (dispatch) => {
    try {
        dispatch({ type: HOME_CONSULTATION_TOPIC_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/HomeConsultationTopic');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: HOME_CONSULTATION_TOPIC_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        } else {
            dispatch({ type: HOME_CONSULTATION_TOPIC_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: HOME_CONSULTATION_TOPIC_LIST_FAIL, payload: error.message });

    }
}


const detailsHomeConsultationTopic = (id) => async (dispatch) => {
    try {
        dispatch({ type: HOME_CONSULTATION_TOPIC_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/HomeConsultationTopic/" + id);
        dispatch({ type: HOME_CONSULTATION_TOPIC_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: HOME_CONSULTATION_TOPIC_DETAILS_FAIL, payload: error.message });
    }
};

// add/update action
const saveHomeConsultationTopic = (item, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: HOME_CONSULTATION_TOPIC_SAVE_REQUEST, payload: item })
        // const { userSignin: { userInfo } } = getState();

        if (!id) {
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/HomeConsultationTopic/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: HOME_CONSULTATION_TOPIC_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: HOME_CONSULTATION_TOPIC_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/HomeConsultationTopic/Update", item);
            if (data.status === true) {
                dispatch({ type: HOME_CONSULTATION_TOPIC_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: HOME_CONSULTATION_TOPIC_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: HOME_CONSULTATION_TOPIC_SAVE_FAIL, payload: error.message });
    }
};

const deleteHomeConsultationTopic = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: HOME_CONSULTATION_TOPIC_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/HomeConsultationTopic/" + id);
        if (data.status === true) {
            dispatch({ type: HOME_CONSULTATION_TOPIC_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: HOME_CONSULTATION_TOPIC_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: HOME_CONSULTATION_TOPIC_DELETE_FAIL, payload: error.message });
    }
};


export { listHomeConsultationTopics, detailsHomeConsultationTopic, saveHomeConsultationTopic, deleteHomeConsultationTopic }