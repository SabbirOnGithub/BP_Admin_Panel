import { 
    SUBMENU_LIST_REQUEST, 
    SUBMENU_LIST_FAIL, 
    SUBMENU_LIST_SUCCESS,
    SUBMENU_DETAILS_REQUEST,
    SUBMENU_DETAILS_SUCCESS,
    SUBMENU_DETAILS_FAIL,
    SUBMENU_SAVE_REQUEST,
    SUBMENU_SAVE_SUCCESS,
    SUBMENU_SAVE_FAIL,
    SUBMENU_DELETE_REQUEST,
    SUBMENU_DELETE_SUCCESS,
    SUBMENU_DELETE_FAIL, 

 } from '../constants/subMenuConstants';
// import axios from 'axios';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from '../../helpers/axios';


const listSubMenus = () => async (dispatch)=>{
    try{
        dispatch({type: SUBMENU_LIST_REQUEST});
        const { data } = await axiosWithoutToken.get('/SubMenu',{isHomePageSubMenu:true});
        if(data.status===true){
            dispatch({ type: SUBMENU_LIST_SUCCESS, payload: data.data ? data.data?.reverse() : [] });
        }else{
            dispatch({ type: SUBMENU_LIST_FAIL, payload: data.message });
        }
        // console.log(data)
    }
    catch(error){
        dispatch({ type: SUBMENU_LIST_FAIL, payload: error.message });

    }
}


const detailsSubMenu = (id)=> async (dispatch) =>{
    try{
        dispatch({type:SUBMENU_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/SubMenu/" + id); 
        dispatch({type:SUBMENU_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: SUBMENU_DETAILS_FAIL, payload: error.message });
    }
};

const saveSubMenu = (item, id) => async (dispatch) =>{
    try{
        dispatch({type: SUBMENU_SAVE_REQUEST, payload:item })
        if(!id){
            // console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithTokenAndMultipartData.post("/SubMenu", item)
            // console.log(data)
            if(data.status===true){
                dispatch({type: SUBMENU_SAVE_SUCCESS, payload: data });
            }else{
                dispatch({ type: SUBMENU_SAVE_FAIL, payload: data.message });
            }
        }else{
            console.log(item)
            const { data } = await axiosWithTokenAndMultipartData.put("/SubMenu", item);
            // console.log(data)
            if(data.status===true){
                dispatch({type: SUBMENU_SAVE_SUCCESS, payload: data });   
            }else{
                dispatch({ type: SUBMENU_SAVE_FAIL, payload: data.message });
            }        
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: SUBMENU_SAVE_FAIL, payload: error.message });
    }
};

const deleteSubMenu = (id)=> async (dispatch, getState) =>{
    // console.log(submenuId);
    // console.log(typeof(submenuId));
    try{
        dispatch({type:SUBMENU_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/SubMenu/" + id); 
        // console.log(data)
        if(data.status===true){

            dispatch({type:SUBMENU_DELETE_SUCCESS, payload: data, success:true });
        }else{
            dispatch({ type: SUBMENU_DELETE_FAIL, payload: data.message });
        }
    }
    catch(error){
        dispatch({ type: SUBMENU_DELETE_FAIL, payload: error.message });
    }
};


export { listSubMenus, detailsSubMenu, saveSubMenu, deleteSubMenu }