import { 
    TRAINING_CANDIDATE_DESCRIPTOR_LIST_REQUEST, 
    TRAINING_CANDIDATE_DESCRIPTOR_LIST_FAIL, 
    TRAINING_CANDIDATE_DESCRIPTOR_LIST_SUCCESS,
    TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_REQUEST,
    TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_SUCCESS,
    TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_FAIL,
    TRAINING_CANDIDATE_DESCRIPTOR_SAVE_REQUEST,
    TRAINING_CANDIDATE_DESCRIPTOR_SAVE_SUCCESS,
    TRAINING_CANDIDATE_DESCRIPTOR_SAVE_FAIL,
    TRAINING_CANDIDATE_DESCRIPTOR_DELETE_REQUEST,
    TRAINING_CANDIDATE_DESCRIPTOR_DELETE_SUCCESS,
    TRAINING_CANDIDATE_DESCRIPTOR_DELETE_FAIL, 

 } from '../constants/trainingCandidateDescriptorConstants';


function trainingCandidateDescriptorListReducer(state={trainingCandidateDescriptors:[]},action){
    switch(action.type){
        case TRAINING_CANDIDATE_DESCRIPTOR_LIST_REQUEST:
            return { loading:true, trainingCandidateDescriptors:[] };
        case TRAINING_CANDIDATE_DESCRIPTOR_LIST_SUCCESS:
            return { loading:false, trainingCandidateDescriptors:action.payload };
        case TRAINING_CANDIDATE_DESCRIPTOR_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function trainingCandidateDescriptorDetailsReducer(state={trainingCandidateDescriptor:{}},action){
    switch(action.type){
        case TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_REQUEST:
            return { loading:true };
        case TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_SUCCESS:
            return { loading:false, trainingCandidateDescriptor:action.payload };
        case TRAINING_CANDIDATE_DESCRIPTOR_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function trainingCandidateDescriptorSaveReducer(state={trainingCandidateDescriptor:{}},action){
    switch(action.type){
        case TRAINING_CANDIDATE_DESCRIPTOR_SAVE_REQUEST:
            return { loading:true };
        case TRAINING_CANDIDATE_DESCRIPTOR_SAVE_SUCCESS:
            return { loading:false, success:true, trainingCandidateDescriptor:action.payload };
        case TRAINING_CANDIDATE_DESCRIPTOR_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function trainingCandidateDescriptorDeleteReducer(state={trainingCandidateDescriptor:{}},action){
    switch(action.type){
        case TRAINING_CANDIDATE_DESCRIPTOR_DELETE_REQUEST:
            return { loading:true };
        case TRAINING_CANDIDATE_DESCRIPTOR_DELETE_SUCCESS:
            return { loading:false, success:true, trainingCandidateDescriptor:action.payload };
        case TRAINING_CANDIDATE_DESCRIPTOR_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  trainingCandidateDescriptorListReducer, trainingCandidateDescriptorDetailsReducer, trainingCandidateDescriptorSaveReducer, trainingCandidateDescriptorDeleteReducer }; 
