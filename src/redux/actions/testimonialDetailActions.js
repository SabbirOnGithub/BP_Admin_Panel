import {
    TESTIMONIAL_DETAIL_LIST_REQUEST,
    TESTIMONIAL_DETAIL_LIST_FAIL,
    TESTIMONIAL_DETAIL_LIST_SUCCESS,
    TESTIMONIAL_DETAIL_DETAILS_REQUEST,
    TESTIMONIAL_DETAIL_DETAILS_SUCCESS,
    TESTIMONIAL_DETAIL_DETAILS_FAIL,
    TESTIMONIAL_DETAIL_SAVE_REQUEST,
    TESTIMONIAL_DETAIL_SAVE_SUCCESS,
    TESTIMONIAL_DETAIL_SAVE_FAIL,
    TESTIMONIAL_DETAIL_DELETE_REQUEST,
    TESTIMONIAL_DETAIL_DELETE_SUCCESS,
    TESTIMONIAL_DETAIL_DELETE_FAIL,

} from '../constants/testimonialDetailConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listTestimonialDetails = () => async (dispatch) => {
    try {
        dispatch({ type: TESTIMONIAL_DETAIL_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get('/TestimonialDetail');
        // console.log(data)
        if (data.status === true) {
            dispatch({ type: TESTIMONIAL_DETAIL_LIST_SUCCESS, payload: data.data ? data.data : [] });
        } else {
            dispatch({ type: TESTIMONIAL_DETAIL_LIST_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TESTIMONIAL_DETAIL_LIST_FAIL, payload: error.message });
    }
}


const detailsTestimonialDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: TESTIMONIAL_DETAIL_DETAILS_REQUEST });
        const { data } = await axiosWithoutToken.get("/TestimonialDetail/" + id);
        dispatch({ type: TESTIMONIAL_DETAIL_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: TESTIMONIAL_DETAIL_DETAILS_FAIL, payload: error.message });
    }
};

const saveTestimonialDetail = (item, id) => async (dispatch) => {
    try {
        dispatch({ type: TESTIMONIAL_DETAIL_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/TestimonialDetail/Create", item)
            console.log(data)
            if (data.status === true) {
                dispatch({ type: TESTIMONIAL_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: TESTIMONIAL_DETAIL_SAVE_FAIL, payload: data.message });
            }
        } else {
            const { data } = await axiosWithTokenAndMultipartData.put("/TestimonialDetail/Update", item);
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: TESTIMONIAL_DETAIL_SAVE_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: TESTIMONIAL_DETAIL_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TESTIMONIAL_DETAIL_SAVE_FAIL, payload: error.message });
    }
};

const deleteTestimonialDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TESTIMONIAL_DETAIL_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/TestimonialDetail/" + id);
        if (data) {
            dispatch({ type: TESTIMONIAL_DETAIL_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: TESTIMONIAL_DETAIL_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: TESTIMONIAL_DETAIL_DELETE_FAIL, payload: error.message });
    }
};


export { listTestimonialDetails, detailsTestimonialDetail, saveTestimonialDetail, deleteTestimonialDetail }