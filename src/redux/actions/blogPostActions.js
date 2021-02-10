import { 
    BLOG_POST_LIST_REQUEST, 
    BLOG_POST_LIST_FAIL, 
    BLOG_POST_LIST_SUCCESS, 
    BLOG_POST_DETAILS_SUCCESS, 
    BLOG_POST_DETAILS_REQUEST, 
    BLOG_POST_DETAILS_FAIL,
    BLOG_POST_SAVE_REQUEST,
    BLOG_POST_SAVE_SUCCESS,
    BLOG_POST_SAVE_FAIL,
    BLOG_POST_DELETE_REQUEST,
    BLOG_POST_DELETE_SUCCESS,
    BLOG_POST_DELETE_FAIL,

 } from '../constants/blogPostConstants';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listBlogPosts = () => async (dispatch)=>{
    try{
        dispatch({type: BLOG_POST_LIST_REQUEST});
        const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/BlogPost`);
        if (data.status === true) {
            dispatch({ type: BLOG_POST_LIST_SUCCESS, payload: data.data ? data.data : [] });
        }else{
            dispatch({ type: BLOG_POST_LIST_FAIL, payload: data.message });
        }
        // console.log(data.data)
    }
    catch(error){
        dispatch({ type: BLOG_POST_LIST_FAIL, payload: error.message });

    }
};


const detailsBlogPost = (id)=> async (dispatch) =>{
    try{
        dispatch({type:BLOG_POST_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/BlogPost/" + id); 
        dispatch({type:BLOG_POST_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: BLOG_POST_DETAILS_FAIL, payload: error.message });
    }
};

const saveBlogPost = (item, id) => async (dispatch) =>{
    try{
        dispatch({type: BLOG_POST_SAVE_REQUEST, payload:item })
        if(!id){
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/BlogPost/Create", item)
            if (data.status === true) {
                dispatch({type: BLOG_POST_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: BLOG_POST_SAVE_FAIL, payload: data.message });
            }
        }else{
            console.log('update')
            const { data } = await axiosWithTokenAndMultipartData.put("/BlogPost/Update", item);
            if (data.status === true) {
                dispatch({type: BLOG_POST_SAVE_SUCCESS, payload: data });            
            }else{
                dispatch({ type: BLOG_POST_SAVE_FAIL, payload: data.message });
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: BLOG_POST_SAVE_FAIL, payload: error.message });
    }
};

const deleteBlogPost = (id)=> async (dispatch, getState) =>{
    try{
        dispatch({type:BLOG_POST_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/BlogPost/" + id); 
        if (data.status === true) {
            dispatch({type:BLOG_POST_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: BLOG_POST_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: BLOG_POST_DELETE_FAIL, payload: error.message });
    }
};

export { listBlogPosts, detailsBlogPost, saveBlogPost, deleteBlogPost }