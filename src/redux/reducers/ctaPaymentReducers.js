import { 
    CTA_PAYMENT_SAVE_REQUEST,
    CTA_PAYMENT_SAVE_SUCCESS,
    CTA_PAYMENT_SAVE_FAIL,

 } from '../constants/ctaPaymentConstants';

function ctaPaymentSaveReducer(state={ctaPayment:{}},action){
    switch(action.type){
        case CTA_PAYMENT_SAVE_REQUEST:
            return { loading:true };
        case CTA_PAYMENT_SAVE_SUCCESS:
            return { loading:false, success:true, ctaPayment:action.payload };
        case CTA_PAYMENT_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    ctaPaymentSaveReducer,
 }; 
