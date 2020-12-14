import { 
    SUBMENU_OVERVIEW_LIST_REQUEST, 
    SUBMENU_OVERVIEW_LIST_FAIL, 
    SUBMENU_OVERVIEW_LIST_SUCCESS,
    SUBMENU_OVERVIEW_DETAILS_REQUEST,
    SUBMENU_OVERVIEW_DETAILS_SUCCESS,
    SUBMENU_OVERVIEW_DETAILS_FAIL,
    SUBMENU_OVERVIEW_SAVE_REQUEST,
    SUBMENU_OVERVIEW_SAVE_SUCCESS,
    SUBMENU_OVERVIEW_SAVE_FAIL,
    SUBMENU_OVERVIEW_DELETE_REQUEST,
    SUBMENU_OVERVIEW_DELETE_SUCCESS,
    SUBMENU_OVERVIEW_DELETE_FAIL, 

 } from '../constants/subMenuOverViewConstants';


function subMenuOverViewListReducer(state={subMenuOverViews:[]},action){
    switch(action.type){
        case SUBMENU_OVERVIEW_LIST_REQUEST:
            return { loading:true, subMenuOverViews:[] };
        case SUBMENU_OVERVIEW_LIST_SUCCESS:
            return { loading:false, subMenuOverViews:action.payload };
        case SUBMENU_OVERVIEW_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function subMenuOverViewDetailsReducer(state={subMenuOverView:{}},action){
    switch(action.type){
        case SUBMENU_OVERVIEW_DETAILS_REQUEST:
            return { loading:true };
        case SUBMENU_OVERVIEW_DETAILS_SUCCESS:
            return { loading:false, subMenuOverView:action.payload };
        case SUBMENU_OVERVIEW_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function subMenuOverViewSaveReducer(state={subMenuOverView:{}},action){
    switch(action.type){
        case SUBMENU_OVERVIEW_SAVE_REQUEST:
            return { loading:true };
        case SUBMENU_OVERVIEW_SAVE_SUCCESS:
            return { loading:false, success:true, subMenuOverView:action.payload };
        case SUBMENU_OVERVIEW_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function subMenuOverViewDeleteReducer(state={subMenuOverView:{}},action){
    switch(action.type){
        case SUBMENU_OVERVIEW_DELETE_REQUEST:
            return { loading:true };
        case SUBMENU_OVERVIEW_DELETE_SUCCESS:
            return { loading:false, success:true, subMenuOverView:action.payload };
        case SUBMENU_OVERVIEW_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  subMenuOverViewListReducer, subMenuOverViewDetailsReducer, subMenuOverViewSaveReducer, subMenuOverViewDeleteReducer }; 
