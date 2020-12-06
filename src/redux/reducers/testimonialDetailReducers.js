import { 
    TESTIMONIAL_DETAIL_LIST_REQUEST, 
    TESTIMONIAL_DETAIL_LIST_FAIL, 
    TESTIMONIAL_DETAIL_LIST_SUCCESS,
    TESTIMONIAL_DETAIL_DETAILS_REQUEST,
    TESTIMONIAL_DETAIL_DETAILS_SUCCESS,
    TESTIMONIAL_DETAIL_DETAILS_FAIL,
    TESTIMONIAL_DETAIL_SAVE_REQUEST,
    TESTIMONIAL_DETAIL_SAVE_SUCCESS,
    TESTIMONIAL_DETAIL_SAVE_FAIL,
    TESTIMONIAL_DETAIL_DELETE_REQUEST,
    TESTIMONIAL_DETAIL_DELETE_SUCCESS,
    TESTIMONIAL_DETAIL_DELETE_FAIL, 

 } from '../constants/testimonialDetailConstants';


function testimonialDetailListReducer(state={testimonialDetails:[]},action){
    switch(action.type){
        case TESTIMONIAL_DETAIL_LIST_REQUEST:
            return { loading:true, testimonialDetails:[] };
        case TESTIMONIAL_DETAIL_LIST_SUCCESS:
            return { loading:false, testimonialDetails:action.payload };
        case TESTIMONIAL_DETAIL_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function testimonialDetailDetailsReducer(state={testimonialDetail:{}},action){
    switch(action.type){
        case TESTIMONIAL_DETAIL_DETAILS_REQUEST:
            return { loading:true };
        case TESTIMONIAL_DETAIL_DETAILS_SUCCESS:
            return { loading:false, testimonialDetail:action.payload };
        case TESTIMONIAL_DETAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function testimonialDetailSaveReducer(state={testimonialDetail:{}},action){
    switch(action.type){
        case TESTIMONIAL_DETAIL_SAVE_REQUEST:
            return { loading:true };
        case TESTIMONIAL_DETAIL_SAVE_SUCCESS:
            return { loading:false, success:true, testimonialDetail:action.payload };
        case TESTIMONIAL_DETAIL_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function testimonialDetailDeleteReducer(state={testimonialDetail:{}},action){
    switch(action.type){
        case TESTIMONIAL_DETAIL_DELETE_REQUEST:
            return { loading:true };
        case TESTIMONIAL_DETAIL_DELETE_SUCCESS:
            return { loading:false, success:true, testimonialDetail:action.payload };
        case TESTIMONIAL_DETAIL_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  testimonialDetailListReducer, testimonialDetailDetailsReducer, testimonialDetailSaveReducer, testimonialDetailDeleteReducer }; 
