import { 
    SUBMENU_LIST_REQUEST, 
    SUBMENU_LIST_FAIL, 
    SUBMENU_LIST_SUCCESS, 

 } from '../constants/subMenuConstants';
import axios from 'axios';
import { axiosWithoutToken } from '../../helpers/axios';

import {config} from "../../config";

const BASE_API_URL = config.BASE_API_URL


const listSubMenus = () => async (dispatch)=>{
    try{
        dispatch({type: SUBMENU_LIST_REQUEST});
        // const { data } = await axiosWithoutToken.post('/SubMenu/Search',{isHomePageSubMenu:true});
        const {data} = await axios.post(`${BASE_API_URL}/SubMenu/Search`,{isHomePageSubMenu:true});
        dispatch({ type: SUBMENU_LIST_SUCCESS, payload: data.data.item1 });
        console.log(data.data.item1)
    }
    catch(error){
        dispatch({ type: SUBMENU_LIST_FAIL, payload: error.message });

    }
}

export { listSubMenus }