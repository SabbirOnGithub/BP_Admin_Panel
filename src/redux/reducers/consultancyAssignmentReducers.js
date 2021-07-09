import { 
    CONSULTANCY_ASSIGNMENT_LIST_REQUEST, 
    CONSULTANCY_ASSIGNMENT_LIST_FAIL, 
    CONSULTANCY_ASSIGNMENT_LIST_SUCCESS, 
    CONSULTANCY_ASSIGNMENT_DETAILS_SUCCESS, 
    CONSULTANCY_ASSIGNMENT_DETAILS_REQUEST, 
    CONSULTANCY_ASSIGNMENT_DETAILS_FAIL,
    CONSULTANCY_ASSIGNMENT_SAVE_REQUEST,
    CONSULTANCY_ASSIGNMENT_SAVE_SUCCESS,
    CONSULTANCY_ASSIGNMENT_SAVE_FAIL,
    CONSULTANCY_ASSIGNMENT_DELETE_REQUEST,
    CONSULTANCY_ASSIGNMENT_DELETE_SUCCESS,
    CONSULTANCY_ASSIGNMENT_DELETE_FAIL,

 } from '../constants/consultancyAssignmentConstants';


function consultancyAssignmentListReducer(state={consultancyAssignments:[]},action){
    switch(action.type){
        case CONSULTANCY_ASSIGNMENT_LIST_REQUEST:
            return { loading:true, consultancyAssignments:[] };
        case CONSULTANCY_ASSIGNMENT_LIST_SUCCESS:
            return { loading:false, consultancyAssignments:action.payload };
        case CONSULTANCY_ASSIGNMENT_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function consultancyAssignmentDetailsReducer(state={consultancyAssignment:{}},action){
    switch(action.type){
        case CONSULTANCY_ASSIGNMENT_DETAILS_REQUEST:
            return { loading:true };
        case CONSULTANCY_ASSIGNMENT_DETAILS_SUCCESS:
            return { loading:false, consultancyAssignment:action.payload };
        case CONSULTANCY_ASSIGNMENT_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function consultancyAssignmentSaveReducer(state={consultancyAssignment:{}},action){
    switch(action.type){
        case CONSULTANCY_ASSIGNMENT_SAVE_REQUEST:
            return { loading:true };
        case CONSULTANCY_ASSIGNMENT_SAVE_SUCCESS:
            return { loading:false, success:true, consultancyAssignment:action.payload };
        case CONSULTANCY_ASSIGNMENT_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function consultancyAssignmentDeleteReducer(state={consultancyAssignment:{}},action){
    switch(action.type){
        case CONSULTANCY_ASSIGNMENT_DELETE_REQUEST:
            return { loading:true };
        case CONSULTANCY_ASSIGNMENT_DELETE_SUCCESS:
            return { loading:false, success:true, consultancyAssignment:action.payload };
        case CONSULTANCY_ASSIGNMENT_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    consultancyAssignmentListReducer, 
    consultancyAssignmentDetailsReducer,
    consultancyAssignmentSaveReducer,
    consultancyAssignmentDeleteReducer

 }; 
