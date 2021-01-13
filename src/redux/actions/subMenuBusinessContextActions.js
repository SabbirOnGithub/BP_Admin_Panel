import {
    SUBMENU_BUSINESS_CONTEXT_LIST_REQUEST,
    SUBMENU_BUSINESS_CONTEXT_LIST_FAIL,
    SUBMENU_BUSINESS_CONTEXT_LIST_SUCCESS,
    SUBMENU_BUSINESS_CONTEXT_DETAILS_REQUEST,
    SUBMENU_BUSINESS_CONTEXT_DETAILS_SUCCESS,
    SUBMENU_BUSINESS_CONTEXT_DETAILS_FAIL,
    SUBMENU_BUSINESS_CONTEXT_SAVE_REQUEST,
    SUBMENU_BUSINESS_CONTEXT_SAVE_SUCCESS,
    SUBMENU_BUSINESS_CONTEXT_SAVE_FAIL,
    SUBMENU_BUSINESS_CONTEXT_DELETE_REQUEST,
    SUBMENU_BUSINESS_CONTEXT_DELETE_SUCCESS,
    SUBMENU_BUSINESS_CONTEXT_DELETE_FAIL,

} from '../constants/subMenuBusinessContextConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listSubMenuBusinessContexts = () => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/SubMenuBusinessContext');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: SUBMENU_BUSINESS_CONTEXT_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: SUBMENU_BUSINESS_CONTEXT_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_LIST_FAIL, payload: error.message });
    }
}


const detailsSubMenuBusinessContext = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/SubMenuBusinessContext/" + id);
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_DETAILS_FAIL, payload: error.message });
    }
};

const saveSubMenuBusinessContext = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/SubMenuBusinessContext/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: SUBMENU_BUSINESS_CONTEXT_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: SUBMENU_BUSINESS_CONTEXT_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/SubMenuBusinessContext/Update", item);
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: SUBMENU_BUSINESS_CONTEXT_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: SUBMENU_BUSINESS_CONTEXT_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_SAVE_FAIL, payload: error.message });
    }
};

const deleteSubMenuBusinessContext = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/SubMenuBusinessContext/" + id);
        if (data) {
            dispatch({ type: SUBMENU_BUSINESS_CONTEXT_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: SUBMENU_BUSINESS_CONTEXT_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: SUBMENU_BUSINESS_CONTEXT_DELETE_FAIL, payload: error.message });
    }
};


export { listSubMenuBusinessContexts, detailsSubMenuBusinessContext, saveSubMenuBusinessContext, deleteSubMenuBusinessContext }