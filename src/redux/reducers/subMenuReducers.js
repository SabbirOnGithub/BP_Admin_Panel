import {SUBMENU_LIST_REQUEST, 
    SUBMENU_LIST_SUCCESS, 
    SUBMENU_LIST_FAIL, 
  } from '../constants/subMenuConstants';


function subMenuListReducer(state={subMenus:[]},action){
    switch(action.type){
        case SUBMENU_LIST_REQUEST:
            return { loading:true, subMenus:[] };
        case SUBMENU_LIST_SUCCESS:
            return { loading:false, subMenus:action.payload };
        case SUBMENU_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

export { 
    subMenuListReducer, 

 }; 
