import {
    TECH_CATEGORY_LIST_REQUEST,
    TECH_CATEGORY_LIST_FAIL,
    TECH_CATEGORY_LIST_SUCCESS,
    TECH_CATEGORY_DETAILS_REQUEST,
    TECH_CATEGORY_DETAILS_SUCCESS,
    TECH_CATEGORY_DETAILS_FAIL,
    TECH_CATEGORY_SAVE_REQUEST,
    TECH_CATEGORY_SAVE_SUCCESS,
    TECH_CATEGORY_SAVE_FAIL,
    TECH_CATEGORY_DELETE_REQUEST,
    TECH_CATEGORY_DELETE_SUCCESS,
    TECH_CATEGORY_DELETE_FAIL,

} from '../constants/techCategoryConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listTechCategory = () => async (dispatch) => {
    try {
        dispatch({ type: TECH_CATEGORY_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/TechCategory');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: TECH_CATEGORY_LIST_SUCCESS, payload: data.data?.reverse() ? data.data : [] });
        } else {
            dispatch({ type: TECH_CATEGORY_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TECH_CATEGORY_LIST_FAIL, payload: error.message });
    }
}


const detailsTechCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: TECH_CATEGORY_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/TechCategory/" + id);
        dispatch({ type: TECH_CATEGORY_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: TECH_CATEGORY_DETAILS_FAIL, payload: error.message });
    }
};

const saveTechCategory = (item, id) => async (dispatch) => {
    console.log(item)
    try {
        dispatch({ type: TECH_CATEGORY_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/TechCategory/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: TECH_CATEGORY_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: TECH_CATEGORY_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/TechCategory/Update", item);
            console.log(data)
            if (data.status === true) {
                dispatch({ type: TECH_CATEGORY_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: TECH_CATEGORY_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TECH_CATEGORY_SAVE_FAIL, payload: error.message });
    }
};

const deleteTechCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TECH_CATEGORY_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/TechCategory/" + id);
        if (data.status === true) {
            dispatch({ type: TECH_CATEGORY_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: TECH_CATEGORY_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TECH_CATEGORY_DELETE_FAIL, payload: error.message });
    }
};


export { listTechCategory, detailsTechCategory, saveTechCategory, deleteTechCategory }