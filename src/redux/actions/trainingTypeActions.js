import { 
    TRAINING_TYPE_LIST_REQUEST, 
    TRAINING_TYPE_LIST_FAIL, 
    TRAINING_TYPE_LIST_SUCCESS, 
    TRAINING_TYPE_DETAILS_SUCCESS, 
    TRAINING_TYPE_DETAILS_REQUEST, 
    TRAINING_TYPE_DETAILS_FAIL,
    TRAINING_TYPE_SAVE_REQUEST,
    TRAINING_TYPE_SAVE_SUCCESS,
    TRAINING_TYPE_SAVE_FAIL,
    TRAINING_TYPE_DELETE_REQUEST,
    TRAINING_TYPE_DELETE_SUCCESS,
    TRAINING_TYPE_DELETE_FAIL,

 } from '../constants/trainingTypeConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listTrainingTypes = () => async (dispatch)=>{
    try{
        dispatch({type: TRAINING_TYPE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/TrainingType`);
        if (data.status === true) {
            dispatch({ type: TRAINING_TYPE_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: TRAINING_TYPE_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: TRAINING_TYPE_LIST_FAIL, payload: error.message });

    }
};


const detailsTrainingType = (id)=> async (dispatch) =>{
    try{
        dispatch({type:TRAINING_TYPE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/TrainingType/" + id); 
        dispatch({type:TRAINING_TYPE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TRAINING_TYPE_DETAILS_FAIL, payload: error.message });
    }
};

const saveTrainingType = (item) => async (dispatch) =>{
    try{
        dispatch({type: TRAINING_TYPE_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/TrainingType", item)
            if (data.status === true) {
                dispatch({type: TRAINING_TYPE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: TRAINING_TYPE_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/TrainingType/", item);
            if (data.status === true) {
                dispatch({type: TRAINING_TYPE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: TRAINING_TYPE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TRAINING_TYPE_SAVE_FAIL, payload: error.message });
    }
};

const deleteTrainingType = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:TRAINING_TYPE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/TrainingType/" + id); 
        if (data.status === true) {
            dispatch({type:TRAINING_TYPE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: TRAINING_TYPE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: TRAINING_TYPE_DELETE_FAIL, payload: error.message });
    }
};

export { listTrainingTypes, detailsTrainingType, saveTrainingType, deleteTrainingType }