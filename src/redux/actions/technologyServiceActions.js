import { 
    TECHNOLOGY_SERVICE_LIST_REQUEST, 
    TECHNOLOGY_SERVICE_LIST_FAIL, 
    TECHNOLOGY_SERVICE_LIST_SUCCESS, 
    TECHNOLOGY_SERVICE_DETAILS_SUCCESS, 
    TECHNOLOGY_SERVICE_DETAILS_REQUEST, 
    TECHNOLOGY_SERVICE_DETAILS_FAIL,
    TECHNOLOGY_SERVICE_SAVE_REQUEST,
    TECHNOLOGY_SERVICE_SAVE_SUCCESS,
    TECHNOLOGY_SERVICE_SAVE_FAIL,
    TECHNOLOGY_SERVICE_DELETE_REQUEST,
    TECHNOLOGY_SERVICE_DELETE_SUCCESS,
    TECHNOLOGY_SERVICE_DELETE_FAIL,

 } from '../constants/technologyServiceConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listTechnologyServices = () => async (dispatch)=>{
    try{
        dispatch({type: TECHNOLOGY_SERVICE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/TechnologyService`);
        if (data.status === true) {
            dispatch({ type: TECHNOLOGY_SERVICE_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: TECHNOLOGY_SERVICE_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: TECHNOLOGY_SERVICE_LIST_FAIL, payload: error.message });

    }
};


const detailsTechnologyService = (id)=> async (dispatch) =>{
    try{
        dispatch({type:TECHNOLOGY_SERVICE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/TechnologyService/" + id); 
        dispatch({type:TECHNOLOGY_SERVICE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TECHNOLOGY_SERVICE_DETAILS_FAIL, payload: error.message });
    }
};

const saveTechnologyService = (item) => async (dispatch) =>{
    try{
        dispatch({type: TECHNOLOGY_SERVICE_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/TechnologyService", item)
            if (data.status === true) {
                dispatch({type: TECHNOLOGY_SERVICE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: TECHNOLOGY_SERVICE_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/TechnologyService/", item);
            if (data.status === true) {
                dispatch({type: TECHNOLOGY_SERVICE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: TECHNOLOGY_SERVICE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: TECHNOLOGY_SERVICE_SAVE_FAIL, payload: error.message });
    }
};

const deleteTechnologyService = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:TECHNOLOGY_SERVICE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/TechnologyService/" + id); 
        if (data.status === true) {
            dispatch({type:TECHNOLOGY_SERVICE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: TECHNOLOGY_SERVICE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: TECHNOLOGY_SERVICE_DELETE_FAIL, payload: error.message });
    }
};

export { listTechnologyServices, detailsTechnologyService, saveTechnologyService, deleteTechnologyService }