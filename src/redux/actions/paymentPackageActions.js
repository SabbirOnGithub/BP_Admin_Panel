import { 
    PAYMENT_PACKAGE_LIST_REQUEST, 
    PAYMENT_PACKAGE_LIST_FAIL, 
    PAYMENT_PACKAGE_LIST_SUCCESS, 
    PAYMENT_PACKAGE_DETAILS_SUCCESS, 
    PAYMENT_PACKAGE_DETAILS_REQUEST, 
    PAYMENT_PACKAGE_DETAILS_FAIL,
    PAYMENT_PACKAGE_SAVE_REQUEST,
    PAYMENT_PACKAGE_SAVE_SUCCESS,
    PAYMENT_PACKAGE_SAVE_FAIL,
    PAYMENT_PACKAGE_DELETE_REQUEST,
    PAYMENT_PACKAGE_DELETE_SUCCESS,
    PAYMENT_PACKAGE_DELETE_FAIL,

 } from '../constants/paymentPackageConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listPaymentPackages = () => async (dispatch)=>{
    try{
        dispatch({type: PAYMENT_PACKAGE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/PaymentPackege`);
        if (data.status === true) {
            dispatch({ type: PAYMENT_PACKAGE_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: PAYMENT_PACKAGE_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: PAYMENT_PACKAGE_LIST_FAIL, payload: error.message });

    }
};


const detailsPaymentPackage = (id)=> async (dispatch) =>{
    try{
        dispatch({type:PAYMENT_PACKAGE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/PaymentPackege/" + id); 
        dispatch({type:PAYMENT_PACKAGE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: PAYMENT_PACKAGE_DETAILS_FAIL, payload: error.message });
    }
};

const savePaymentPackage = (item) => async (dispatch) =>{
    try{
        dispatch({type: PAYMENT_PACKAGE_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/PaymentPackege", item)
            if (data.status === true) {
                dispatch({type: PAYMENT_PACKAGE_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: PAYMENT_PACKAGE_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/PaymentPackege/", item);
            if (data.status === true) {
                dispatch({type: PAYMENT_PACKAGE_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: PAYMENT_PACKAGE_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: PAYMENT_PACKAGE_SAVE_FAIL, payload: error.message });
    }
};

const deletePaymentPackage = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:PAYMENT_PACKAGE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/PaymentPackege/" + id); 
        if (data.status === true) {
            dispatch({type:PAYMENT_PACKAGE_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: PAYMENT_PACKAGE_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: PAYMENT_PACKAGE_DELETE_FAIL, payload: error.message });
    }
};

export { listPaymentPackages, detailsPaymentPackage, savePaymentPackage, deletePaymentPackage }