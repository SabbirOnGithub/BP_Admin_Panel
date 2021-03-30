import {
    TRAINING_OVERVIEW_LIST_REQUEST,
    TRAINING_OVERVIEW_LIST_FAIL,
    TRAINING_OVERVIEW_LIST_SUCCESS,
    TRAINING_OVERVIEW_DETAILS_REQUEST,
    TRAINING_OVERVIEW_DETAILS_SUCCESS,
    TRAINING_OVERVIEW_DETAILS_FAIL,
    TRAINING_OVERVIEW_SAVE_REQUEST,
    TRAINING_OVERVIEW_SAVE_SUCCESS,
    TRAINING_OVERVIEW_SAVE_FAIL,
    TRAINING_OVERVIEW_DELETE_REQUEST,
    TRAINING_OVERVIEW_DELETE_SUCCESS,
    TRAINING_OVERVIEW_DELETE_FAIL,

} from '../constants/trainingOverviewConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listTrainingOverview = () => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_OVERVIEW_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/TrainingOverview');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: TRAINING_OVERVIEW_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: TRAINING_OVERVIEW_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TRAINING_OVERVIEW_LIST_FAIL, payload: error.message });
    }
}


const detailsTrainingOverview = (id) => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_OVERVIEW_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/TrainingOverview/" + id);
        dispatch({ type: TRAINING_OVERVIEW_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: TRAINING_OVERVIEW_DETAILS_FAIL, payload: error.message });
    }
};

const saveTrainingOverview = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_OVERVIEW_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/TrainingOverview/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: TRAINING_OVERVIEW_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: TRAINING_OVERVIEW_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/TrainingOverview/Update", item);
            console.log(data)
            if (data.status === true) {
                dispatch({ type: TRAINING_OVERVIEW_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: TRAINING_OVERVIEW_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TRAINING_OVERVIEW_SAVE_FAIL, payload: error.message });
    }
};

const deleteTrainingOverview = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TRAINING_OVERVIEW_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/TrainingOverview/" + id);
        if (data.status === true) {
            dispatch({ type: TRAINING_OVERVIEW_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: TRAINING_OVERVIEW_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TRAINING_OVERVIEW_DELETE_FAIL, payload: error.message });
    }
};


export { listTrainingOverview, detailsTrainingOverview, saveTrainingOverview, deleteTrainingOverview }