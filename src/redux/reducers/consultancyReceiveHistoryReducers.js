import { 
    // CONSULTANCY_RECEIVE_HISTORY_LIST_REQUEST, 
    // CONSULTANCY_RECEIVE_HISTORY_LIST_FAIL, 
    // CONSULTANCY_RECEIVE_HISTORY_LIST_SUCCESS, 
    // CONSULTANCY_RECEIVE_HISTORY_DETAILS_SUCCESS, 
    // CONSULTANCY_RECEIVE_HISTORY_DETAILS_REQUEST, 
    // CONSULTANCY_RECEIVE_HISTORY_DETAILS_FAIL,
    CONSULTANCY_RECEIVE_HISTORY_SAVE_REQUEST,
    CONSULTANCY_RECEIVE_HISTORY_SAVE_SUCCESS,
    CONSULTANCY_RECEIVE_HISTORY_SAVE_FAIL,
    CONSULTANCY_RECEIVE_HISTORY_DELETE_REQUEST,
    CONSULTANCY_RECEIVE_HISTORY_DELETE_SUCCESS,
    CONSULTANCY_RECEIVE_HISTORY_DELETE_FAIL,

 } from '../constants/consultancyReceiveHistoryConstants';

// function consultancyReceiveHistoryListReducer(state={consultancyReceiveHistorys:[]},action){
//     switch(action.type){
//         case CONSULTANCY_RECEIVE_HISTORY_LIST_REQUEST:
//             return { loading:true, consultancyReceiveHistorys:[] };
//         case CONSULTANCY_RECEIVE_HISTORY_LIST_SUCCESS:
//             return { loading:false, consultancyReceiveHistorys:action.payload };
//         case CONSULTANCY_RECEIVE_HISTORY_LIST_FAIL:
//             return { loading:false, error: action.payload };
//         default:
//             return state;
//     }
// };

// function consultancyReceiveHistoryDetailsReducer(state={consultancyReceiveHistory:{}},action){
//     switch(action.type){
//         case CONSULTANCY_RECEIVE_HISTORY_DETAILS_REQUEST:
//             return { loading:true };
//         case CONSULTANCY_RECEIVE_HISTORY_DETAILS_SUCCESS:
//             return { loading:false, consultancyReceiveHistory:action.payload };
//         case CONSULTANCY_RECEIVE_HISTORY_DETAILS_FAIL:
//             return { loading:false, error: action.payload };
//         default:
//             return state;
//     }
// }

function consultancyReceiveHistorySaveReducer(state={consultancyReceiveHistory:{}},action){
    switch(action.type){
        case CONSULTANCY_RECEIVE_HISTORY_SAVE_REQUEST:
            return { loading:true };
        case CONSULTANCY_RECEIVE_HISTORY_SAVE_SUCCESS:
            return { loading:false, success:true, consultancyReceiveHistory:action.payload };
        case CONSULTANCY_RECEIVE_HISTORY_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function consultancyReceiveHistoryDeleteReducer(state={consultancyReceiveHistory:{}},action){
    switch(action.type){
        case CONSULTANCY_RECEIVE_HISTORY_DELETE_REQUEST:
            return { loading:true };
        case CONSULTANCY_RECEIVE_HISTORY_DELETE_SUCCESS:
            return { loading:false, success:true, consultancyReceiveHistory:action.payload };
        case CONSULTANCY_RECEIVE_HISTORY_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    // consultancyReceiveHistoryListReducer, 
    // consultancyReceiveHistoryDetailsReducer,
    consultancyReceiveHistorySaveReducer,
    consultancyReceiveHistoryDeleteReducer

 }; 
