import {
    SUBMENU_OVERVIEW_LIST_REQUEST,
    SUBMENU_OVERVIEW_LIST_FAIL,
    SUBMENU_OVERVIEW_LIST_SUCCESS,
    SUBMENU_OVERVIEW_DETAILS_REQUEST,
    SUBMENU_OVERVIEW_DETAILS_SUCCESS,
    SUBMENU_OVERVIEW_DETAILS_FAIL,
    SUBMENU_OVERVIEW_SAVE_REQUEST,
    SUBMENU_OVERVIEW_SAVE_SUCCESS,
    SUBMENU_OVERVIEW_SAVE_FAIL,
    SUBMENU_OVERVIEW_DELETE_REQUEST,
    SUBMENU_OVERVIEW_DELETE_SUCCESS,
    SUBMENU_OVERVIEW_DELETE_FAIL,

} from '../constants/subMenuOverViewConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listSubMenuOverViews = () => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_OVERVIEW_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/SubMenuOverView');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: SUBMENU_OVERVIEW_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: SUBMENU_OVERVIEW_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: SUBMENU_OVERVIEW_LIST_FAIL, payload: error.message });
    }
}


const detailsSubMenuOverView = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_OVERVIEW_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/SubMenuOverView/" + id);
        dispatch({ type: SUBMENU_OVERVIEW_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: SUBMENU_OVERVIEW_DETAILS_FAIL, payload: error.message });
    }
};

const saveSubMenuOverView = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: SUBMENU_OVERVIEW_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/SubMenuOverView/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: SUBMENU_OVERVIEW_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: SUBMENU_OVERVIEW_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/SubMenuOverView/Update", item);
            console.log(data)
            if (data.status === true) {
                dispatch({ type: SUBMENU_OVERVIEW_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: SUBMENU_OVERVIEW_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: SUBMENU_OVERVIEW_SAVE_FAIL, payload: error.message });
    }
};

const deleteSubMenuOverView = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SUBMENU_OVERVIEW_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/SubMenuOverView/" + id);
        if (data.status === true) {
            dispatch({ type: SUBMENU_OVERVIEW_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: SUBMENU_OVERVIEW_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: SUBMENU_OVERVIEW_DELETE_FAIL, payload: error.message });
    }
};


export { listSubMenuOverViews, detailsSubMenuOverView, saveSubMenuOverView, deleteSubMenuOverView }