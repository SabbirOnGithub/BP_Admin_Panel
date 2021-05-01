import { 
    CTA_PURCHASE_HISTORY_SAVE_REQUEST,
    CTA_PURCHASE_HISTORY_SAVE_SUCCESS,
    CTA_PURCHASE_HISTORY_SAVE_FAIL,

 } from '../constants/ctaPurchaseHistoryConstants';
import {  axiosWithToken } from '../../helpers/axios';


const saveCtaPurchaseHistory = (item) => async (dispatch) =>{
    console.log(item)

    try{
        dispatch({type: CTA_PURCHASE_HISTORY_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/CtaPurchaseHistory", item)
            if (data.status === true) {
                dispatch({type: CTA_PURCHASE_HISTORY_SAVE_SUCCESS, payload: data })
                return data
            }else{
                dispatch({ type: CTA_PURCHASE_HISTORY_SAVE_FAIL, payload: data.message });
            }
            console.log(data)
        }
        // else{
        //     const { data } = await axiosWithToken.put("/CtaPurchaseHistory/", item);
        //     if (data.status === true) {
        //         dispatch({type: CTA_PURCHASE_HISTORY_SAVE_SUCCESS, payload: data });            
        //     }else{
        //         dispatch({ type: CTA_PURCHASE_HISTORY_SAVE_FAIL, payload: data.message });
        //     }
        // }
    } catch (error) {
        console.log(error)
        dispatch({ type: CTA_PURCHASE_HISTORY_SAVE_FAIL, payload: error.message });
    }
};


export {  saveCtaPurchaseHistory }