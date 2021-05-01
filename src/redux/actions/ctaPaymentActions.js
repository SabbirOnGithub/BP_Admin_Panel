import { 
    CTA_PAYMENT_SAVE_REQUEST,
    CTA_PAYMENT_SAVE_SUCCESS,
    CTA_PAYMENT_SAVE_FAIL,

 } from '../constants/ctaPaymentConstants';
import { axiosWithoutToken } from '../../helpers/axios';


const saveCtaPayment = (item) => async (dispatch) =>{
    // console.log(item)

    try{
        dispatch({type: CTA_PAYMENT_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithoutToken.post("/Payment/checkout", item)
            if (data.status === true) {
                dispatch({type: CTA_PAYMENT_SAVE_SUCCESS, payload: data })
                return data
            }else{
                dispatch({ type: CTA_PAYMENT_SAVE_FAIL, payload: data.message });
            }
            console.log(data)
        }
        // else{
        //     const { data } = await axiosWithToken.put("/CtaPayment/", item);
        //     if (data.status === true) {
        //         dispatch({type: CTA_PAYMENT_SAVE_SUCCESS, payload: data });            
        //     }else{
        //         dispatch({ type: CTA_PAYMENT_SAVE_FAIL, payload: data.message });
        //     }
        // }
    } catch (error) {
        console.log(error)
        dispatch({ type: CTA_PAYMENT_SAVE_FAIL, payload: error.message });
    }
};


export {  saveCtaPayment }