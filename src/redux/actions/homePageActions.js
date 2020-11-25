import { 
    HOMEPAGE_LIST_REQUEST, 
    HOMEPAGE_LIST_FAIL, 
    HOMEPAGE_LIST_SUCCESS, 
    HOMEPAGE_DETAILS_SUCCESS, 
    HOMEPAGE_DETAILS_REQUEST, 
    HOMEPAGE_DETAILS_FAIL,
    HOMEPAGE_SAVE_REQUEST,
    HOMEPAGE_SAVE_SUCCESS,
    HOMEPAGE_SAVE_FAIL,
    HOMEPAGE_DELETE_REQUEST,
    HOMEPAGE_DELETE_SUCCESS,
    HOMEPAGE_DELETE_FAIL,

 } from '../constants/homePageConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listHomePageDatas = () => async (dispatch)=>{
    try{
        dispatch({type: HOMEPAGE_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/HomePage`);
        dispatch({ type: HOMEPAGE_LIST_SUCCESS, payload: data.data ? data.data : []});
        console.log(data.data)
    }
    catch(error){
        dispatch({ type: HOMEPAGE_LIST_FAIL, payload: error.message });

    }
};


const detailsHomePageData = (homePageDataId)=> async (dispatch) =>{
    try{
        dispatch({type:HOMEPAGE_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/HomePage/" + homePageDataId); 
        dispatch({type:HOMEPAGE_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: HOMEPAGE_DETAILS_FAIL, payload: error.message });
    }
};

const saveHomePageData = (homePageData) => async (dispatch, getState) =>{
    try{
        dispatch({type: HOMEPAGE_SAVE_REQUEST, payload:homePageData })
        // const { userSignin: { userInfo } } = getState();

        if(!homePageData.id){
        //eslint-disable-next-line
        const formatHomePageData = delete homePageData.id;
        // console.log(homePageData)
        const { data } = await axiosWithToken.post("/HomePage", homePageData)
        dispatch({type: HOMEPAGE_SAVE_SUCCESS, payload: data });


        }else{
            // const { data } = await axiosWithToken.put("/HomePage/" + homePageData.id , homePageData);
            const { data } = await axiosWithToken.put("/HomePage/", homePageData);
            dispatch({type: HOMEPAGE_SAVE_SUCCESS, payload: data });            

        }
        

        
    } catch (error) {
        console.log(error)
        dispatch({ type: HOMEPAGE_SAVE_FAIL, payload: error.message });
    }
};

const deleteHomePageData = (homePageDataId)=> async (dispatch, getState) =>{
    console.log(homePageDataId);
    console.log(typeof(homePageDataId));
    try{
        dispatch({type:HOMEPAGE_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/HomePage/" + homePageDataId); 
        if(data){
            dispatch({type:HOMEPAGE_DELETE_SUCCESS, payload: data, success:true });
        }
    }
    catch(error){
        dispatch({ type: HOMEPAGE_DELETE_FAIL, payload: error.message });
    }
};

export { listHomePageDatas, detailsHomePageData, saveHomePageData, deleteHomePageData }