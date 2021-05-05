import {
    TRAINING_CANDIDATE_DESCRIPTOR_LIST_REQUEST,
    TRAINING_CANDIDATE_DESCRIPTOR_LIST_FAIL,
    TRAINING_CANDIDATE_DESCRIPTOR_LIST_SUCCESS,
    TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_REQUEST,
    TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_SUCCESS,
    TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_FAIL,
    TRAINING_CANDIDATE_DESCRIPTOR_SAVE_REQUEST,
    TRAINING_CANDIDATE_DESCRIPTOR_SAVE_SUCCESS,
    TRAINING_CANDIDATE_DESCRIPTOR_SAVE_FAIL,
    TRAINING_CANDIDATE_DESCRIPTOR_DELETE_REQUEST,
    TRAINING_CANDIDATE_DESCRIPTOR_DELETE_SUCCESS,
    TRAINING_CANDIDATE_DESCRIPTOR_DELETE_FAIL,

} from '../constants/trainingCandidateDescriptorConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listTrainingCandidateDescriptor = () => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/TrainingCandidateDescriptor');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        } else {
            dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_LIST_FAIL, payload: error.message });
    }
}


const detailsTrainingCandidateDescriptor = (id) => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/TrainingCandidateDescriptor/" + id);
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_FAIL, payload: error.message });
    }
};

const saveTrainingCandidateDescriptor = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/TrainingCandidateDescriptor/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/TrainingCandidateDescriptor/Update", item);
            console.log(data)
            if (data.status === true) {
                dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_SAVE_FAIL, payload: error.message });
    }
};

const deleteTrainingCandidateDescriptor = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/TrainingCandidateDescriptor/" + id);
        if (data.status === true) {
            dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TRAINING_CANDIDATE_DESCRIPTOR_DELETE_FAIL, payload: error.message });
    }
};


export { listTrainingCandidateDescriptor, detailsTrainingCandidateDescriptor, saveTrainingCandidateDescriptor, deleteTrainingCandidateDescriptor }