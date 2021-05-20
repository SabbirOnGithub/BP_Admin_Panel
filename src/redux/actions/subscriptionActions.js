import { 
    SUBSCRIPTION_LIST_REQUEST, 
    SUBSCRIPTION_LIST_FAIL, 
    SUBSCRIPTION_LIST_SUCCESS, 
    SUBSCRIPTION_DETAILS_SUCCESS, 
    SUBSCRIPTION_DETAILS_REQUEST, 
    SUBSCRIPTION_DETAILS_FAIL,
    SUBSCRIPTION_SAVE_REQUEST,
    SUBSCRIPTION_SAVE_SUCCESS,
    SUBSCRIPTION_SAVE_FAIL,
    SUBSCRIPTION_DELETE_REQUEST,
    SUBSCRIPTION_DELETE_SUCCESS,
    SUBSCRIPTION_DELETE_FAIL,

 } from '../constants/subscriptionConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';


const listSubscriptions = () => async (dispatch)=>{
    try{
        dispatch({type: SUBSCRIPTION_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get('/NewsletterSubscription');
        if (data.status === true) {
            dispatch({ type: SUBSCRIPTION_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: SUBSCRIPTION_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: SUBSCRIPTION_LIST_FAIL, payload: error.message });

    }
};


const detailsSubscription = (id)=> async (dispatch) =>{
    try{
        dispatch({type:SUBSCRIPTION_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/NewsletterSubscription/" + id); 
        dispatch({type:SUBSCRIPTION_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: SUBSCRIPTION_DETAILS_FAIL, payload: error.message });
    }
};

const saveSubscription = (item) => async (dispatch) =>{
    console.log(item)
    try{
        dispatch({type: SUBSCRIPTION_SAVE_REQUEST, payload:item })
        // if(typeof item.id !=='number'){
            if(!item.id){
            console.log('create')
            //eslint-disable-next-line
            // console.log(item)
            delete item.id;
            // console.log(item)
            const { data } = await axiosWithToken.post("/NewsletterSubscription", item)
            if (data.status === true) {
                dispatch({type: SUBSCRIPTION_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: SUBSCRIPTION_SAVE_FAIL, payload: data.message });
            }
            // console.log(data)
        }
        else{
            console.log('update')
            const { data } = await axiosWithToken.put("/NewsletterSubscription/", item);
            if (data.status === true) {
                dispatch({type: SUBSCRIPTION_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: SUBSCRIPTION_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: SUBSCRIPTION_SAVE_FAIL, payload: error.message });
    }
};

const deleteSubscription = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:SUBSCRIPTION_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/NewsletterSubscription/" + id); 
        if (data.status === true) {
            dispatch({type:SUBSCRIPTION_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: SUBSCRIPTION_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: SUBSCRIPTION_DELETE_FAIL, payload: error.message });
    }
};

export { listSubscriptions, detailsSubscription, saveSubscription, deleteSubscription }