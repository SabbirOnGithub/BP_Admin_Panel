import { 
    HOME_CONSULTATION_TOPIC_LIST_REQUEST, 
    HOME_CONSULTATION_TOPIC_LIST_FAIL, 
    HOME_CONSULTATION_TOPIC_LIST_SUCCESS,
    HOME_CONSULTATION_TOPIC_DETAILS_REQUEST,
    HOME_CONSULTATION_TOPIC_DETAILS_SUCCESS,
    HOME_CONSULTATION_TOPIC_DETAILS_FAIL,
    HOME_CONSULTATION_TOPIC_SAVE_REQUEST,
    HOME_CONSULTATION_TOPIC_SAVE_SUCCESS,
    HOME_CONSULTATION_TOPIC_SAVE_FAIL,
    HOME_CONSULTATION_TOPIC_DELETE_REQUEST,
    HOME_CONSULTATION_TOPIC_DELETE_SUCCESS,
    HOME_CONSULTATION_TOPIC_DELETE_FAIL, 

 } from '../constants/homeConsultationTopicConstants';


function homeConsultationTopicListReducer(state={homeConsultationTopics:[]},action){
    switch(action.type){
        case HOME_CONSULTATION_TOPIC_LIST_REQUEST:
            return { loading:true, homeConsultationTopics:[] };
        case HOME_CONSULTATION_TOPIC_LIST_SUCCESS:
            return { loading:false, homeConsultationTopics:action.payload };
        case HOME_CONSULTATION_TOPIC_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function homeConsultationTopicDetailsReducer(state={homeConsultationTopic:{}},action){
    switch(action.type){
        case HOME_CONSULTATION_TOPIC_DETAILS_REQUEST:
            return { loading:true };
        case HOME_CONSULTATION_TOPIC_DETAILS_SUCCESS:
            return { loading:false, homeConsultationTopic:action.payload };
        case HOME_CONSULTATION_TOPIC_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function homeConsultationTopicSaveReducer(state={homeConsultationTopic:{}},action){
    switch(action.type){
        case HOME_CONSULTATION_TOPIC_SAVE_REQUEST:
            return { loading:true };
        case HOME_CONSULTATION_TOPIC_SAVE_SUCCESS:
            return { loading:false, success:true, homeConsultationTopic:action.payload };
        case HOME_CONSULTATION_TOPIC_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function homeConsultationTopicDeleteReducer(state={homeConsultationTopic:{}},action){
    switch(action.type){
        case HOME_CONSULTATION_TOPIC_DELETE_REQUEST:
            return { loading:true };
        case HOME_CONSULTATION_TOPIC_DELETE_SUCCESS:
            return { loading:false, success:true, homeConsultationTopic:action.payload };
        case HOME_CONSULTATION_TOPIC_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  homeConsultationTopicListReducer, homeConsultationTopicDetailsReducer, homeConsultationTopicSaveReducer, homeConsultationTopicDeleteReducer }; 
