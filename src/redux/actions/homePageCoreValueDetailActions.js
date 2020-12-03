import { 
    HOME_PAGE_CORE_VALUE_DETAIL_LIST_REQUEST, 
    HOME_PAGE_CORE_VALUE_DETAIL_LIST_FAIL, 
    HOME_PAGE_CORE_VALUE_DETAIL_LIST_SUCCESS,
    HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_REQUEST,
    HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_SUCCESS,
    HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_FAIL,
    HOME_PAGE_CORE_VALUE_DETAIL_SAVE_REQUEST,
    HOME_PAGE_CORE_VALUE_DETAIL_SAVE_SUCCESS,
    HOME_PAGE_CORE_VALUE_DETAIL_SAVE_FAIL,
    HOME_PAGE_CORE_VALUE_DETAIL_DELETE_REQUEST,
    HOME_PAGE_CORE_VALUE_DETAIL_DELETE_SUCCESS,
    HOME_PAGE_CORE_VALUE_DETAIL_DELETE_FAIL, 

 } from '../constants/homePageCoreValueDetailConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listHomePageCoreValueDetails = () => async (dispatch)=>{
    try{
        dispatch({type: HOME_PAGE_CORE_VALUE_DETAIL_LIST_REQUEST});
        const { data } = await axiosWithoutToken.get('/HomePageCoreValueDetail');
        // console.log(data)
        dispatch({ type: HOME_PAGE_CORE_VALUE_DETAIL_LIST_SUCCESS, payload: data.data ? data.data : [] });
    }
    catch(error){
        dispatch({ type: HOME_PAGE_CORE_VALUE_DETAIL_LIST_FAIL, payload: error.message });

    }
}


const detailsHomePageCoreValueDetail = (id)=> async (dispatch) =>{
    try{
        dispatch({type:HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/HomePageCoreValueDetail/" + id); 
        dispatch({type:HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: HOME_PAGE_CORE_VALUE_DETAIL_DETAILS_FAIL, payload: error.message });
    }
};

const saveHomePageCoreValueDetail = (item, id) => async (dispatch) =>{
    try{
        dispatch({type: HOME_PAGE_CORE_VALUE_DETAIL_SAVE_REQUEST, payload:item })
        if(!id){
            console.log('create')
        //eslint-disable-next-line
        const formatHomePageData = delete item.id;
        const { data } = await axiosWithTokenAndMultipartData.post("/HomePageCoreValueDetail/Create", item)
        console.log(data)
        if(data.status===true){
            dispatch({type: HOME_PAGE_CORE_VALUE_DETAIL_SAVE_SUCCESS, payload: data });
        }
        }else{
            const { data } = await axiosWithTokenAndMultipartData.put("/HomePageCoreValueDetail/Update", item);
            console.log(data)
            if(data.status===true){
                dispatch({type: HOME_PAGE_CORE_VALUE_DETAIL_SAVE_SUCCESS, payload: data });   
            }         
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: HOME_PAGE_CORE_VALUE_DETAIL_SAVE_FAIL, payload: error.message });
    }
};

const deleteHomePageCoreValueDetail = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:HOME_PAGE_CORE_VALUE_DETAIL_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/HomePageCoreValueDetail/" + id); 
        if(data){
            dispatch({type:HOME_PAGE_CORE_VALUE_DETAIL_DELETE_SUCCESS, payload: data, success:true });
        }
    }
    catch(error){
        dispatch({ type: HOME_PAGE_CORE_VALUE_DETAIL_DELETE_FAIL, payload: error.message });
    }
};


export { listHomePageCoreValueDetails, detailsHomePageCoreValueDetail, saveHomePageCoreValueDetail, deleteHomePageCoreValueDetail }