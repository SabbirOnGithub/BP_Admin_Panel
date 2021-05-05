import { 
    CTA_PACKAGE_HOURLY_LIST_REQUEST, 
    CTA_PACKAGE_HOURLY_LIST_FAIL, 
    CTA_PACKAGE_HOURLY_LIST_SUCCESS, 
    CTA_PACKAGE_HOURLY_DETAILS_SUCCESS, 
    CTA_PACKAGE_HOURLY_DETAILS_REQUEST, 
    CTA_PACKAGE_HOURLY_DETAILS_FAIL,
    CTA_PACKAGE_HOURLY_SAVE_REQUEST,
    CTA_PACKAGE_HOURLY_SAVE_SUCCESS,
    CTA_PACKAGE_HOURLY_SAVE_FAIL,
    CTA_PACKAGE_HOURLY_DELETE_REQUEST,
    CTA_PACKAGE_HOURLY_DELETE_SUCCESS,
    CTA_PACKAGE_HOURLY_DELETE_FAIL,

 } from '../constants/ctaPackageHourlyConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listCtaPackageHourlys = () => async (dispatch)=>{
    try{
        dispatch({type: CTA_PACKAGE_HOURLY_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/CtaPackageHourly`);
        if (data.status === true) {
            dispatch({ type: CTA_PACKAGE_HOURLY_LIST_SUCCESS, payload: data.data?.reverse() ? data.data : [] });
        }else{
            dispatch({ type: CTA_PACKAGE_HOURLY_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: CTA_PACKAGE_HOURLY_LIST_FAIL, payload: error.message });

    }
};


const detailsCtaPackageHourly = (id)=> async (dispatch) =>{
    try{
        dispatch({type:CTA_PACKAGE_HOURLY_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/CtaPackageHourly/" + id); 
        dispatch({type:CTA_PACKAGE_HOURLY_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: CTA_PACKAGE_HOURLY_DETAILS_FAIL, payload: error.message });
    }
};

const saveCtaPackageHourly = (item) => async (dispatch) =>{
    try{
        dispatch({type: CTA_PACKAGE_HOURLY_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/CtaPackageHourly", item)
            if (data.status === true) {
                dispatch({type: CTA_PACKAGE_HOURLY_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: CTA_PACKAGE_HOURLY_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/CtaPackageHourly/", item);
            if (data.status === true) {
                dispatch({type: CTA_PACKAGE_HOURLY_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: CTA_PACKAGE_HOURLY_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: CTA_PACKAGE_HOURLY_SAVE_FAIL, payload: error.message });
    }
};

const deleteCtaPackageHourly = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CTA_PACKAGE_HOURLY_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/CtaPackageHourly/" + id); 
        if (data.status === true) {
            dispatch({type:CTA_PACKAGE_HOURLY_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: CTA_PACKAGE_HOURLY_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: CTA_PACKAGE_HOURLY_DELETE_FAIL, payload: error.message });
    }
};

export { listCtaPackageHourlys, detailsCtaPackageHourly, saveCtaPackageHourly, deleteCtaPackageHourly }