import { 
    BLOG_CATEGORY_LIST_REQUEST, 
    BLOG_CATEGORY_LIST_FAIL, 
    BLOG_CATEGORY_LIST_SUCCESS, 
    BLOG_CATEGORY_DETAILS_SUCCESS, 
    BLOG_CATEGORY_DETAILS_REQUEST, 
    BLOG_CATEGORY_DETAILS_FAIL,
    BLOG_CATEGORY_SAVE_REQUEST,
    BLOG_CATEGORY_SAVE_SUCCESS,
    BLOG_CATEGORY_SAVE_FAIL,
    BLOG_CATEGORY_DELETE_REQUEST,
    BLOG_CATEGORY_DELETE_SUCCESS,
    BLOG_CATEGORY_DELETE_FAIL,

 } from '../constants/blogCategoryConstants';
import { axiosWithoutToken, axiosWithToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listBlogCategorys = () => async (dispatch)=>{
    try{
        dispatch({type: BLOG_CATEGORY_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/BlogCategory`);
        if (data.status === true) {
            dispatch({ type: BLOG_CATEGORY_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: BLOG_CATEGORY_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: BLOG_CATEGORY_LIST_FAIL, payload: error.message });

    }
};


const detailsBlogCategory = (id)=> async (dispatch) =>{
    try{
        dispatch({type:BLOG_CATEGORY_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/BlogCategory/" + id); 
        dispatch({type:BLOG_CATEGORY_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: BLOG_CATEGORY_DETAILS_FAIL, payload: error.message });
    }
};

const saveBlogCategory = (item) => async (dispatch) =>{
    try{
        dispatch({type: BLOG_CATEGORY_SAVE_REQUEST, payload:item })
        if(!item.id){
            //eslint-disable-next-line
            const formatHomePageData = delete item.id;
            // console.log(homePageData)
            const { data } = await axiosWithToken.post("/BlogCategory", item)
            if (data.status === true) {
                dispatch({type: BLOG_CATEGORY_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: BLOG_CATEGORY_SAVE_FAIL, payload: data.message });
            }
        }else{
            const { data } = await axiosWithToken.put("/BlogCategory/", item);
            if (data.status === true) {
                dispatch({type: BLOG_CATEGORY_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: BLOG_CATEGORY_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: BLOG_CATEGORY_SAVE_FAIL, payload: error.message });
    }
};

const deleteBlogCategory = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:BLOG_CATEGORY_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/BlogCategory/" + id); 
        if (data.status === true) {
            dispatch({type:BLOG_CATEGORY_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: BLOG_CATEGORY_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: BLOG_CATEGORY_DELETE_FAIL, payload: error.message });
    }
};

export { listBlogCategorys, detailsBlogCategory, saveBlogCategory, deleteBlogCategory }