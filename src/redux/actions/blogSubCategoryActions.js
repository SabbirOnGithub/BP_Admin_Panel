import { 
    BLOG_SUB_CATEGORY_LIST_REQUEST, 
    BLOG_SUB_CATEGORY_LIST_FAIL, 
    BLOG_SUB_CATEGORY_LIST_SUCCESS, 
    BLOG_SUB_CATEGORY_DETAILS_SUCCESS, 
    BLOG_SUB_CATEGORY_DETAILS_REQUEST, 
    BLOG_SUB_CATEGORY_DETAILS_FAIL,
    BLOG_SUB_CATEGORY_SAVE_REQUEST,
    BLOG_SUB_CATEGORY_SAVE_SUCCESS,
    BLOG_SUB_CATEGORY_SAVE_FAIL,
    BLOG_SUB_CATEGORY_DELETE_REQUEST,
    BLOG_SUB_CATEGORY_DELETE_SUCCESS,
    BLOG_SUB_CATEGORY_DELETE_FAIL,

 } from '../constants/blogSubCategoryConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listBlogSubCategorys = () => async (dispatch)=>{
    try{
        dispatch({type: BLOG_SUB_CATEGORY_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/BlogSubCategory`);
        if (data.status === true) {
            dispatch({ type: BLOG_SUB_CATEGORY_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: BLOG_SUB_CATEGORY_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: BLOG_SUB_CATEGORY_LIST_FAIL, payload: error.message });

    }
};


const detailsBlogSubCategory = (id)=> async (dispatch) =>{
    try{
        dispatch({type:BLOG_SUB_CATEGORY_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/BlogSubCategory/" + id); 
        dispatch({type:BLOG_SUB_CATEGORY_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: BLOG_SUB_CATEGORY_DETAILS_FAIL, payload: error.message });
    }
};

const saveBlogSubCategory = (item) => async (dispatch) =>{
    try{
        dispatch({type: BLOG_SUB_CATEGORY_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/BlogSubCategory", item)
            if (data.status === true) {
                dispatch({type: BLOG_SUB_CATEGORY_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: BLOG_SUB_CATEGORY_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/BlogSubCategory/", item);
            if (data.status === true) {
                dispatch({type: BLOG_SUB_CATEGORY_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: BLOG_SUB_CATEGORY_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: BLOG_SUB_CATEGORY_SAVE_FAIL, payload: error.message });
    }
};

const deleteBlogSubCategory = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:BLOG_SUB_CATEGORY_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/BlogSubCategory/" + id); 
        if (data.status === true) {
            dispatch({type:BLOG_SUB_CATEGORY_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: BLOG_SUB_CATEGORY_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: BLOG_SUB_CATEGORY_DELETE_FAIL, payload: error.message });
    }
};

export { listBlogSubCategorys, detailsBlogSubCategory, saveBlogSubCategory, deleteBlogSubCategory }