import { 
    COMPANY_SIZE_LIST_REQUEST, 
    COMPANY_SIZE_LIST_FAIL, 
    COMPANY_SIZE_LIST_SUCCESS, 
    COMPANY_SIZE_DETAILS_SUCCESS, 
    COMPANY_SIZE_DETAILS_REQUEST, 
    COMPANY_SIZE_DETAILS_FAIL,
    COMPANY_SIZE_SAVE_REQUEST,
    COMPANY_SIZE_SAVE_SUCCESS,
    COMPANY_SIZE_SAVE_FAIL,
    COMPANY_SIZE_DELETE_REQUEST,
    COMPANY_SIZE_DELETE_SUCCESS,
    COMPANY_SIZE_DELETE_FAIL,

 } from '../constants/companySizeConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCompanySizes = () => async (dispatch)=>{
    try{
        dispatch({type: COMPANY_SIZE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CompanySize`);
        if (data.status === true) {
            dispatch({ type: COMPANY_SIZE_LIST_SUCCESS, payload: data.data?.reverse() ? data.data : [] });
        }else{
            dispatch({ type: COMPANY_SIZE_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: COMPANY_SIZE_LIST_FAIL, payload: error.message });

    }
};


const detailsCompanySize = (id)=> async (dispatch) =>{
    try{
        dispatch({type:COMPANY_SIZE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CompanySize/" + id); 
        dispatch({type:COMPANY_SIZE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: COMPANY_SIZE_DETAILS_FAIL, payload: error.message });
    }
};

const saveCompanySize = (item) => async (dispatch) =>{
    try{
        dispatch({type: COMPANY_SIZE_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/CompanySize", item)
            if (data.status === true) {
                dispatch({type: COMPANY_SIZE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: COMPANY_SIZE_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/CompanySize/", item);
            if (data.status === true) {
                dispatch({type: COMPANY_SIZE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: COMPANY_SIZE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: COMPANY_SIZE_SAVE_FAIL, payload: error.message });
    }
};

const deleteCompanySize = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:COMPANY_SIZE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CompanySize/" + id); 
        if (data.status === true) {
            dispatch({type:COMPANY_SIZE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: COMPANY_SIZE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: COMPANY_SIZE_DELETE_FAIL, payload: error.message });
    }
};

export { listCompanySizes, detailsCompanySize, saveCompanySize, deleteCompanySize }