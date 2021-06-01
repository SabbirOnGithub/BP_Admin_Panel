import { 
    ADMIN_DASHBOARD_DETAILS_REQUEST,
    ADMIN_DASHBOARD_DETAILS_SUCCESS,
    ADMIN_DASHBOARD_DETAILS_FAIL,
    USER_DASHBOARD_DETAILS_REQUEST,
    USER_DASHBOARD_DETAILS_SUCCESS,
    USER_DASHBOARD_DETAILS_FAIL
 } from '../constants/dashboardConstants';
import { axiosWithoutToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const detailsAdminDashboard = (id) => async (dispatch)=>{
    try{
        dispatch({type: ADMIN_DASHBOARD_DETAILS_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/Dashboard/AdminDashboard/${id}`);
        if (data.status === true) {
            dispatch({ type: ADMIN_DASHBOARD_DETAILS_SUCCESS, payload: data.data });
           
        }else{
            dispatch({ type: ADMIN_DASHBOARD_DETAILS_FAIL, payload: data.message });
        }
        console.log(data)
    }
    catch(error){
        dispatch({ type: ADMIN_DASHBOARD_DETAILS_FAIL, payload: error.message });

    }
};

const detailsUserDashboard = (id) => async (dispatch)=>{
    try{
        dispatch({type: USER_DASHBOARD_DETAILS_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/Dashboard/UserDashboard/${id}`);
        if (data.status === true) {
            dispatch({ type: USER_DASHBOARD_DETAILS_SUCCESS, payload: data.data });
        }else{
            dispatch({ type: USER_DASHBOARD_DETAILS_FAIL, payload: data.message });
        }
        // console.log(data)
    }
    catch(error){
        dispatch({ type: USER_DASHBOARD_DETAILS_FAIL, payload: error.message });

    }
};


export { detailsAdminDashboard,  detailsUserDashboard}