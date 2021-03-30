import {
    BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_REQUEST,
    BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_FAIL,
    BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_SUCCESS,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_REQUEST,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_SUCCESS,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_FAIL,
    BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_REQUEST,
    BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_SUCCESS,
    BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_FAIL,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_REQUEST,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_SUCCESS,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_FAIL,

} from '../constants/businessPrincipalDescriptorConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listBusinessPrincipalDescriptor = () => async (dispatch) => {
    try {
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/BusinessPrincipalDescriptor');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_FAIL, payload: error.message });
    }
}


const detailsBusinessPrincipalDescriptor = (id) => async (dispatch) => {
    try {
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/BusinessPrincipalDescriptor/" + id);
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_FAIL, payload: error.message });
    }
};

const saveBusinessPrincipalDescriptor = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/BusinessPrincipalDescriptor/Create", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/BusinessPrincipalDescriptor/Update", item);
            console.log(data)
            if (data.status === true) {
                dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_FAIL, payload: error.message });
    }
};

const deleteBusinessPrincipalDescriptor = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/BusinessPrincipalDescriptor/" + id);
        if (data.status === true) {
            dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_FAIL, payload: error.message });
    }
};


export { listBusinessPrincipalDescriptor, detailsBusinessPrincipalDescriptor, saveBusinessPrincipalDescriptor, deleteBusinessPrincipalDescriptor }