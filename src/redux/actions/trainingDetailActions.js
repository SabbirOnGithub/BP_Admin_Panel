import {
    TRAINING_DETAIL_LIST_REQUEST,
    TRAINING_DETAIL_LIST_FAIL,
    TRAINING_DETAIL_LIST_SUCCESS,
    TRAINING_DETAIL_DETAILS_REQUEST,
    TRAINING_DETAIL_DETAILS_SUCCESS,
    TRAINING_DETAIL_DETAILS_FAIL,
    TRAINING_DETAIL_SAVE_REQUEST,
    TRAINING_DETAIL_SAVE_SUCCESS,
    TRAINING_DETAIL_SAVE_FAIL,
    TRAINING_DETAIL_DELETE_REQUEST,
    TRAINING_DETAIL_DELETE_SUCCESS,
    TRAINING_DETAIL_DELETE_FAIL,

} from '../constants/trainingDetailConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listTrainingDetails = () => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_DETAIL_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/TrainingDetail');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: TRAINING_DETAIL_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: TRAINING_DETAIL_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TRAINING_DETAIL_LIST_FAIL, payload: error.message });
    }
}


const detailsTrainingDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_DETAIL_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/TrainingDetail/" + id);
        dispatch({ type: TRAINING_DETAIL_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: TRAINING_DETAIL_DETAILS_FAIL, payload: error.message });
    }
};

const saveTrainingDetail = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_DETAIL_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/TrainingDetail/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: TRAINING_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: TRAINING_DETAIL_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/TrainingDetail/Update", item);
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: TRAINING_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: TRAINING_DETAIL_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TRAINING_DETAIL_SAVE_FAIL, payload: error.message });
    }
};

const deleteTrainingDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TRAINING_DETAIL_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/TrainingDetail/" + id);
        if (data) {
            dispatch({ type: TRAINING_DETAIL_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: TRAINING_DETAIL_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TRAINING_DETAIL_DELETE_FAIL, payload: error.message });
    }
};


export { listTrainingDetails, detailsTrainingDetail, saveTrainingDetail, deleteTrainingDetail }