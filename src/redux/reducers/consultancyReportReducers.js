import { 
    CONSULTANCY_REPORT_LIST_REQUEST, 
    CONSULTANCY_REPORT_LIST_SUCCESS, 
    CONSULTANCY_REPORT_LIST_FAIL, 
 } from '../constants/consultancyReportConstants';

 function consultancyReportListReducer(state={consultancyReports:{}},action){
    switch(action.type){
        case CONSULTANCY_REPORT_LIST_REQUEST:
            return { loading:true, consultancyReports:{} };
        case CONSULTANCY_REPORT_LIST_SUCCESS:
            return { loading:false, consultancyReports:action.payload };
        case CONSULTANCY_REPORT_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    consultancyReportListReducer, 
 }; 
