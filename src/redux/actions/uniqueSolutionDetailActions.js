import {
    UNIQUE_SOLUTION_DETAIL_LIST_REQUEST,
    UNIQUE_SOLUTION_DETAIL_LIST_FAIL,
    UNIQUE_SOLUTION_DETAIL_LIST_SUCCESS,
    UNIQUE_SOLUTION_DETAIL_DETAILS_REQUEST,
    UNIQUE_SOLUTION_DETAIL_DETAILS_SUCCESS,
    UNIQUE_SOLUTION_DETAIL_DETAILS_FAIL,
    UNIQUE_SOLUTION_DETAIL_SAVE_REQUEST,
    UNIQUE_SOLUTION_DETAIL_SAVE_SUCCESS,
    UNIQUE_SOLUTION_DETAIL_SAVE_FAIL,
    UNIQUE_SOLUTION_DETAIL_DELETE_REQUEST,
    UNIQUE_SOLUTION_DETAIL_DELETE_SUCCESS,
    UNIQUE_SOLUTION_DETAIL_DELETE_FAIL,

} from '../constants/uniqueSolutionDetailConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listUniqueSolutionDetails = () => async (dispatch) => {
    try {
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/UniqueSolutionDetail');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: UNIQUE_SOLUTION_DETAIL_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: UNIQUE_SOLUTION_DETAIL_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_LIST_FAIL, payload: error.message });
    }
}


const detailsUniqueSolutionDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/UniqueSolutionDetail/" + id);
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_DETAILS_FAIL, payload: error.message });
    }
};

const saveUniqueSolutionDetail = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/UniqueSolutionDetail/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: UNIQUE_SOLUTION_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: UNIQUE_SOLUTION_DETAIL_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/UniqueSolutionDetail/Update", item);
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: UNIQUE_SOLUTION_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: UNIQUE_SOLUTION_DETAIL_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_SAVE_FAIL, payload: error.message });
    }
};

const deleteUniqueSolutionDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/UniqueSolutionDetail/" + id);
        if (data) {
            dispatch({ type: UNIQUE_SOLUTION_DETAIL_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: UNIQUE_SOLUTION_DETAIL_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: UNIQUE_SOLUTION_DETAIL_DELETE_FAIL, payload: error.message });
    }
};


export { listUniqueSolutionDetails, detailsUniqueSolutionDetail, saveUniqueSolutionDetail, deleteUniqueSolutionDetail }