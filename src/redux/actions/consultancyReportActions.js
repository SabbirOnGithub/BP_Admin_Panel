import { 
    CONSULTANCY_REPORT_LIST_REQUEST, 
    CONSULTANCY_REPORT_LIST_SUCCESS, 
    CONSULTANCY_REPORT_LIST_FAIL, 
 } from '../constants/consultancyReportConstants';
import { axiosWithToken } from '../../helpers/axios';
import {isAdminUser} from '../../helpers/search';

// import {config} from "../../config";

// const BASE_API_URL = config.BASE_API_URL


const listConsultancyReports = (item) => async (dispatch)=>{
    if(item){
        // console.log({item})
        isAdminUser() && delete item?.email;
        item.currentPage = -1;
        // with serverside paginations
        try{
            dispatch({type: CONSULTANCY_REPORT_LIST_REQUEST});
            // const {data} = await axiosWithToken.post('/CtaFunction/search', item);
            const {data} = await axiosWithToken.post('/Consultancy/Report', item);
            // console.log(data)
    
            if (data.status === true) {
                dispatch({ type: CONSULTANCY_REPORT_LIST_SUCCESS, payload: data.data ? data.data : {} });
            }else{
                dispatch({ type: CONSULTANCY_REPORT_LIST_FAIL, payload: data?.message });
            }
        }
        catch(error){
            dispatch({ type: CONSULTANCY_REPORT_LIST_FAIL, payload: error.message });
        }
    }
};


export { 
    listConsultancyReports
}