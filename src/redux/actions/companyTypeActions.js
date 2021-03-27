import { 
    COMPANY_TYPE_LIST_REQUEST, 
    COMPANY_TYPE_LIST_FAIL, 
    COMPANY_TYPE_LIST_SUCCESS, 
    COMPANY_TYPE_DETAILS_SUCCESS, 
    COMPANY_TYPE_DETAILS_REQUEST, 
    COMPANY_TYPE_DETAILS_FAIL,
    COMPANY_TYPE_SAVE_REQUEST,
    COMPANY_TYPE_SAVE_SUCCESS,
    COMPANY_TYPE_SAVE_FAIL,
    COMPANY_TYPE_DELETE_REQUEST,
    COMPANY_TYPE_DELETE_SUCCESS,
    COMPANY_TYPE_DELETE_FAIL,

 } from '../constants/companyTypeConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCompanyTypes = () => async (dispatch)=>{
    try{
        dispatch({type: COMPANY_TYPE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CompanyType`);
        if (data.status === true) {
            dispatch({ type: COMPANY_TYPE_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: COMPANY_TYPE_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: COMPANY_TYPE_LIST_FAIL, payload: error.message });

    }
};


const detailsCompanyType = (id)=> async (dispatch) =>{
    try{
        dispatch({type:COMPANY_TYPE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CompanyType/" + id); 
        dispatch({type:COMPANY_TYPE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: COMPANY_TYPE_DETAILS_FAIL, payload: error.message });
    }
};

const saveCompanyType = (item) => async (dispatch) =>{
    try{
        dispatch({type: COMPANY_TYPE_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/CompanyType", item)
            if (data.status === true) {
                dispatch({type: COMPANY_TYPE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: COMPANY_TYPE_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/CompanyType/", item);
            if (data.status === true) {
                dispatch({type: COMPANY_TYPE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: COMPANY_TYPE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: COMPANY_TYPE_SAVE_FAIL, payload: error.message });
    }
};

const deleteCompanyType = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:COMPANY_TYPE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CompanyType/" + id); 
        if (data.status === true) {
            dispatch({type:COMPANY_TYPE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: COMPANY_TYPE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: COMPANY_TYPE_DELETE_FAIL, payload: error.message });
    }
};

export { listCompanyTypes, detailsCompanyType, saveCompanyType, deleteCompanyType }