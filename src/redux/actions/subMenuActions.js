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
        console.log(data)
        dispatch({ type: SUBMENU_LIST_SUCCESS, payload: data.data ? data.data : [] });
    }
    catch(error){
        dispatch({ type: SUBMENU_LIST_FAIL, payload: error.message });

    }
}


const detailsSubMenu = (submenuId)=> async (dispatch) =>{
    try{
        dispatch({type:SUBMENU_DETAILS_REQUEST});
        const { data } = await axiosWithoutToken.get("/SubMenu/" + submenuId); 
        dispatch({type:SUBMENU_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: SUBMENU_DETAILS_FAIL, payload: error.message });
    }
};

const saveSubMenu = (submenu, subMenuId) => async (dispatch) =>{
    console.log(subMenuId)
    try{
        dispatch({type: SUBMENU_SAVE_REQUEST, payload:submenu })
        if(!subMenuId){
            console.log('create')
        //eslint-disable-next-line
        const formatHomePageData = delete submenu.id;
        // console.log(homePageData)
        const { data } = await axiosWithTokenAndMultipartData.post("/SubMenu/Create", submenu)
        console.log(data)
        if(data.status===true){
            dispatch({type: SUBMENU_SAVE_SUCCESS, payload: data });
        }
        }else{
            console.log('update')
            console.log(submenu)
            // const { data } = await axiosWithToken.put("/HomePage/" + homePageData.id , homePageData);
            const { data } = await axiosWithTokenAndMultipartData.put("/SubMenu/Update", submenu);
            console.log(data)
            if(data.status===true){
                dispatch({type: SUBMENU_SAVE_SUCCESS, payload: data });   
            }         

        }
        

        
    } catch (error) {
        console.log(error)
        dispatch({ type: SUBMENU_SAVE_FAIL, payload: error.message });
    }
};

const deleteSubMenu = (submenuId)=> async (dispatch, getState) =>{
    console.log(submenuId);
    console.log(typeof(submenuId));
    try{
        dispatch({type:SUBMENU_DELETE_REQUEST});
        const { data } = await axiosWithToken.delete("/SubMenu/" + submenuId); 
        if(data){
            dispatch({type:SUBMENU_DELETE_SUCCESS, payload: data, success:true });
        }
    }
    catch(error){
        dispatch({ type: SUBMENU_DELETE_FAIL, payload: error.message });
    }
};


export { listSubMenus, detailsSubMenu, saveSubMenu, deleteSubMenu }