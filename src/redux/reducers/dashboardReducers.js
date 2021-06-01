import { 
    ADMIN_DASHBOARD_DETAILS_REQUEST,
    ADMIN_DASHBOARD_DETAILS_SUCCESS,
    ADMIN_DASHBOARD_DETAILS_FAIL,
    USER_DASHBOARD_DETAILS_REQUEST,
    USER_DASHBOARD_DETAILS_SUCCESS,
    USER_DASHBOARD_DETAILS_FAIL
 } from '../constants/dashboardConstants';

function adminDashboardDetailsReducer(state={adminDashboard:{}},action){
    switch(action.type){
        case ADMIN_DASHBOARD_DETAILS_REQUEST:
            return { loading:true };
        case ADMIN_DASHBOARD_DETAILS_SUCCESS:
            return { loading:false, adminDashboard:action.payload };
        case ADMIN_DASHBOARD_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function userDashboardDetailsReducer(state={userDashboard:{}},action){
    switch(action.type){
        case USER_DASHBOARD_DETAILS_REQUEST:
            return { loading:true };
        case USER_DASHBOARD_DETAILS_SUCCESS:
            return { loading:false, userDashboards:action.payload };
        case USER_DASHBOARD_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    adminDashboardDetailsReducer,
    userDashboardDetailsReducer 

 }; 
