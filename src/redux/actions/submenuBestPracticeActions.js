import {
    SUBMENU_BEST_PRACTICE_LIST_REQUEST,
    SUBMENU_BEST_PRACTICE_LIST_FAIL,
    SUBMENU_BEST_PRACTICE_LIST_SUCCESS,
    SUBMENU_BEST_PRACTICE_DETAILS_REQUEST,
    SUBMENU_BEST_PRACTICE_DETAILS_SUCCESS,
    SUBMENU_BEST_PRACTICE_DETAILS_FAIL,
    SUBMENU_BEST_PRACTICE_SAVE_REQUEST,
    SUBMENU_BEST_PRACTICE_SAVE_SUCCESS,
    SUBMENU_BEST_PRACTICE_SAVE_FAIL,
    SUBMENU_BEST_PRACTICE_DELETE_REQUEST,
    SUBMENU_BEST_PRACTICE_DELETE_SUCCESS,
    SUBMENU_BEST_PRACTICE_DELETE_FAIL,

} from '../constants/submenuBestPracticeConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listSubmenuBestPractices = () => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_BEST_PRACTICE_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/SubmenuBestPractice');
        console.log(data)
        if (data.status === true) {
            dispatch({ type: SUBMENU_BEST_PRACTICE_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: SUBMENU_BEST_PRACTICE_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: SUBMENU_BEST_PRACTICE_LIST_FAIL, payload: error.message });
    }
}


const detailsSubmenuBestPractice = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_BEST_PRACTICE_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/SubmenuBestPractice/" + id);
        dispatch({ type: SUBMENU_BEST_PRACTICE_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: SUBMENU_BEST_PRACTICE_DETAILS_FAIL, payload: error.message });
    }
};

const saveSubmenuBestPractice = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_BEST_PRACTICE_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/SubmenuBestPractice/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: SUBMENU_BEST_PRACTICE_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: SUBMENU_BEST_PRACTICE_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/SubmenuBestPractice/Update", item);
            console.log(data)
            if (data.status === true) {
                dispatch({ type: SUBMENU_BEST_PRACTICE_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: SUBMENU_BEST_PRACTICE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: SUBMENU_BEST_PRACTICE_SAVE_FAIL, payload: error.message });
    }
};

const deleteSubmenuBestPractice = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUBMENU_BEST_PRACTICE_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/SubmenuBestPractice/" + id);
        if (data.status === true) {
            dispatch({ type: SUBMENU_BEST_PRACTICE_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: SUBMENU_BEST_PRACTICE_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: SUBMENU_BEST_PRACTICE_DELETE_FAIL, payload: error.message });
    }
};


export { listSubmenuBestPractices, detailsSubmenuBestPractice, saveSubmenuBestPractice, deleteSubmenuBestPractice }