import { 
    FOOTER_SECTION_LIST_REQUEST, 
    FOOTER_SECTION_LIST_FAIL, 
    FOOTER_SECTION_LIST_SUCCESS, 
    FOOTER_SECTION_DETAILS_SUCCESS, 
    FOOTER_SECTION_DETAILS_REQUEST, 
    FOOTER_SECTION_DETAILS_FAIL,
    FOOTER_SECTION_SAVE_REQUEST,
    FOOTER_SECTION_SAVE_SUCCESS,
    FOOTER_SECTION_SAVE_FAIL,
    FOOTER_SECTION_DELETE_REQUEST,
    FOOTER_SECTION_DELETE_SUCCESS,
    FOOTER_SECTION_DELETE_FAIL,

 } from '../constants/footerSectionConstants';


function footerSectionListReducer(state={footerSections:[]},action){
    // console.log(action.payload)
    switch(action.type){
        case FOOTER_SECTION_LIST_REQUEST:
            return { loading:true, footerSections:[] };
        case FOOTER_SECTION_LIST_SUCCESS:
            return { loading:false, footerSections:action.payload };
        case FOOTER_SECTION_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function footerSectionDetailsReducer(state={footerSection:{}},action){
    switch(action.type){
        case FOOTER_SECTION_DETAILS_REQUEST:
            return { loading:true };
        case FOOTER_SECTION_DETAILS_SUCCESS:
            return { loading:false, footerSection:action.payload };
        case FOOTER_SECTION_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function footerSectionSaveReducer(state={footerSection:{}},action){
    switch(action.type){
        case FOOTER_SECTION_SAVE_REQUEST:
            return { loading:true };
        case FOOTER_SECTION_SAVE_SUCCESS:
            return { loading:false, success:true, footerSection:action.payload };
        case FOOTER_SECTION_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function footerSectionDeleteReducer(state={footerSection:{}},action){
    switch(action.type){
        case FOOTER_SECTION_DELETE_REQUEST:
            return { loading:true };
        case FOOTER_SECTION_DELETE_SUCCESS:
            return { loading:false, success:true, footerSection:action.payload };
        case FOOTER_SECTION_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    footerSectionListReducer, 
    footerSectionDetailsReducer,
    footerSectionSaveReducer,
    footerSectionDeleteReducer
 }; 
