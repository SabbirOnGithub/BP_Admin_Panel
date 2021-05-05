import { 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_REQUEST, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_FAIL, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_SUCCESS, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_SUCCESS, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_REQUEST, 
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_FAIL,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_REQUEST,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_SUCCESS,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_FAIL,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_REQUEST,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_SUCCESS,
    SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_FAIL,

 } from '../constants/softwareTrainingTypeAndLengthConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listSoftwareTrainingTypeAndLengths = () => async (dispatch)=>{
    try{
        dispatch({type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/SoftwareTrainingTypeAndLength`);
        if (data.status === true) {
            dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_LIST_FAIL, payload: error.message });

    }
};


const detailsSoftwareTrainingTypeAndLength = (id)=> async (dispatch) =>{
    try{
        dispatch({type:SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/SoftwareTrainingTypeAndLength/" + id); 
        dispatch({type:SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_DETAILS_FAIL, payload: error.message });
    }
};

const saveSoftwareTrainingTypeAndLength = (item) => async (dispatch) =>{
    try{
        dispatch({type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/SoftwareTrainingTypeAndLength", item)
            if (data.status === true) {
                dispatch({type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/SoftwareTrainingTypeAndLength/", item);
            if (data.status === true) {
                dispatch({type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_SAVE_FAIL, payload: error.message });
    }
};

const deleteSoftwareTrainingTypeAndLength = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/SoftwareTrainingTypeAndLength/" + id); 
        if (data.status === true) {
            dispatch({type:SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: SOFTWARE_TRAINING_TYPE_AND_LENGTH_DELETE_FAIL, payload: error.message });
    }
};

export { listSoftwareTrainingTypeAndLengths, detailsSoftwareTrainingTypeAndLength, saveSoftwareTrainingTypeAndLength, deleteSoftwareTrainingTypeAndLength }